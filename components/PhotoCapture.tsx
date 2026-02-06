'use client'

import { useState } from 'react'
import { Camera, Upload, X, Check } from 'lucide-react'
import { uploadAppraisalPhoto } from '@/lib/actions/photo-actions'

interface PhotoCaptureProps {
    appraisalId: string
    onComplete?: () => void
}

export default function PhotoCapture({ appraisalId, onComplete }: PhotoCaptureProps) {
    const [uploading, setUploading] = useState(false)
    const [uploadedCount, setUploadedCount] = useState(0)
    const [previews, setPreviews] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        setUploading(true)
        setError(null)

        // Create previews
        const newPreviews = await Promise.all(
            files.map((file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })
            })
        )
        setPreviews(newPreviews)

        // Upload files
        let successCount = 0
        let errorMessages: string[] = []

        for (const file of files) {
            const formData = new FormData()
            formData.append('file', file)

            try {
                console.log('Uploading file:', file.name, 'Size:', file.size)
                const result = await uploadAppraisalPhoto(appraisalId, formData)
                console.log('Upload result:', result)

                if (result.success) {
                    successCount++
                    setUploadedCount(successCount)
                } else {
                    console.error('Upload failed:', result.error)
                    errorMessages.push(`${file.name}: ${result.error}`)
                }
            } catch (err) {
                console.error('Upload exception:', err)
                errorMessages.push(`${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`)
            }
        }

        setUploading(false)

        if (errorMessages.length > 0) {
            setError(`Failed to upload ${errorMessages.length} photo(s):\n${errorMessages.join('\n')}`)
        }

        // Auto-complete after 1 second if at least one succeeded
        if (onComplete && successCount > 0) {
            setTimeout(() => {
                onComplete()
            }, 1000)
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Camera className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Capture Vehicle Photos
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Take high-quality photos of the vehicle for this appraisal
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                    📱 Note: Camera opens automatically on mobile devices. On desktop, you can upload photos from your computer.
                </p>
            </div>

            {/* Upload Button */}
            <div className="flex flex-col gap-4">
                <label
                    htmlFor="photo-input"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
                >
                    <Camera className="w-6 h-6" />
                    {uploading ? 'Uploading...' : 'Open Camera'}
                </label>
                <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="hidden"
                />

                {/* Alternative: Upload from Gallery */}
                <label
                    htmlFor="gallery-input"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
                >
                    <Upload className="w-6 h-6" />
                    Upload from Gallery
                </label>
                <input
                    id="gallery-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="hidden"
                />
            </div>

            {/* Upload Progress */}
            {uploading && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-blue-700 dark:text-blue-400 font-medium">
                            Uploading {uploadedCount} photo{uploadedCount !== 1 ? 's' : ''}...
                        </p>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {!uploading && uploadedCount > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-green-700 dark:text-green-400 font-medium">
                            Successfully uploaded {uploadedCount} photo{uploadedCount !== 1 ? 's' : ''}!
                        </p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-700 dark:text-red-400 font-medium whitespace-pre-wrap">
                        {error}
                    </p>
                </div>
            )}

            {/* Preview Grid */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previews.map((preview, idx) => (
                        <div
                            key={idx}
                            className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                        >
                            <img
                                src={preview}
                                alt={`Preview ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
