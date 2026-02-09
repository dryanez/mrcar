import { getUserPerformance, getWeeklyData, getLocationStats, getMonthlyTrends } from '@/lib/actions/analytics-actions'
import { WeeklyChart, MonthlyTrendChart, LocationPieChart, UserPerformanceChart } from '@/components/analytics/Charts'
import { TrendingUp, Users, MapPin, Calendar, Award } from 'lucide-react'

export default async function AnalyticsPage() {
    const [
        userPerformanceResult,
        weeklyDataResult,
        locationStatsResult,
        monthlyTrendsResult
    ] = await Promise.all([
        getUserPerformance(),
        getWeeklyData(),
        getLocationStats(),
        getMonthlyTrends()
    ])

    const userPerformance = userPerformanceResult.data || []
    const weeklyData = weeklyDataResult.data || []
    const locationStats = locationStatsResult.data || []
    const monthlyTrends = monthlyTrendsResult.data || []

    // Calculate overall stats
    const totalAppraisals = userPerformance.reduce((sum, user) => sum + user.total, 0)
    const totalThisWeek = userPerformance.reduce((sum, user) => sum + user.thisWeek, 0)
    const totalThisMonth = userPerformance.reduce((sum, user) => sum + user.thisMonth, 0)

    // Top performer
    const topPerformer = userPerformance[0]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analíticas y Reportes
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Rendimiento detallado por usuario, sucursal y período
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAppraisals}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                            <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Esta Semana</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalThisWeek}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Este Mes</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalThisMonth}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                            <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Top Usuario</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                {topPerformer ? `${topPerformer.nombre} ${topPerformer.apellido}` : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Tendencia Mensual
                    </h2>
                    <MonthlyTrendChart data={monthlyTrends} />
                </div>

                {/* Location Breakdown */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        Por Sucursal
                    </h2>
                    {locationStats.length > 0 ? (
                        <LocationPieChart data={locationStats} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No hay datos de sucursales
                        </div>
                    )}
                </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Actividad Semanal (Últimas 12 Semanas)
                </h2>
                <WeeklyChart data={weeklyData} />
            </div>

            {/* User Performance */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    Rendimiento por Usuario (Top 10)
                </h2>
                {userPerformance.length > 0 ? (
                    <UserPerformanceChart data={userPerformance} />
                ) : (
                    <div className="h-[400px] flex items-center justify-center text-gray-500">
                        No hay datos de usuarios
                    </div>
                )}
            </div>

            {/* Detailed User Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Tabla Detallada de Rendimiento
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Posición
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Sucursal
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Esta Semana
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Este Mes
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Promedio/Mes
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {userPerformance.map((user, index) => (
                                <tr key={user.userId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {index < 3 ? (
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                                        index === 1 ? 'bg-gray-300 text-gray-700' :
                                                            'bg-orange-400 text-orange-900'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                            ) : (
                                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                    #{index + 1}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.nombre} {user.apellido}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900 dark:text-white">
                                                {user.sucursal}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            {user.total}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                            {user.thisWeek}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                            {user.thisMonth}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {user.total > 0 ? (user.total / Math.max(1, Math.ceil(user.total / 30))).toFixed(1) : '0'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
