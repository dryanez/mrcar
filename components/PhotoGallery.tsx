'use client'

import { useState } from 'react'
import { Download, Trash2, X, ChevronLeft, ChevronRight, DownloadCloud, Trash, Sparkles } from 'lucide-react'
import { deleteAppraisalPhoto, deleteAllAppraisalPhotos, uploadAppraisalPhoto } from '@/lib/actions/photo-actions'
import { detectSensitiveContent } from '@/lib/actions/image-blur-actions'
import { blurImageRegions } from '@/lib/utils/image-blur'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

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
    const [downloadingAll, setDownloadingAll] = useState(false)
    const [deletingAll, setDeletingAll] = useState(false)
    const [blurring, setBlurring] = useState(false)
    const [blurProgress, setBlurProgress] = useState({ current: 0, total: 0 })

    const handleDownloadAll = async () => {
        if (photos.length === 0) return

        setDownloadingAll(true)
        try {
            const zip = new JSZip()

            // Fetch and add all photos to ZIP
            await Promise.all(
                photos.map(async (photo, index) => {
                    try {
                        const response = await fetch(photo.publicUrl)
                        const blob = await response.blob()
                        const fileName = photo.file_name || `photo-${index + 1}.jpg`
                        zip.file(fileName, blob)
                    } catch (error) {
                        console.error(`Failed to fetch ${photo.file_name}:`, error)
                    }
                })
            )

            // Generate and download ZIP
            const zipBlob = await zip.generateAsync({ type: 'blob' })
            saveAs(zipBlob, `appraisal-${appraisalId}-photos.zip`)
        } catch (error) {
            console.error('Failed to create ZIP:', error)
            alert('Failed to download photos')
        } finally {
            setDownloadingAll(false)
        }
    }

    const handleDeleteAll = async () => {
        if (!confirm(`Are you sure you want to delete ALL ${photos.length} photos? This cannot be undone!`)) return

        setDeletingAll(true)
        const result = await deleteAllAppraisalPhotos(appraisalId)
        setDeletingAll(false)

        if (result.success) {
            onPhotoDeleted?.()
        } else {
            alert(`Failed to delete photos: ${result.error}`)
        }
    }

    const handleAutoBlur = async () => {
        if (!confirm(`This will automatically blur license plates and people in ALL ${photos.length} photos. The original photos will be replaced. Continue?`)) return

        setBlurring(true)
        setBlurProgress({ current: 0, total: photos.length })

        const processedPhotos: { blob: Blob; fileName: string; photoId: string }[] = []

        try {
            // Process each photo
            for (let i = 0; i < photos.length; i++) {
                const photo = photos[i]
                setBlurProgress({ current: i + 1, total: photos.length })

                try {
                    // 1. Detect sensitive content
                    console.log(`[Auto-Blur] Processing ${photo.file_name}...`)
                    const detection = await detectSensitiveContent(photo.publicUrl)

                    if (!detection.success || detection.detections.length === 0) {
                        console.log(`[Auto-Blur] No sensitive content found in ${photo.file_name}`)
                        continue
                    }

                    console.log(`[Auto-Blur] Found ${detection.detections.length} regions to blur`)

                    // 2. Blur the regions
                    const blurredBlob = await blurImageRegions(photo.publicUrl, detection.detections)

                    // 3. Store for upload
                    processedPhotos.push({
                        blob: blurredBlob,
                        fileName: photo.file_name,
                        photoId: photo.id
                    })
                } catch (error) {
                    console.error(`[Auto-Blur] Failed to process ${photo.file_name}:`, error)
                }
            }

            if (processedPhotos.length === 0) {
                alert('No license plates or people detected in any photos!')
                return
            }

            // 4. Delete processed photos
            console.log(`[Auto-Blur] Deleting ${processedPhotos.length} original photos...`)
            for (const processed of processedPhotos) {
                await deleteAppraisalPhoto(processed.photoId)
            }

            // 5. Upload blurred versions
            console.log(`[Auto-Blur] Uploading ${processedPhotos.length} blurred photos...`)
            for (const processed of processedPhotos) {
                const formData = new FormData()
                const file = new File([processed.blob], processed.fileName, { type: 'image/jpeg' })
                formData.append('file', file)
                await uploadAppraisalPhoto(appraisalId, formData)
            }

            alert(`Successfully blurred ${processedPhotos.length} photos!`)
            onPhotoDeleted?.() // Refresh gallery
        } catch (error) {
            console.error('[Auto-Blur] Error:', error)
            alert('Failed to process photos. Check console for details.')
        } finally {
            setBlurring(false)
            setBlurProgress({ current: 0, total: 0 })
        }
    }

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
            {/* Bulk Actions */}
            {photos.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={handleAutoBlur}
                        disabled={blurring || downloadingAll || deletingAll}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {blurring ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Blurring {blurProgress.current}/{blurProgress.total}...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Auto-Blur Sensitive Content
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleDownloadAll}
                        disabled={downloadingAll || blurring}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloadingAll ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Downloading...
                            </>
                        ) : (
                            <>
                                <DownloadCloud className="w-5 h-5" />
                                Download All ({photos.length})
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        disabled={deletingAll || blurring}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {deletingAll ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash className="w-5 h-5" />
                                Delete All ({photos.length})
                            </>
                        )}
                    </button>
                </div>
            )}

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
