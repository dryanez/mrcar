'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/user-actions'
import { ArrowLeft, User, Mail, MapPin, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewUserPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState<{ email: string; password: string } | null>(null)

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        sucursal: 'Vitacura' as 'Vitacura' | 'Viña del Mar'
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await createUser(formData)

            if (result.success && result.tempPassword) {
                setSuccess({
                    email: formData.email,
                    password: result.tempPassword
                })
            } else {
                setError(result.error || 'Error al crear usuario')
            }
        } catch (err) {
            setError('Error del servidor')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        ¡Usuario Creado Exitosamente!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Se ha enviado un correo electrónico a <strong>{success.email}</strong> con las credenciales de acceso.
                    </p>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Credenciales temporales (guárdalas de forma segura):
                        </p>
                        <div className="space-y-2 text-left">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                                <code className="text-sm font-mono text-gray-900 dark:text-white">{success.email}</code>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Contraseña:</span>
                                <code className="text-sm font-mono text-gray-900 dark:text-white">{success.password}</code>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                setSuccess(null)
                                setFormData({
                                    nombre: '',
                                    apellido: '',
                                    email: '',
                                    sucursal: 'Vitacura'
                                })
                            }}
                            className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Crear Otro Usuario
                        </button>
                        <Link
                            href="/admin/users"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Ver Todos los Usuarios
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Usuarios
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Crear Nuevo Usuario
                </h1>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <p className="text-red-700 dark:text-red-400">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                                placeholder="Juan"
                            />
                        </div>
                    </div>

                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Apellido *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={formData.apellido}
                                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                                placeholder="Pérez"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                                placeholder="juan.perez@mrcar.cl"
                            />
                        </div>
                    </div>

                    {/* Sucursal */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sucursal *
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                required
                                value={formData.sucursal}
                                onChange={(e) => setFormData({ ...formData, sucursal: e.target.value as 'Vitacura' | 'Viña del Mar' })}
                                className="w-full pl-14 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white appearance-none"
                            >
                                <option value="Vitacura">Vitacura</option>
                                <option value="Viña del Mar">Viña del Mar</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                            💡 Se generará una contraseña temporal automáticamente y se enviará por correo electrónico al usuario.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Creando usuario...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Crear Usuario
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
