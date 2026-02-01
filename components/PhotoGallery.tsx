'use client'

import { useState } from 'react'
import { Download, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { deleteAppraisalPhoto } from '@/lib/actions/photo-actions'

interface Photo {
    id: string
    publicUrl: string
    file_name: string
    created_at: string
}

interface PhotoGalleryProps {
    photos: Photo[]
    appraisalId: string
    onPhotoDeleted?: () => void
}

export default function PhotoGallery({ photos, appraisalId, onPhotoDeleted }: PhotoGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [deleting, setDeleting] = useState<string | null>(null)

    const handleDownload = async (photo: Photo) => {
        try {
            const response = await fetch(photo.publicUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = photo.file_name
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Download failed:', error)
            alert('Failed to download photo')
        }
    }

    const handleDelete = async (photoId: string) => {
        if (!confirm('Are you sure you want to delete this photo?')) return

        setDeleting(photoId)
        const result = await deleteAppraisalPhoto(photoId)
        setDeleting(null)

        if (result.success) {
            setSelectedIndex(null)
            onPhotoDeleted?.()
        } else {
            alert(`Failed to delete photo: ${result.error}`)
        }
    }

    const openLightbox = (index: number) => {
        setSelectedIndex(index)
    }

    const closeLightbox = () => {
        setSelectedIndex(null)
    }

    const goToPrevious = () => {
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
    }

    const goToNext = () => {
        if (selectedIndex === null) return
        setSelectedIndex((selectedIndex + 1) % photos.length)
    }

    if (photos.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                    No photos uploaded yet
                </p>
            </div>
        )
    }

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, idx) => (
                    <div
                        key={photo.id}
                        onClick={() => openLightbox(idx)}
                        className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer group hover:ring-4 hover:ring-blue-500 transition-all"
                    >
                        <img
                            src={photo.publicUrl}
                            alt={photo.file_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Navigation */}
                    {photos.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <img
                            src={photos[selectedIndex].publicUrl}
                            alt={photos[selectedIndex].file_name}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                        <button
                            onClick={() => handleDownload(photos[selectedIndex])}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            Download
                        </button>
                        <button
                            onClick={() => handleDelete(photos[selectedIndex].id)}
                            disabled={deleting === photos[selectedIndex].id}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {deleting === photos[selectedIndex].id ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-5 h-5" />
                                    Delete
                                </>
                            )}
                        </button>
                    </div>

                    {/* Photo Info */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                        <p className="text-white text-sm">
                            {selectedIndex + 1} / {photos.length}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}
