import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/actions/auth-actions'
import Link from 'next/link'
import { LogOut, Users, LayoutDashboard, BarChart3 } from 'lucide-react'
import { logout } from '@/lib/actions/auth-actions'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/admin/login')
    }

    if (user.role !== 'admin') {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Top Navigation */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                MrCar Admin
                            </h1>
                            <div className="hidden md:flex gap-4">
                                <Link
                                    href="/admin/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <Users className="w-4 h-4" />
                                    Usuarios
                                </Link>
                                <Link
                                    href="/admin/analytics"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Analíticas
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {user.nombre} {user.apellido}
                            </span>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Salir
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}
