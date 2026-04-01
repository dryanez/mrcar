import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-8 pb-24 lg:pb-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
