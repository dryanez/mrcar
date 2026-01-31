import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'

export default function AppraisalsPage() {
    const appraisals = [] // Will be populated from Supabase

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Appraisals
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage all vehicle appraisals
                    </p>
                </div>
                <Link
                    href="/dashboard/appraisals/new"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Appraisal
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by client name, patente, or vehicle..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                        <Filter className="w-5 h-5" />
                        Filter
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
                            No appraisals found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Create your first appraisal to get started
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
                        {/* Appraisal items will be rendered here */}
                    </div>
                )}
            </div>
        </div>
    )
}
