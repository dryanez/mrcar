'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadAppraisalPhoto(
    appraisalId: string,
    formData: FormData
) {
    try {
        const supabase = await createClient()
        const file = formData.get('file') as File

        if (!file) {
            return { success: false, error: 'No file provided' }
        }

        // Generate unique filename
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(7)
        const fileExt = file.name.split('.').pop()
        const fileName = `${timestamp}_${randomStr}.${fileExt}`
        const storagePath = `${appraisalId}/${fileName}`

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('appraisal-photos')
            .upload(storagePath, file, {
                contentType: file.type,
                upsert: false,
            })

        if (uploadError) {
            console.error('Storage upload error:', uploadError)
            return { success: false, error: uploadError.message }
        }

        // Create database record
        const { data: photoRecord, error: dbError } = await supabase
            .from('appraisal_photos')
            .insert({
                appraisal_id: appraisalId,
                storage_path: storagePath,
                file_name: file.name,
                file_size: file.size,
            })
            .select()
            .single()

        if (dbError) {
            // Rollback: delete from storage
            await supabase.storage.from('appraisal-photos').remove([storagePath])
            console.error('Database insert error:', dbError)
            return { success: false, error: dbError.message }
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('appraisal-photos')
            .getPublicUrl(storagePath)

        revalidatePath(`/dashboard/appraisals/${appraisalId}`)
        return {
            success: true,
            data: {
                ...photoRecord,
                publicUrl: urlData.publicUrl,
            },
        }
    } catch (error) {
        console.error('Error uploading photo:', error)
        return { success: false, error: 'Failed to upload photo' }
    }
}

export async function getAppraisalPhotos(appraisalId: string) {
    try {
        const supabase = await createClient()

        const { data: photos, error } = await supabase
            .from('appraisal_photos')
            .select('*')
            .eq('appraisal_id', appraisalId)
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error fetching photos:', error)
            return { success: false, error: error.message, data: [] }
        }

        // Add public URLs
        const photosWithUrls = photos.map((photo) => {
            const { data: urlData } = supabase.storage
                .from('appraisal-photos')
                .getPublicUrl(photo.storage_path)
            return {
                ...photo,
                publicUrl: urlData.publicUrl,
            }
        })

        return { success: true, data: photosWithUrls }
    } catch (error) {
        console.error('Error fetching photos:', error)
        return { success: false, error: 'Failed to fetch photos', data: [] }
    }
}

export async function deleteAppraisalPhoto(photoId: string) {
    try {
        const supabase = await createClient()

        // Get photo details first
        const { data: photo, error: fetchError } = await supabase
            .from('appraisal_photos')
            .select('*')
            .eq('id', photoId)
            .single()

        if (fetchError || !photo) {
            return { success: false, error: 'Photo not found' }
        }

        // Delete from storage
        const { error: storageError } = await supabase.storage
            .from('appraisal-photos')
            .remove([photo.storage_path])

        if (storageError) {
            console.error('Storage delete error:', storageError)
        }

        // Delete from database
        const { error: dbError } = await supabase
            .from('appraisal_photos')
            .delete()
            .eq('id', photoId)

        if (dbError) {
            console.error('Database delete error:', dbError)
            return { success: false, error: dbError.message }
        }

        revalidatePath(`/dashboard/appraisals/${photo.appraisal_id}`)
        return { success: true }
    } catch (error) {
        console.error('Error deleting photo:', error)
        return { success: false, error: 'Failed to delete photo' }
    }
}
