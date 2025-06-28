import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../../components/layout/DashboardHeader';
import DashboardSidebar from '../../components/layout/DashboardSidebar';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <DashboardSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader 
                    onToggleSidebar={toggleSidebar} 
                    isSidebarOpen={isSidebarOpen} 
                />

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;