import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleCloseSidebar = () => {
        setSidebarOpen(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <Navbar onMenuClick={handleToggleSidebar} />

            {/* Main content area */}
            <div className="w-full flex gap-2">
                <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

                {/* Page content */}
                <main className="w-full p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
