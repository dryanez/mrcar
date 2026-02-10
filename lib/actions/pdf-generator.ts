'use server'

import { getAppraisalById } from './appraisal-actions'
import { jsPDF } from 'jspdf'

export async function generateMrCarPDF(appraisalId: string) {
    try {
        const result = await getAppraisalById(appraisalId)

        if (!result.success || !result.data) {
            return { success: false, error: 'Tasación no encontrada' }
        }

        const appraisal = result.data

        // Create new PDF document (A4 size)
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        })

        // Set default font
        doc.setFont('helvetica', 'normal')

        // Helper function to add text at specific position
        const addText = (text: string, x: number, y: number, size = 10, style: 'normal' | 'bold' = 'normal') => {
            doc.setFontSize(size)
            doc.setFont('helvetica', style)
            doc.text(text, x, y)
        }

        // Helper function to draw a line
        const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
            doc.setLineWidth(0.3)
            doc.line(x1, y1, x2, y2)
        }

        // ===== HEADER =====
        addText('Mr Car', 15, 15, 18, 'bold')
        addText('Sistema de tasaciones y compra de autos', 15, 20, 8)

        // Date
        const fecha = new Date().toLocaleDateString('es-CL')
        addText(`FECHA: ${fecha}`, 145, 15, 10)

        // ===== CLIENT INFORMATION =====
        let y = 35

        // Name, Apellido, Phone
        addText('NOMBRE:', 15, y, 9, 'bold')
        addText(appraisal.client_name || '', 40, y, 10)

        addText('APELLIDO:', 105, y, 9, 'bold')
        addText(appraisal.client_apellido || '', 130, y, 10)

        addText('TELÉFONO:', 160, y, 9, 'bold')
        addText(appraisal.client_phone || '', 180, y, 10)
        drawLine(15, y + 2, 200, y + 2)

        y += 10

        // Email and RUT
        addText('MAIL:', 15, y, 9, 'bold')
        addText(appraisal.client_email || '', 30, y, 10)

        addText('RUT:', 140, y, 9, 'bold')
        addText(appraisal.client_rut || '', 155, y, 10)
        drawLine(15, y + 2, 200, y + 2)

        y += 10

        // Contact and second phone
        addText('CONTACTO:', 15, y, 9, 'bold')
        addText(appraisal.contact_name || '', 40, y, 10)

        addText('TELÉFONO:', 140, y, 9, 'bold')
        addText(appraisal.contact_phone || '', 165, y, 10)
        drawLine(15, y + 2, 200, y + 2)

        y += 10

        // Address and Comuna
        addText('DIRECCIÓN:', 15, y, 9, 'bold')
        addText(appraisal.client_address || '', 40, y, 10)

        addText('COMUNA:', 140, y, 9, 'bold')
        addText(appraisal.client_comuna || '', 160, y, 10)
        drawLine(15, y + 2, 200, y + 2)

        y += 10

        // Observations
        addText('OBS:', 15, y, 9, 'bold')
        addText(appraisal.observations || '', 30, y, 9)
        drawLine(15, y + 2, 200, y + 2)

        y += 12

        // ===== VEHICLE INFORMATION =====
        addText('MARCA:', 15, y, 9, 'bold')
        addText(appraisal.brand || '', 35, y, 10)

        addText('MODELO:', 80, y, 9, 'bold')
        addText(appraisal.model || '', 102, y, 10)

        addText('VERSIÓN:', 145, y, 9, 'bold')
        addText(appraisal.version || '', 165, y, 10)
        drawLine(15, y + 2, 200, y + 2)

        y += 10

        // Year, Color, KM, Motor, Patente
        addText('AÑO:', 15, y, 9, 'bold')
        addText(appraisal.year?.toString() || '', 30, y, 10)

        addText('COLOR:', 50, y, 9, 'bold')
        addText(appraisal.color || '', 67, y, 10)

        addText('KM:', 95, y, 9, 'bold')
        addText(appraisal.kilometers?.toLocaleString('es-CL') || '', 105, y, 10)

        addText('MOTOR:', 130, y, 9, 'bold')
        addText(appraisal.motor || '', 148, y, 10)

        addText('PATENTE:', 168, y, 9, 'bold')
        addText(appraisal.patent || '', 185, y, 10)
        drawLine(15, y + 2, 200, y + 2)

        y += 12

        // ===== DOCUMENTATION TABLE =====
        doc.setFillColor(240, 240, 240)
        doc.rect(15, y - 5, 185, 8, 'F')

        addText('PERMISO DE CIRCULACIÓN:', 20, y, 8, 'bold')
        addText('SI    NO', 70, y, 8)

        addText('REVISIÓN TÉCNICA:', 95, y, 8, 'bold')
        addText('SI    NO', 130, y, 8)

        addText('SOAP:', 145, y, 8, 'bold')
        addText('SI    NO', 160, y, 8)

        addText('SEGURO:', 175, y, 8, 'bold')
        addText('SI    NO', 190, y, 8)

        // Check boxes (using X for yes)
        if (appraisal.permiso_circulacion) doc.text('X', 72, y - 0.5)
        if (!appraisal.permiso_circulacion) doc.text('X', 81, y - 0.5)

        if (appraisal.revision_tecnica) doc.text('X', 132, y - 0.5)
        if (!appraisal.revision_tecnica) doc.text('X', 141, y - 0.5)

        if (appraisal.soap) doc.text('X', 162, y - 0.5)
        if (!appraisal.soap) doc.text('X', 171, y - 0.5)

        if (appraisal.seguro) doc.text('X', 192, y - 0.5)
        if (!appraisal.seguro) doc.text('X', 201, y - 0.5)

        y += 10

        // Expiry dates row
        addText('VENCE:', 20, y, 8)
        addText(appraisal.permiso_vence || '', 35, y, 8)

        addText('VENCE:', 95, y, 8)
        addText(appraisal.revision_vence || '', 110, y, 8)

        addText('COMPAÑÍA:', 145, y, 8)
        addText(appraisal.soap_compania || '', 165, y, 8)

        addText('COMPAÑÍA:', 175, y, 8)
        addText(appraisal.seguro_compania || '', 190, y, 8)

        y += 8

        // Additional info row
        addText('COMUNA:', 20, y, 8)
        addText(appraisal.permiso_comuna || '', 38, y, 8)

        addText('MANTENCIONES:', 95, y, 8)
        addText(appraisal.mantenciones || '', 125, y, 8)

        y += 8

        addText('DUEÑOS:', 20, y, 8)
        addText(appraisal.duenos?.toString() || '', 38, y, 8)

        addText('CÓDIGO SII:', 145, y, 8)
        addText(appraisal.codigo_sii || '', 170, y, 8)

        y += 15

        // ===== PRICING TABLE =====
        // Table headers
        doc.setFillColor(220, 220, 220)
        doc.rect(15, y - 5, 65, 7, 'F')
        addText('PRECIO PUBLICADO', 20, y, 8, 'bold')

        drawLine(15, y + 2, 80, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('PRECIO SUGERIDO', 20, y, 8, 'bold')
        addText(`$${(appraisal.precio_sugerido || 0).toLocaleString('es-CL')}`, 85, y, 10, 'bold')

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('DÍGITO PATENTE', 20, y, 8, 'bold')
        addText(appraisal.digito_verificador || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('COMBUSTIBLE', 20, y, 8, 'bold')
        addText(appraisal.fuel_type || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('TRANSMISIÓN', 20, y, 8, 'bold')
        addText(appraisal.transmission || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('TIPO DE AUTO', 20, y, 8, 'bold')
        addText(appraisal.body_type || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('AIRBAGS', 20, y, 8, 'bold')
        addText(appraisal.airbags?.toString() || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('AIRE ACONDICIONADO', 20, y, 8, 'bold')
        addText(appraisal.aire_acondicionado ? 'Sí' : 'No', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('BLUETOOTH', 20, y, 8, 'bold')
        addText(appraisal.bluetooth ? 'Sí' : 'No', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        // NEW: Tracción
        doc.rect(15, y - 5, 65, 7, 'F')
        addText('TRACCIÓN', 20, y, 8, 'bold')
        addText(appraisal.traccion || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        // NEW: Línea Asientos
        doc.rect(15, y - 5, 65, 7, 'F')
        addText('LÍNEA DE ASIENTOS', 20, y, 8, 'bold')
        addText(appraisal.linea_asientos?.toString() || '', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        // NEW: Additional Features
        const features = appraisal.features || {}

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('CALEFACTOR ASIENTO', 20, y, 8, 'bold')
        addText(features.calefactorAsiento ? 'Sí' : 'No', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('GPS', 20, y, 8, 'bold')
        addText(features.gps ? 'Sí' : 'No', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('SMART KEY', 20, y, 8, 'bold')
        addText(features.smartKey ? 'Sí' : 'No', 85, y, 10)

        drawLine(15, y + 2, 110, y + 2)
        y += 8

        doc.rect(15, y - 5, 65, 7, 'F')
        addText('CARPLAY/ANDROID', 20, y, 8, 'bold')
        addText(features.carplayAndroid ? 'Sí' : 'No', 85, y, 10)

        y += 15

        // NEW: Pricing Info
        if (appraisal.precio_publicado || appraisal.comision || appraisal.remate) {
            addText('═══ INFORMACIÓN ADICIONAL ═══', 15, y, 10, 'bold')
            y += 10

            if (appraisal.precio_publicado) {
                addText('Precio Publicado:', 20, y, 9)
                addText(`$${appraisal.precio_publicado.toLocaleString('es-CL')}`, 70, y, 9, 'bold')
                y += 7
            }

            if (appraisal.comision) {
                addText('Comisión:', 20, y, 9)
                addText(`$${appraisal.comision.toLocaleString('es-CL')}`, 70, y, 9, 'bold')
                y += 7
            }

            if (appraisal.remate) {
                addText('⚠️ En REMATE', 20, y, 9, 'bold')
                y += 7
            }

            if (appraisal.quien_tomo_fotos) {
                addText('Fotos por:', 20, y, 8)
                addText(appraisal.quien_tomo_fotos, 50, y, 8)
                y += 7
            }

            y += 8
        }

        y += 15

        // ===== VALUATION (BIG GREEN TEXT) =====
        if (appraisal.valuation) {
            doc.setTextColor(34, 139, 34) // Green color
            doc.setFontSize(16)
            doc.setFont('helvetica', 'bold')
            doc.text(`Tasación: $${appraisal.valuation.toLocaleString('es-CL')}`, 105, y, { align: 'center' })
            doc.setTextColor(0, 0, 0) // Reset to black
        }

        // ===== FOOTER =====
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text('MrCar - Sistema de Tasaciones', 105, 285, { align: 'center' })
        doc.text(`Generado: ${new Date().toLocaleString('es-CL')}`, 105, 290, { align: 'center' })

        // Convert to base64
        const pdfBase64 = doc.output('datauristring').split(',')[1]

        return {
            success: true,
            data: pdfBase64
        }
    } catch (error) {
        console.error('Error generating PDF:', error)
        return { success: false, error: 'Error al generar PDF' }
    }
}
