import Sidebar from '@/components/layout/Sidebar'
import Link from 'next/link'
import { FileText, Car, TrendingUp, Plus, Clock, CheckCircle2 } from 'lucide-react'

import { getAppraisals } from '@/lib/actions/appraisal-actions'

export default async function DashboardPage() {
    // Fetch real data from Supabase
    const result = await getAppraisals()
    const appraisals = result.data || []

    const stats = {
        totalAppraisals: appraisals.length,
        pendingAppraisals: appraisals.filter((a: any) => a.status === 'draft' || a.status === 'pending').length,
        completedAppraisals: appraisals.filter((a: any) => a.status === 'completed').length,
    }

    const recentAppraisals = appraisals.slice(0, 5) // Show 5 most recent

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome to MrCar! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Professional vehicle appraisal platform
                    </p>
                </div>
                <Link
                    href="/dashboard/appraisals/new"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    New Appraisal
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Appraisals"
                    value={stats.totalAppraisals}
                    icon={FileText}
                    color="blue"
                    trend="+12%"
                />
                <StatCard
                    title="Pending"
                    value={stats.pendingAppraisals}
                    icon={Clock}
                    color="yellow"
                    trend="+5%"
                />
                <StatCard
                    title="Completed"
                    value={stats.completedAppraisals}
                    icon={CheckCircle2}
                    color="green"
                    trend="+18%"
                />
            </div>

            {/* Recent Appraisals */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Recent Appraisals
                    </h2>
                    <Link
                        href="/dashboard/appraisals"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                    >
                        View all
                    </Link>
                </div>

                {recentAppraisals.length === 0 ? (
                    <div className="text-center py-12">
                        <Car className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No appraisals yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Get started by creating your first vehicle appraisal
                        </p>
                        <Link
                            href="/dashboard/appraisals/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Create First Appraisal
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentAppraisals.map((appraisal: any) => (
                            <Link
                                key={appraisal.id}
                                href={`/dashboard/appraisals/${appraisal.id}`}
                                className="block p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {appraisal.client_nombre} {appraisal.client_apellido}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {appraisal.vehicle_marca} {appraisal.vehicle_modelo} {appraisal.vehicle_ano}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${appraisal.status === 'completed'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                            }`}>
                                            {appraisal.status || 'draft'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuickActionCard
                    title="New Appraisal"
                    description="Start a new vehicle evaluation"
                    icon={Car}
                    href="/dashboard/appraisals/new"
                    color="blue"
                />
                <QuickActionCard
                    title="View All Appraisals"
                    description="Browse and manage appraisals"
                    icon={FileText}
                    href="/dashboard/appraisals"
                    color="green"
                />
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    icon: Icon,
    color,
    trend
}: {
    title: string
    value: number
    icon: any
    color: 'blue' | 'yellow' | 'green'
    trend: string
}) {
    const colorClasses = {
        blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
        green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {trend}
                </span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {value}
            </p>
        </div>
    )
}

function QuickActionCard({
    title,
    description,
    icon: Icon,
    href,
    color,
}: {
    title: string
    description: string
    icon: any
    href: string
    color: 'blue' | 'green'
}) {
    const colorClasses = {
        blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/20',
        green: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-500/20',
    }

    return (
        <Link
            href={href}
            className={`block p-6 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
        >
            <Icon className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
        </Link>
    )
}
