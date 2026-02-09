'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { AppraisalFormData } from '@/lib/validations/appraisal'
import { getCurrentUser } from './auth-actions'

export async function createAppraisal(data: AppraisalFormData) {
    try {
        console.log('[Server] createAppraisal called with data:', data)
        const supabase = await createClient()

        // Get current user for tracking
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            return {
                success: false,
                error: 'No autenticado. Por favor, inicia sesión.'
            }
        }

        // Map camelCase form fields to snake_case database columns
        let dbData
        try {
            dbData = {
                // Client Info
                client_nombre: data.clientNombre,
                client_apellido: data.clientApellido,
                client_email: data.clientEmail || null,
                client_telefono: data.clientTelefono,
                client_rut: data.clientRut,
                client_direccion: data.clientDireccion || null,
                client_comuna: data.clientComuna || null,

                // Vehicle Info
                vehicle_marca: data.vehicleMarca,
                vehicle_modelo: data.vehicleModelo,
                vehicle_version: data.vehicleVersion || null,
                vehicle_ano: data.vehicleAño,
                vehicle_color: data.vehicleColor || null,
                vehicle_km: data.vehicleKm,
                vehicle_motor: data.vehicleMotor || null,
                vehicle_patente: data.vehiclePatente,
                vehicle_transmision: data.vehicleTransmision,
                vehicle_combustible: data.vehicleCombustible,

                // Documentation
                permiso_circulacion: data.permisoCirculacion,
                vence_permiso: data.vencePermiso || null,
                revision_tecnica: data.revisionTecnica,
                vence_revision: data.venceRevision || null,
                soap: data.soap,
                seguro: data.seguro,
                num_duenos: data.numDueños || null,
                tasacion: data.tasacion || null,
                en_prenda: data.enPrenda,

                // Features
                features: data.features,

                // Technical
                airbags: data.airbags || null,
                num_llaves: data.numLlaves,
                neumaticos: data.neumaticos,
                observaciones: data.observaciones || null,

                // User Tracking
                created_by_user_id: currentUser.id,
                sucursal: currentUser.sucursal,

                // Status
                status: 'completed', // Mark as completed when form is submitted
            }
            console.log('[Server] Mapped dbData:', JSON.stringify(dbData, null, 2))
        } catch (mappingError) {
            console.error('[Server] Error mapping data:', mappingError)
            return { success: false, error: `Data mapping error: ${mappingError instanceof Error ? mappingError.message : String(mappingError)}` }
        }

        const { data: appraisal, error } = await supabase
            .from('appraisals')
            .insert(dbData)
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            console.error('Supabase error code:', error.code)
            console.error('Supabase error message:', error.message)
            console.error('Supabase error details:', error.details)
            console.error('Supabase error hint:', error.hint)
            console.error('Data attempted to insert:', JSON.stringify(dbData, null, 2))
            return { success: false, error: `Database error: ${error.message} (code: ${error.code})` }
        }

        revalidatePath('/dashboard/appraisals')
        return { success: true, data: appraisal }
    } catch (error) {
        console.error('Error creating appraisal:', error)
        const errorMessage = error instanceof Error ? error.message : String(error)
        const errorStack = error instanceof Error ? error.stack : 'No stack trace'
        console.error('Error stack:', errorStack)
        return { success: false, error: `Server error: ${errorMessage}` }
    }
}

export async function getAppraisals() {
    try {
        const supabase = await createClient()

        // Get current user
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            return { success: false, error: 'No autenticado', data: [] }
        }

        let query = supabase
            .from('appraisals')
            .select('*')
            .order('created_at', { ascending: false })

        // Regular users only see their own appraisals
        if (currentUser.role !== 'admin') {
            query = query.eq('created_by_user_id', currentUser.id)
        }

        const { data: appraisals, error } = await query

        if (error) {
            console.error('Supabase error:', error)
            return { success: false, error: error.message, data: [] }
        }

        return { success: true, data: appraisals || [] }
    } catch (error) {
        console.error('Error fetching appraisals:', error)
        return { success: false, error: 'Failed to fetch appraisals', data: [] }
    }
}

export async function getAppraisalById(id: string) {
    try {
        const supabase = await createClient()

        const { data: appraisal, error } = await supabase
            .from('appraisals')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return { success: false, error: error.message }
        }

        return { success: true, data: appraisal }
    } catch (error) {
        console.error('Error fetching appraisal:', error)
        return { success: false, error: 'Failed to fetch appraisal' }
    }
}
