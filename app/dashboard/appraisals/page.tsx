import Link from 'next/link'
import { Plus, Search, Filter, Calendar, Car } from 'lucide-react'
import { getAppraisals } from '@/lib/actions/appraisal-actions'

export default async function AppraisalsPage() {
    const result = await getAppraisals()
    const appraisals = result.data || []

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Tasaciones
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Gestionar todas las tasaciones de vehículos
                    </p>
                </div>
                <Link
                    href="/dashboard/appraisals/new"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Tasación
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre de cliente, patente o vehículo..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                        <Filter className="w-5 h-5" />
                        Filtrar
                    </button>
                </div>
            </div>

            {/* Appraisals List */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                {appraisals.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No se encontraron tasaciones
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Crea tu primera tasación para comenzar
                        </p>
                        <Link
                            href="/dashboard/appraisals/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            New Appraisal
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appraisals.map((appraisal: any) => (
                            <Link
                                key={appraisal.id}
                                href={`/dashboard/appraisals/${appraisal.id}`}
                                className="block p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {appraisal.client_nombre} {appraisal.client_apellido}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {appraisal.vehicle_marca} {appraisal.vehicle_modelo} {appraisal.vehicle_ano}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <strong>Patente:</strong> {appraisal.vehicle_patente}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <strong>KM:</strong> {appraisal.vehicle_km?.toLocaleString()}
                                            </span>
                                            {appraisal.tasacion && (
                                                <span className="flex items-center gap-1">
                                                    <strong>Tasación:</strong> ${appraisal.tasacion?.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(appraisal.created_at).toLocaleDateString()}
                                            </div>
                                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${appraisal.status === 'draft'
                                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                }`}>
                                                {appraisal.status || 'draft'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
