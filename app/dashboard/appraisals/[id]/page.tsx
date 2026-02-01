'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera } from 'lucide-react'
import { getAppraisalById } from '@/lib/actions/appraisal-actions'
import { getAppraisalPhotos } from '@/lib/actions/photo-actions'
import PhotoGallery from '@/components/PhotoGallery'
import PhotoCapture from '@/components/PhotoCapture'

export default function AppraisalDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [appraisal, setAppraisal] = useState<any>(null)
    const [photos, setPhotos] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showPhotoCapture, setShowPhotoCapture] = useState(false)

    const loadData = async () => {
        setLoading(true)
        console.log('Loading appraisal:', params.id)
        const [appraisalResult, photosResult] = await Promise.all([
            getAppraisalById(params.id),
            getAppraisalPhotos(params.id),
        ])

        console.log('Appraisal result:', appraisalResult)
        if (appraisalResult.success) {
            setAppraisal(appraisalResult.data)
        } else {
            console.error('Failed to load appraisal:', appraisalResult.error)
        }

        if (photosResult.success) {
            setPhotos(photosResult.data)
        }

        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [params.id])

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
                <p className="text-gray-500">Appraisal not found</p>
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
                <button
                    onClick={() => setShowPhotoCapture(!showPhotoCapture)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <Camera className="w-5 h-5" />
                    {photos.length === 0 ? 'Add Photos' : 'Add More Photos'}
                </button>
            </div>

            {/* Photo Capture (if active) */}
            {showPhotoCapture && (
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <PhotoCapture
                        appraisalId={params.id}
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
                    appraisalId={params.id}
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
                    <InfoItem label="Color" value={appraisal.vehicle_color} />
                    <InfoItem label="Transmision" value={appraisal.vehicle_transmision} />
                    <InfoItem label="Combustible" value={appraisal.vehicle_combustible} />
                    <InfoItem label="Motor" value={appraisal.vehicle_motor} />
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
                    <InfoItem label="Revision Tecnica" value={appraisal.revision_tecnica ? 'Yes' : 'No'} />
                    <InfoItem label="SOAP" value={appraisal.soap ? 'Yes' : 'No'} />
                    <InfoItem label="Seguro" value={appraisal.seguro ? 'Yes' : 'No'} />
                    <InfoItem label="En Prenda" value={appraisal.en_prenda ? 'YES ⚠️' : 'No'} />
                    <InfoItem label="Numero de Dueños" value={appraisal.num_duenos} />
                    <InfoItem
                        label="Tasacion"
                        value={appraisal.tasacion ? `$${appraisal.tasacion?.toLocaleString()} CLP` : 'N/A'}
                    />
                </div>
            </div>

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
