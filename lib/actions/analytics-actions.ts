'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from './auth-actions'

export async function getAnalyticsData() {
    try {
        await requireAdmin()
        const supabase = await createClient()

        // Get all appraisals with user info
        const { data: appraisals, error } = await supabase
            .from('appraisals')
            .select(`
                *,
                created_by:users!appraisals_created_by_user_id_fkey(
                    id,
                    nombre,
                    apellido,
                    sucursal
                )
            `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('[Analytics] Error fetching data:', error)
            return { success: false, error: error.message, data: null }
        }

        return { success: true, data: appraisals }
    } catch (error) {
        console.error('[Analytics] Error:', error)
        return { success: false, error: 'No autorizado', data: null }
    }
}

export async function getUserPerformance() {
    try {
        await requireAdmin()
        const supabase = await createClient()

        // Get all users
        const { data: users } = await supabase
            .from('users')
            .select('*')
            .eq('role', 'user')
            .eq('is_active', true)

        if (!users) return { success: false, data: [] }

        // Get appraisals count for each user
        const performance = await Promise.all(
            users.map(async (user) => {
                const { count: total } = await supabase
                    .from('appraisals')
                    .select('*', { count: 'exact', head: true })
                    .eq('created_by_user_id', user.id)

                const { count: thisWeek } = await supabase
                    .from('appraisals')
                    .select('*', { count: 'exact', head: true })
                    .eq('created_by_user_id', user.id)
                    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

                const { count: thisMonth } = await supabase
                    .from('appraisals')
                    .select('*', { count: 'exact', head: true })
                    .eq('created_by_user_id', user.id)
                    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

                return {
                    userId: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    sucursal: user.sucursal,
                    email: user.email,
                    total: total || 0,
                    thisWeek: thisWeek || 0,
                    thisMonth: thisMonth || 0
                }
            })
        )

        return { success: true, data: performance.sort((a, b) => b.total - a.total) }
    } catch (error) {
        console.error('[Analytics] User performance error:', error)
        return { success: false, data: [] }
    }
}

export async function getWeeklyData() {
    try {
        await requireAdmin()
        const supabase = await createClient()

        // Get last 12 weeks of data
        const twelveWeeksAgo = new Date()
        twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84)

        const { data: appraisals } = await supabase
            .from('appraisals')
            .select('created_at')
            .gte('created_at', twelveWeeksAgo.toISOString())

        if (!appraisals) return { success: false, data: [] }

        // Group by week
        const weeklyData: { [key: string]: number } = {}

        appraisals.forEach(appraisal => {
            const date = new Date(appraisal.created_at)
            const weekStart = new Date(date)
            weekStart.setDate(date.getDate() - date.getDay()) // Start of week (Sunday)
            const weekKey = weekStart.toISOString().split('T')[0]

            weeklyData[weekKey] = (weeklyData[weekKey] || 0) + 1
        })

        // Convert to array and sort
        const result = Object.entries(weeklyData).map(([week, count]) => ({
            week,
            count,
            weekLabel: new Date(week).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
        })).sort((a, b) => a.week.localeCompare(b.week))

        return { success: true, data: result }
    } catch (error) {
        console.error('[Analytics] Weekly data error:', error)
        return { success: false, data: [] }
    }
}

export async function getLocationStats() {
    try {
        await requireAdmin()
        const supabase = await createClient()

        const { data: appraisals } = await supabase
            .from('appraisals')
            .select('sucursal')

        if (!appraisals) return { success: false, data: [] }

        const stats = appraisals.reduce((acc: any, curr) => {
            if (curr.sucursal) {
                acc[curr.sucursal] = (acc[curr.sucursal] || 0) + 1
            }
            return acc
        }, {})

        const result = Object.entries(stats).map(([name, value]) => ({
            name,
            value
        }))

        return { success: true, data: result }
    } catch (error) {
        console.error('[Analytics] Location stats error:', error)
        return { success: false, data: [] }
    }
}

export async function getMonthlyTrends() {
    try {
        await requireAdmin()
        const supabase = await createClient()

        // Get last 6 months
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const { data: appraisals } = await supabase
            .from('appraisals')
            .select('created_at')
            .gte('created_at', sixMonthsAgo.toISOString())

        if (!appraisals) return { success: false, data: [] }

        // Group by month
        const monthlyData: { [key: string]: number } = {}

        appraisals.forEach(appraisal => {
            const date = new Date(appraisal.created_at)
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1
        })

        // Convert to array
        const result = Object.entries(monthlyData).map(([month, count]) => {
            const [year, monthNum] = month.split('-')
            const date = new Date(parseInt(year), parseInt(monthNum) - 1)
            return {
                month,
                count,
                monthLabel: date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })
            }
        }).sort((a, b) => a.month.localeCompare(b.month))

        return { success: true, data: result }
    } catch (error) {
        console.error('[Analytics] Monthly trends error:', error)
        return { success: false, data: [] }
    }
}
