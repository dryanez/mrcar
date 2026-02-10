'use client'

import { useState } from 'react'
import { Download, Loader2, AlertCircle } from 'lucide-react'
import { generateMrCarPDF } from '@/lib/actions/pdf-generator'

export default function DownloadPDFButton({ appraisalId }: { appraisalId: string }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDownload = async () => {
        setLoading(true)
        setError('')

        try {
            const result = await generateMrCarPDF(appraisalId)

            if (result.success && result.data) {
                // Convert base64 to blob
                const byteCharacters = atob(result.data)
                const byteNumbers = new Array(byteCharacters.length)
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                const byteArray = new Uint8Array(byteNumbers)
                const blob = new Blob([byteArray], { type: 'application/pdf' })

                // Create download link
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'ficha-tasacion.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
            } else {
                setError(result.error || 'Error al generar PDF')
            }
        } catch (err) {
            setError('Error al descargar PDF')
            console.error('Download error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleDownload}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generando PDF...
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        Descargar Ficha PDF
                    </>
                )}
            </button>
            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    )
}
