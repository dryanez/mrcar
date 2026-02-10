'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export interface User {
    id: string
    email: string
    nombre: string
    apellido: string
    sucursal: 'Vitacura' | 'Viña del Mar'
    role: 'admin' | 'user'
    is_active: boolean
    password_hash?: string  // Optional for security (not always returned)
}

export interface Session {
    id: string
    user_id: string
    session_token: string
    expires_at: string
}

// Hardcoded admin credentials (for simplicity)
const ADMIN_EMAIL = 'admin@mrcar.cl'
const ADMIN_PASSWORD = 'admin'

export async function login(email: string, password: string) {
    try {
        const supabase = await createClient()

        // Check for hardcoded admin
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Get or create admin user
            let { data: adminUser, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', ADMIN_EMAIL)
                .single()

            if (error || !adminUser) {
                // Create admin user if doesn't exist
                const { data: newAdmin, error: createError } = await supabase
                    .from('users')
                    .insert({
                        email: ADMIN_EMAIL,
                        nombre: 'Admin',
                        apellido: 'MrCar',
                        sucursal: 'Vitacura',
                        role: 'admin',
                        is_active: true
                    })
                    .select()
                    .single()

                if (createError) {
                    return { success: false, error: 'Error al crear usuario admin' }
                }
                adminUser = newAdmin
            }

            // Create session
            const sessionToken = crypto.randomBytes(32).toString('hex')
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

            const { error: sessionError } = await supabase
                .from('user_sessions')
                .insert({
                    user_id: adminUser.id,
                    session_token: sessionToken,
                    expires_at: expiresAt.toISOString()
                })

            if (sessionError) {
                return { success: false, error: 'Error al crear sesión' }
            }

            // Set cookie
            const cookieStore = await cookies()
            cookieStore.set('session_token', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                expires: expiresAt
            })

            return { success: true, user: adminUser }
        }

        // Check database users
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (userError || !user) {
            return { success: false, error: 'Credenciales inválidas' }
        }

        if (!user.is_active) {
            return { success: false, error: 'Usuario inactivo' }
        }

        // Check if user has a password_hash
        if (!user.password_hash) {
            return { success: false, error: 'Usuario sin contraseña configurada. Contacte al administrador.' }
        }

        // Verify password (simple comparison for now - in production use bcrypt)
        // For now, we'll store passwords as plain text (NOT SECURE - FIX IN PRODUCTION)
        if (user.password_hash !== password) {
            return { success: false, error: 'Credenciales inválidas' }
        }

        // Create session
        const sessionToken = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        const { error: sessionError } = await supabase
            .from('user_sessions')
            .insert({
                user_id: user.id,
                session_token: sessionToken,
                expires_at: expiresAt.toISOString()
            })

        if (sessionError) {
            return { success: false, error: 'Error al crear sesión' }
        }

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set('session_token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/'
        })

        return { success: true, user: user }
    } catch (error) {
        console.error('[Auth] Login error:', error)
        return { success: false, error: 'Error del servidor' }
    }
}

export async function logout() {
    try {
        const cookieStore = await cookies()
        const sessionToken = cookieStore.get('session_token')?.value

        if (sessionToken) {
            const supabase = await createClient()
            await supabase
                .from('user_sessions')
                .delete()
                .eq('session_token', sessionToken)
        }

        cookieStore.delete('session_token')
        return { success: true }
    } catch (error) {
        console.error('[Auth] Logout error:', error)
        return { success: false, error: 'Error al cerrar sesión' }
    }
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies()
        const sessionToken = cookieStore.get('session_token')?.value

        if (!sessionToken) {
            return null
        }

        const supabase = await createClient()

        // Get session
        const { data: session, error: sessionError } = await supabase
            .from('user_sessions')
            .select('*')
            .eq('session_token', sessionToken)
            .single()

        if (sessionError || !session) {
            return null
        }

        // Check if expired
        if (new Date(session.expires_at) < new Date()) {
            await supabase
                .from('user_sessions')
                .delete()
                .eq('id', session.id)
            return null
        }

        // Get user
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user_id)
            .single()

        if (userError || !user || !user.is_active) {
            return null
        }

        return user as User
    } catch (error) {
        console.error('[Auth] Get current user error:', error)
        return null
    }
}

export async function requireAuth() {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error('No autenticado')
    }
    return user
}

export async function requireAdmin() {
    const user = await requireAuth()
    if (user.role !== 'admin') {
        throw new Error('Acceso denegado')
    }
    return user
}
