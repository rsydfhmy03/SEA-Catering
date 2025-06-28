import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { LayoutGrid, BarChart, Users, MessageSquare, UtensilsCrossed } from 'lucide-react';

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
    const user = useSelector(selectCurrentUser);

    const userLinks = [
        { name: 'My Subscriptions', path: '/dashboard', icon: LayoutGrid },
    ];

    const adminLinks = [
        { name: 'Analytics', path: '/admin/dashboard', icon: BarChart },
        { name: 'User Management', path: '/admin/users', icon: Users },
        { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    ];

    // Conditional menu based on role
    const menuItems = user?.role === 'admin' ? adminLinks : userLinks;

    const activeClass = 'bg-green-100 text-green-700 border-r-2 border-green-600';
    const defaultClass = 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 bg-white border-r border-gray-200
                transform transition-transform duration-300 ease-in-out lg:transform-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                flex flex-col
            `}>
                {/* Logo/Brand */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                            <UtensilsCrossed className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">SEA Catering</h2>
                            <p className="text-xs text-gray-500 capitalize">{user?.role} Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        {user?.role === 'admin' ? 'Administration' : 'My Account'}
                    </div>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end
                            onClick={() => onClose()} // Close mobile menu on navigation
                            className={({ isActive }) =>
                                `${isActive ? activeClass : defaultClass} 
                                group flex items-center px-3 py-2 text-sm font-medium rounded-lg 
                                transition-all duration-200 relative`
                            }
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                        © 2025 SEA Catering
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;