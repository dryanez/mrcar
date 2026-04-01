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
    ChevronLeft,
    Shield
} from 'lucide-react'

const navigation = [
    { name: 'Panel', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasaciones', href: '/dashboard/appraisals', icon: FileText },
    { name: 'Nueva', href: '/dashboard/appraisals/new', icon: Car },
    { name: 'Admin', href: '/admin/dashboard', icon: Shield, admin: true },
    { name: 'Config', href: '/dashboard/settings', icon: Settings },
]

// Mobile bottom tabs — show the most important items
const mobileNavigation = [
    { name: 'Panel', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasaciones', href: '/dashboard/appraisals', icon: FileText },
    { name: 'Nueva', href: '/dashboard/appraisals/new', icon: Car, primary: true },
    { name: 'Admin', href: '/admin/dashboard', icon: Shield },
    { name: 'Config', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <>
            {/* ═══ MOBILE BOTTOM TAB BAR ═══ */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
                <div className="flex items-stretch justify-around h-16">
                    {mobileNavigation.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href))

                        if (item.primary) {
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex flex-col items-center justify-center -mt-4"
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                                        isActive
                                            ? 'bg-blue-600 shadow-blue-500/40'
                                            : 'bg-blue-500 shadow-blue-500/30'
                                    }`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                                        {item.name}
                                    </span>
                                </Link>
                            )
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors ${
                                    isActive
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-400 dark:text-gray-500'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-[10px] font-medium">{item.name}</span>
                                {isActive && (
                                    <div className="absolute top-0 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                )}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* ═══ DESKTOP SIDEBAR ═══ */}
            <aside
                className={`
                    hidden lg:flex fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300
                    lg:static lg:z-auto
                    ${collapsed ? 'w-20' : 'w-64'}
                `}
            >
                <div className="flex flex-col h-full w-full">
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
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon
                            const isAdmin = item.admin

                            return (
                                <div key={item.name}>
                                    {isAdmin && (
                                        <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                                    )}
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                            ${isActive
                                                ? isAdmin
                                                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shadow-sm'
                                                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                                                : isAdmin
                                                    ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }
                                            ${collapsed ? 'justify-center' : ''}
                                        `}
                                        title={collapsed ? item.name : ''}
                                    >
                                        <Icon className={`w-5 h-5 flex-shrink-0 ${isAdmin && !isActive ? 'animate-pulse' : ''}`} />
                                        {!collapsed && <span className="font-medium">{item.name}</span>}
                                        {!collapsed && isActive && (
                                            <div className={`ml-auto w-2 h-2 rounded-full ${isAdmin ? 'bg-purple-600' : 'bg-blue-600'}`} />
                                        )}
                                    </Link>
                                </div>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}
