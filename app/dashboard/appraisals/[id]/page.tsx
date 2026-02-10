'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera } from 'lucide-react'
import { getAppraisalById } from '@/lib/actions/appraisal-actions'
import { getAppraisalPhotos } from '@/lib/actions/photo-actions'
import PhotoGallery from '@/components/PhotoGallery'
import PhotoCapture from '@/components/PhotoCapture'
import DownloadPDFButton from '@/components/DownloadPDFButton'

export default async function AppraisalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return <AppraisalDetailContent appraisalId={id} />
}

function AppraisalDetailContent({ appraisalId }: { appraisalId: string }) {
    const router = useRouter()
    const [appraisal, setAppraisal] = useState<any>(null)
    const [photos, setPhotos] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showPhotoCapture, setShowPhotoCapture] = useState(false)

    const loadData = async () => {
        setLoading(true)
        setError(null)
        console.log('Loading appraisal:', appraisalId)
        const [appraisalResult, photosResult] = await Promise.all([
            getAppraisalById(appraisalId),
            getAppraisalPhotos(appraisalId),
        ])

        console.log('Appraisal result:', appraisalResult)
        if (appraisalResult.success) {
            setAppraisal(appraisalResult.data)
        } else {
            console.error('Failed to load appraisal:', appraisalResult.error)
            setError(appraisalResult.error || 'Unknown error')
        }

        if (photosResult.success) {
            setPhotos(photosResult.data)
        }

        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [appraisalId])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!appraisal) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 text-xl mb-4">Appraisal not found</p>
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-2xl mx-auto">
                        <p className="text-red-700 dark:text-red-400 font-mono text-sm">
                            Error: {error}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            Appraisal ID: {appraisalId}
                        </p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {appraisal.vehicle_marca} {appraisal.vehicle_modelo} {appraisal.vehicle_ano}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Appraisal for {appraisal.client_nombre} {appraisal.client_apellido}
                    </p>
                </div>
                <div className="flex gap-3">
                    <DownloadPDFButton appraisalId={appraisalId} />
                    <button
                        onClick={() => setShowPhotoCapture(!showPhotoCapture)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <Camera className="w-5 h-5" />
                        {photos.length === 0 ? 'Add Photos' : 'Add More Photos'}
                    </button>
                </div>
            </div>

            {/* Photo Capture (if active) */}
            {showPhotoCapture && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <PhotoCapture
                        appraisalId={appraisalId}
                        onComplete={() => {
                            setShowPhotoCapture(false)
                            loadData() // Refresh photos
                        }}
                    />
                </div>
            )}

            {/* Photos Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Photos ({photos.length})
                </h2>
                <PhotoGallery
                    photos={photos}
                    appraisalId={appraisalId}
                    onPhotoDeleted={loadData}
                />
            </div>

            {/* Vehicle Information */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Vehicle Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Marca" value={appraisal.vehicle_marca} />
                    <InfoItem label="Modelo" value={appraisal.vehicle_modelo} />
                    <InfoItem label="Version" value={appraisal.vehicle_version} />
                    <InfoItem label="Year" value={appraisal.vehicle_ano} />
                    <InfoItem label="Kilometraje" value={`${appraisal.vehicle_km?.toLocaleString()} km`} />
                    <InfoItem label="Patente" value={appraisal.vehicle_patente} />
                    <InfoItem label="Dígito Verificador" value={appraisal.digito_verificador} />
                    <InfoItem label="Color" value={appraisal.vehicle_color} />
                    <InfoItem label="Transmision" value={appraisal.vehicle_transmision} />
                    <InfoItem label="Combustible" value={appraisal.vehicle_combustible} />
                    <InfoItem label="Motor" value={appraisal.vehicle_motor} />
                    <InfoItem label="Tipo de Auto" value={appraisal.body_type} />
                    <InfoItem label="Tracción" value={appraisal.traccion} />
                    <InfoItem label="Línea de Asientos" value={appraisal.linea_asientos} />
                </div>
            </div>

            {/* Client Information */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Client Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Nombre" value={`${appraisal.client_nombre} ${appraisal.client_apellido}`} />
                    <InfoItem label="RUT" value={appraisal.client_rut} />
                    <InfoItem label="Email" value={appraisal.client_email} />
                    <InfoItem label="Telefono" value={appraisal.client_telefono} />
                    <InfoItem label="Region" value={appraisal.client_region} />
                    <InfoItem label="Comuna" value={appraisal.client_comuna} />
                    <InfoItem label="Direccion" value={appraisal.client_direccion} className="md:col-span-2" />
                </div>
            </div>

            {/* Documentation */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Documentation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Permiso de Circulacion" value={appraisal.permiso_circulacion ? 'Yes' : 'No'} />
                    <InfoItem label="Permiso Vence" value={appraisal.permiso_vence} />
                    <InfoItem label="Permiso Comuna" value={appraisal.permiso_comuna} />
                    <InfoItem label="Revision Tecnica" value={appraisal.revision_tecnica ? 'Yes' : 'No'} />
                    <InfoItem label="Revisión Vence" value={appraisal.revision_vence} />
                    <InfoItem label="SOAP" value={appraisal.soap ? 'Yes' : 'No'} />
                    <InfoItem label="SOAP Compañía" value={appraisal.soap_compania} />
                    <InfoItem label="Seguro" value={appraisal.seguro ? 'Yes' : 'No'} />
                    <InfoItem label="Seguro Compañía" value={appraisal.seguro_compania} />
                    <InfoItem label="Mantenciones" value={appraisal.mantenciones} />
                    <InfoItem label="Código SII" value={appraisal.codigo_sii} />
                    <InfoItem label="Numero de Dueños" value={appraisal.num_duenos} />
                    <InfoItem label="En Prenda" value={appraisal.en_prenda ? 'YES ⚠️' : 'No'} />
                    <InfoItem label="En Remate" value={appraisal.remate ? 'YES ⚠️' : 'No'} />
                </div>
            </div>

            {/* Pricing - Only show if any pricing data exists */}
            {(appraisal.precio_publicado || appraisal.precio_sugerido || appraisal.tasacion || appraisal.comision) && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Pricing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem
                            label="Precio Publicado"
                            value={appraisal.precio_publicado ? `$${appraisal.precio_publicado?.toLocaleString()} CLP` : 'N/A'}
                        />
                        <InfoItem
                            label="Precio Sugerido"
                            value={appraisal.precio_sugerido ? `$${appraisal.precio_sugerido?.toLocaleString()} CLP` : 'N/A'}
                        />
                        <InfoItem
                            label="Tasacion"
                            value={appraisal.tasacion ? `$${appraisal.tasacion?.toLocaleString()} CLP` : 'N/A'}
                        />
                        <InfoItem
                            label="Comisión"
                            value={appraisal.comision ? `$${appraisal.comision?.toLocaleString()} CLP` : 'N/A'}
                        />
                    </div>
                </div>
            )}

            {/* Technical Details - Only show if any technical data exists */}
            {(appraisal.airbags || appraisal.num_llaves || appraisal.neumaticos || appraisal.quien_tomo_fotos) && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Technical Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem label="Airbags" value={appraisal.airbags} />
                        <InfoItem label="Número de Llaves" value={appraisal.num_llaves} />
                        <InfoItem label="Neumáticos OK" value={appraisal.neumaticos?.filter((t: boolean) => t).length || 0} />
                        <InfoItem label="Quién Tomó Fotos" value={appraisal.quien_tomo_fotos} />
                    </div>
                </div>
            )}

            {/* Features */}
            {appraisal.features && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Features
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(appraisal.features).map(([key, value]) => {
                            const isEnabled = Boolean(value)
                            return (
                                <div key={key} className="flex items-center gap-2">
                                    <span className={`w-5 h-5 rounded flex items-center justify-center ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                                        {isEnabled && '✓'}
                                    </span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Observations */}
            {appraisal.observaciones && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Observations
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {appraisal.observaciones}
                    </p>
                </div>
            )}
        </div>
    )
}

function InfoItem({ label, value, className = '' }: { label: string; value: any; className?: string }) {
    return (
        <div className={className}>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</dt>
            <dd className="text-lg text-gray-900 dark:text-white">{value || '-'}</dd>
        </div>
    )
}
