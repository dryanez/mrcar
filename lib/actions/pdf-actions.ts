'use server'

import { PDFDocument, PDFForm, PDFTextField, PDFCheckBox, rgb } from 'pdf-lib'
import fs from 'fs/promises'
import path from 'path'
import { getAppraisalById } from './appraisal-actions'
import { getCurrentUser } from './auth-actions'

export async function generateFilledPDF(appraisalId: string) {
    try {
        // Get current user for permission check
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            return { success: false, error: 'No autenticado' }
        }

        // Get appraisal data
        const result = await getAppraisalById(appraisalId)
        if (!result.success || !result.data) {
            return { success: false, error: 'Tasación no encontrada' }
        }

        const appraisal = result.data

        // Check permission (users can only download their own, admins can download all)
        if (currentUser.role !== 'admin' && appraisal.created_by_user_id !== currentUser.id) {
            return { success: false, error: 'No autorizado' }
        }

        // Load the PDF template
        const pdfPath = path.join(process.cwd(), 'public', 'Ficha Final Autos 2025.pdf')
        const existingPdfBytes = await fs.readFile(pdfPath)

        // Load the PDF
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const form = pdfDoc.getForm()

        // Try to fill form fields if they exist
        // Note: Field names need to match the actual PDF form field names
        // You may need to inspect the PDF to get exact field names

        try {
            // Client Information
            fillTextField(form, 'nombre', `${appraisal.client_nombre} ${appraisal.client_apellido}`)
            fillTextField(form, 'rut', appraisal.client_rut)
            fillTextField(form, 'telefono', appraisal.client_telefono)
            fillTextField(form, 'email', appraisal.client_email || '')
            fillTextField(form, 'direccion', appraisal.client_direccion || '')
            fillTextField(form, 'comuna', appraisal.client_comuna || '')

            // Vehicle Information
            fillTextField(form, 'marca', appraisal.vehicle_marca)
            fillTextField(form, 'modelo', appraisal.vehicle_modelo)
            fillTextField(form, 'version', appraisal.vehicle_version || '')
            fillTextField(form, 'ano', appraisal.vehicle_ano?.toString() || '')
            fillTextField(form, 'color', appraisal.vehicle_color || '')
            fillTextField(form, 'kilometraje', appraisal.vehicle_km?.toString() || '')
            fillTextField(form, 'patente', appraisal.vehicle_patente)
            fillTextField(form, 'motor', appraisal.vehicle_motor || '')
            fillTextField(form, 'transmision', appraisal.vehicle_transmision)
            fillTextField(form, 'combustible', appraisal.vehicle_combustible)

            // Documentation
            fillCheckBox(form, 'permiso_circulacion', appraisal.permiso_circulacion)
            fillTextField(form, 'vence_permiso', appraisal.vence_permiso || '')
            fillCheckBox(form, 'revision_tecnica', appraisal.revision_tecnica)
            fillTextField(form, 'vence_revision', appraisal.vence_revision || '')
            fillCheckBox(form, 'soap', appraisal.soap)
            fillCheckBox(form, 'seguro', appraisal.seguro)
            fillTextField(form, 'num_duenos', appraisal.num_duenos?.toString() || '')
            fillCheckBox(form, 'en_prenda', appraisal.en_prenda)

            // Valuation
            fillTextField(form, 'tasacion', appraisal.tasacion?.toString() || '')

            // Technical Details
            fillTextField(form, 'airbags', appraisal.airbags || '')
            fillTextField(form, 'num_llaves', appraisal.num_llaves?.toString() || '')
            fillTextField(form, 'neumaticos', appraisal.neumaticos || '')
            fillTextField(form, 'observaciones', appraisal.observaciones || '')

            // Features (if form has space for it)
            if (appraisal.features && Array.isArray(appraisal.features)) {
                const featuresText = appraisal.features.join(', ')
                fillTextField(form, 'caracteristicas', featuresText)
            }

        } catch (fieldError) {
            console.warn('Some fields could not be filled:', fieldError)
            // Continue anyway - not all fields may exist in the PDF
        }

        // If no form fields exist, add text overlay
        // This creates a new page with the data
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()

        // Add text at specific positions (you'll need to adjust these coordinates)
        try {
            firstPage.drawText(`${appraisal.client_nombre} ${appraisal.client_apellido}`, {
                x: 150,
                y: height - 100,
                size: 12,
                color: rgb(0, 0, 0),
            })

            firstPage.drawText(`${appraisal.vehicle_marca} ${appraisal.vehicle_modelo}`, {
                x: 150,
                y: height - 150,
                size: 12,
                color: rgb(0, 0, 0),
            })

            firstPage.drawText(`Patente: ${appraisal.vehicle_patente}`, {
                x: 150,
                y: height - 200,
                size: 12,
                color: rgb(0, 0, 0),
            })

            firstPage.drawText(`Año: ${appraisal.vehicle_ano}`, {
                x: 150,
                y: height - 225,
                size: 12,
                color: rgb(0, 0, 0),
            })

            if (appraisal.tasacion) {
                firstPage.drawText(`Tasación: $${appraisal.tasacion.toLocaleString('es-CL')}`, {
                    x: 150,
                    y: height - 275,
                    size: 14,
                    color: rgb(0, 0.5, 0),
                })
            }
        } catch (drawError) {
            console.warn('Could not add text overlay:', drawError)
        }

        // Flatten the form (make it read-only)
        form.flatten()

        // Serialize the PDF
        const pdfBytes = await pdfDoc.save()

        // Convert to base64 for transfer
        const base64Pdf = Buffer.from(pdfBytes).toString('base64')

        return {
            success: true,
            data: base64Pdf,
            filename: `Ficha_${appraisal.vehicle_patente}_${Date.now()}.pdf`
        }

    } catch (error) {
        console.error('[PDF] Generation error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error generando PDF'
        }
    }
}

// Helper functions
function fillTextField(form: PDFForm, fieldName: string, value: string) {
    try {
        const field = form.getTextField(fieldName)
        field.setText(value)
    } catch (err) {
        // Field doesn't exist, skip silently
    }
}

function fillCheckBox(form: PDFForm, fieldName: string, checked: boolean) {
    try {
        const field = form.getCheckBox(fieldName)
        if (checked) {
            field.check()
        } else {
            field.uncheck()
        }
    } catch (err) {
        // Field doesn't exist, skip silently
    }
}
