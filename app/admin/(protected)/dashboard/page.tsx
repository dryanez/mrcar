import { getAllUsers } from '@/lib/actions/user-actions'
import { getAppraisals } from '@/lib/actions/appraisal-actions'
import Link from 'next/link'
import { Users, FileText, TrendingUp, MapPin } from 'lucide-react'

export default async function AdminDashboardPage() {
    const [usersResult, appraisalsResult] = await Promise.all([
        getAllUsers(),
        getAppraisals()
    ])

    const users = usersResult.data || []
    const appraisals = appraisalsResult.data || []

    const activeUsers = users.filter(u => u.is_active && u.role !== 'admin')
    const vitacuraUsers = users.filter(u => u.sucursal === 'Vitacura')
    const vinaUsers = users.filter(u => u.sucursal === 'Viña del Mar')

    // Get stats for current month vs last month
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    const currentMonthAppraisals = appraisals.filter(a => new Date(a.created_at) >= currentMonthStart)
    const lastMonthAppraisals = appraisals.filter(a =>
        new Date(a.created_at) >= lastMonthStart && new Date(a.created_at) < currentMonthStart
    )

    const trend = lastMonthAppraisals.length > 0
        ? ((currentMonthAppraisals.length - lastMonthAppraisals.length) / lastMonthAppraisals.length * 100).toFixed(1)
        : '0'

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Dashboard Administrativo
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Resumen general del sistema MrCar
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                        Usuarios Activos
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {activeUsers.length}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                            <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        {trend !== '0' && (
                            <span className={`text-sm font-semibold flex items-center gap-1 ${parseFloat(trend) > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                <TrendingUp className="w-4 h-4" />
                                {trend}%
                            </span>
                        )}
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                        Tasaciones Este Mes
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {currentMonthAppraisals.length}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                            <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                        Vitacura
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {vitacuraUsers.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        usuarios
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                            <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                        Viña del Mar
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {vinaUsers.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        usuarios
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/admin/users/new"
                    className="block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-blue-500 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-600 transition-colors">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Crear Nuevo Usuario
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Agregar un nuevo usuario al sistema
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/admin/users"
                    className="block p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-green-500 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg group-hover:bg-green-600 transition-colors">
                            <FileText className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Gestionar Usuarios
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Ver y administrar todos los usuarios
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Resumen Mensual
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mes Actual</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                            {currentMonthAppraisals.length}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">tasaciones</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mes Anterior</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                            {lastMonthAppraisals.length}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">tasaciones</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Crecimiento</p>
                        <p className={`text-2xl font-bold mt-1 ${parseFloat(trend) > 0 ? 'text-green-600' : parseFloat(trend) < 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'
                            }`}>
                            {parseFloat(trend) > 0 ? '+' : ''}{trend}%
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs mes anterior</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
