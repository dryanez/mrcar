'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    Car,
    Settings,
    Menu,
    X,
    ChevronLeft
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Appraisals', href: '/dashboard/appraisals', icon: FileText },
    { name: 'New Appraisal', href: '/dashboard/appraisals/new', icon: Car },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300
          lg:static lg:z-auto
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                        {!collapsed && (
                            <Link href="/dashboard" className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/30">
                                    <Image
                                        src="/mrcar-logo.png"
                                        alt="MrCar Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="font-bold text-xl text-gray-900 dark:text-white">MrCar</span>
                            </Link>
                        )}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                                    title={collapsed ? item.name : ''}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {!collapsed && <span className="font-medium">{item.name}</span>}
                                    {!collapsed && isActive && (
                                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}
