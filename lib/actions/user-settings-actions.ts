'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth-actions'
import { revalidatePath } from 'next/cache'

// Change user's own password
export async function changePassword(currentPassword: string, newPassword: string) {
    try {
        const supabase = await createClient()
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return { success: false, error: 'No autenticado' }
        }

        // Verify current password
        if (currentUser.password_hash !== currentPassword) {
            return { success: false, error: 'Contraseña actual incorrecta' }
        }

        // Update password_hash (plain text for now - use bcrypt in production)
        const { error } = await supabase
            .from('users')
            .update({ password_hash: newPassword })
            .eq('id', currentUser.id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (error) {
        console.error('Error changing password:', error)
        return { success: false, error: 'Error al cambiar contraseña' }
    }
}

// Admin: Update any user's information
export async function updateUser(userId: string, updates: {
    nombre?: string
    apellido?: string
    email?: string
    sucursal?: 'Vitacura' | 'Viña del Mar'
    role?: 'admin' | 'user'
    is_active?: boolean
}) {
    try {
        const supabase = await createClient()
        const currentUser = await getCurrentUser()

        if (!currentUser || currentUser.role !== 'admin') {
            return { success: false, error: 'No autorizado' }
        }

        // Update user in database
        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)

        if (error) {
            return { success: false, error: error.message }
        }

        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Error updating user:', error)
        return { success: false, error: 'Error al actualizar usuario' }
    }
}

// Admin: Reset user's password
export async function resetUserPassword(userId: string, newPassword: string) {
    try {
        const supabase = await createClient()
        const currentUser = await getCurrentUser()

        console.log('[resetUserPassword] Current user:', currentUser?.email, 'Role:', currentUser?.role)

        if (!currentUser) {
            console.error('[resetUserPassword] No current user found')
            return { success: false, error: 'No autenticado. Por favor, inicia sesión nuevamente.' }
        }

        if (currentUser.role !== 'admin') {
            console.error('[resetUserPassword] User is not admin:', currentUser.email, currentUser.role)
            return { success: false, error: 'Solo administradores pueden resetear contraseñas' }
        }

        console.log('[resetUserPassword] Updating password for user:', userId)

        // Update password_hash in database (plain text for now - use bcrypt in production)
        const { error } = await supabase
            .from('users')
            .update({ password_hash: newPassword })
            .eq('id', userId)

        if (error) {
            console.error('[resetUserPassword] Database error:', error)
            return { success: false, error: error.message }
        }

        console.log('[resetUserPassword] Password reset successful')
        return { success: true }
    } catch (error) {
        console.error('Error resetting password:', error)
        return { success: false, error: 'Error al resetear contraseña' }
    }
}

// Get user by ID (for admin edit)
export async function getUserById(userId: string) {
    try {
        const supabase = await createClient()
        const currentUser = await getCurrentUser()

        if (!currentUser || currentUser.role !== 'admin') {
            return { success: false, error: 'No autorizado', data: null }
        }

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            return { success: false, error: error.message, data: null }
        }

        return { success: true, data }
    } catch (error) {
        console.error('Error fetching user:', error)
        return { success: false, error: 'Error al obtener usuario', data: null }
    }
}
