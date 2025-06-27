import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { LayoutGrid, BarChart, User } from 'lucide-react';

const DashboardLayout = () => {
    const user = useSelector(selectCurrentUser);

    const commonLinks = [
        { name: 'My Subscriptions', path: '/dashboard', icon: LayoutGrid },
    ];
    const adminLinks = [
        { name: 'Metrics', path: '/admin/dashboard', icon: BarChart },
        { name: 'User Management', path: '/admin/users', icon: User },
    ];

    const linksToRender = user?.role === 'admin' ? [...commonLinks, ...adminLinks] : commonLinks;
    const activeClass = 'bg-green-100 text-green-700';
    const defaultClass = 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

    return (
        <div className="flex min-h-[calc(100vh-68px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col">
                <div className="p-4">
                    <h2 className="text-lg font-bold">Dashboard</h2>
                </div>
                <nav className="flex-1 px-2 space-y-1">
                    {linksToRender.map((link) => (
                        <NavLink key={link.name} to={link.path} end className={({isActive}) => `${isActive ? activeClass : defaultClass} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
                            <link.icon className="mr-3 h-6 w-6" />
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;