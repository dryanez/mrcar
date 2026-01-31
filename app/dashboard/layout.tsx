import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Sidebar />
            <main className="pl-0 lg:pl-72 pt-20 lg:pt-0 transition-all duration-300">
                <div className="p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
