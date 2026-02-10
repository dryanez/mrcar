'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from './auth-actions'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function getAllUsers() {
    try {
        await requireAdmin()
        const supabase = await createClient()

        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, error: error.message, data: [] }
        }

        return { success: true, data: users }
    } catch (error) {
        console.error('[Users] Get all error:', error)
        return { success: false, error: 'No autorizado', data: [] }
    }
}

export async function createUser(data: {
    email: string
    nombre: string
    apellido: string
    sucursal: 'Vitacura' | 'Viña del Mar'
}) {
    try {
        const admin = await requireAdmin()
        const supabase = await createClient()

        // Generate random password
        const tempPassword = crypto.randomBytes(8).toString('hex')

        // Create user
        const { data: newUser, error } = await supabase
            .from('users')
            .insert({
                email: data.email,
                nombre: data.nombre,
                apellido: data.apellido,
                sucursal: data.sucursal,
                role: 'user',
                is_active: true,
                created_by: admin.id,
                password_hash: tempPassword  // Store password (plain text for now - use bcrypt in production)
            })
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        // Send welcome email
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'MrCar <onboarding@resend.dev>', // Change to your domain
                    to: data.email,
                    subject: '¡Bienvenido a MrCar!',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1 style="color: #2563eb;">¡Bienvenido a MrCar!</h1>
                            <p>Hola ${data.nombre},</p>
                            <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales de acceso:</p>
                            
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Email:</strong> ${data.email}</p>
                                <p><strong>Contraseña temporal:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${tempPassword}</code></p>
                                <p><strong>Sucursal:</strong> ${data.sucursal}</p>
                            </div>
                            
                            <p>Por favor, cambia tu contraseña después de iniciar sesión por primera vez.</p>
                            
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" 
                               style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">
                                Iniciar Sesión
                            </a>
                            
                            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                                Si tienes alguna pregunta, contacta a tu administrador.
                            </p>
                        </div>
                    `
                })
            } catch (emailError) {
                console.error('[Users] Email send error:', emailError)
                // Don't fail user creation if email fails
            }
        }

        // Store temp password in user record (you might want to hash this)
        // For now, we'll just return it to show the admin
        return {
            success: true,
            user: newUser,
            tempPassword: tempPassword
        }
    } catch (error) {
        console.error('[Users] Create error:', error)
        return { success: false, error: 'Error al crear usuario' }
    }
}

export async function updateUser(userId: string, data: {
    nombre?: string
    apellido?: string
    sucursal?: 'Vitacura' | 'Viña del Mar'
    is_active?: boolean
}) {
    try {
        await requireAdmin()
        const supabase = await createClient()

        const { data: updated, error } = await supabase
            .from('users')
            .update(data)
            .eq('id', userId)
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, user: updated }
    } catch (error) {
        console.error('[Users] Update error:', error)
        return { success: false, error: 'Error al actualizar usuario' }
    }
}

export async function deleteUser(userId: string) {
    try {
        await requireAdmin()
        const supabase = await createClient()

        // Soft delete - just deactivate
        const { error } = await supabase
            .from('users')
            .update({ is_active: false })
            .eq('id', userId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    } catch (error) {
        console.error('[Users] Delete error:', error)
        return { success: false, error: 'Error al eliminar usuario' }
    }
}
