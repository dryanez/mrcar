'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { changePassword } from '@/lib/actions/user-settings-actions'
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function ChangePasswordPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // Validation
        if (formData.newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres')
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (formData.currentPassword === formData.newPassword) {
            setError('La nueva contraseña debe ser diferente a la actual')
            return
        }

        setLoading(true)

        try {
            const result = await changePassword(formData.currentPassword, formData.newPassword)

            if (result.success) {
                setSuccess(true)
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                setTimeout(() => {
                    router.push('/dashboard')
                }, 2000)
            } else {
                setError(result.error || 'Error al cambiar contraseña')
            }
        } catch (err) {
            setError('Error del servidor')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Cambiar Contraseña
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Actualiza tu contraseña de acceso
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
                {success && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Contraseña cambiada exitosamente. Redirigiendo...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contraseña Actual *
                        </label>
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                required
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-base"
                                placeholder="Tu contraseña actual"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nueva Contraseña *
                        </label>
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                required
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-base"
                                placeholder="Mínimo 6 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirmar Nueva Contraseña *
                        </label>
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-base"
                                placeholder="Repite la nueva contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                            {loading ? 'Guardando...' : 'Cambiar Contraseña'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
