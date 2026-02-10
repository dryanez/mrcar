'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getUserById, updateUser, resetUserPassword } from '@/lib/actions/user-settings-actions'
import { User, Mail, MapPin, Lock, Loader2, ArrowLeft } from 'lucide-react'

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    return <EditUserContent params={params} />
}

function EditUserContent({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [userId, setUserId] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPasswordReset, setShowPasswordReset] = useState(false)
    const [newPassword, setNewPassword] = useState('')

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        sucursal: 'Vitacura' as 'Vitacura' | 'Viña del Mar',
        role: 'user' as 'admin' | 'user',
        is_active: true
    })

    useEffect(() => {
        params.then(p => {
            setUserId(p.id)
            loadUser(p.id)
        })
    }, [])

    const loadUser = async (id: string) => {
        setLoading(true)
        const result = await getUserById(id)

        if (result.success && result.data) {
            setFormData({
                nombre: result.data.nombre || '',
                apellido: result.data.apellido || '',
                email: result.data.email || '',
                sucursal: result.data.sucursal || 'Vitacura',
                role: result.data.role || 'user',
                is_active: result.data.is_active ?? true
            })
        } else {
            setError(result.error || 'Error al cargar usuario')
        }
        setLoading(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setSaving(true)

        const result = await updateUser(userId, formData)

        if (result.success) {
            setSuccess('Usuario actualizado exitosamente')
            setTimeout(() => router.push('/admin/users'), 1500)
        } else {
            setError(result.error || 'Error al actualizar usuario')
        }
        setSaving(false)
    }

    const handlePasswordReset = async () => {
        if (!newPassword || newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setError('')
        setSuccess('')
        setSaving(true)

        const result = await resetUserPassword(userId, newPassword)

        if (result.success) {
            setSuccess('Contraseña actualizada exitosamente')
            setNewPassword('')
            setShowPasswordReset(false)
        } else {
            setError(result.error || 'Error al resetear contraseña')
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver
                </button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Editar Usuario
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Modificar información del usuario
                </p>
            </div>

            {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* User Info Form */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Información Personal
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nombre *
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    required
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none text-base"
                                />
                            </div>
                        </div>

                        {/* Apellido */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Apellido *
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    required
                                    value={formData.apellido}
                                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                    className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email *
                        </label>
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none text-base"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Sucursal */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Sucursal *
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <select
                                    required
                                    value={formData.sucursal}
                                    onChange={(e) => setFormData({ ...formData, sucursal: e.target.value as any })}
                                    className="flex-1 bg-transparent text-gray-900 dark:text-white outline-none text-base appearance-none cursor-pointer"
                                >
                                    <option value="Vitacura">Vitacura</option>
                                    <option value="Viña del Mar">Viña del Mar</option>
                                </select>
                            </div>
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Rol *
                            </label>
                            <select
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white outline-none"
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Usuario Activo
                        </label>
                    </div>

                    {/* Submit */}
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
                            disabled={saving}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 font-semibold"
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Password Reset Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Resetear Contraseña
                </h2>

                {!showPasswordReset ? (
                    <button
                        onClick={() => setShowPasswordReset(true)}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                    >
                        Cambiar Contraseña
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nueva Contraseña
                            </label>
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3">
                                <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
                                    className="flex-1 bg-transparent text-gray-900 dark:text-white outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowPasswordReset(false)
                                    setNewPassword('')
                                }}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handlePasswordReset}
                                disabled={saving}
                                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg disabled:opacity-50"
                            >
                                {saving ? 'Reseteando...' : 'Resetear Contraseña'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
