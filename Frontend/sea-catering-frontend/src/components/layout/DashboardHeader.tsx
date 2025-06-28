import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, Menu, X, Home } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../services/api/authApi';
import toast from 'react-hot-toast';

interface DashboardHeaderProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const DashboardHeader = ({ onToggleSidebar, isSidebarOpen }: DashboardHeaderProps) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Close user menu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Element | null;
            if (!target?.closest('.user-menu-container')) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout API call failed, logging out locally.", error);
        } finally {
            dispatch(logout());
            toast.success('You have been logged out.');
            navigate('/');
            setIsUserMenuOpen(false);
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
            {/* Left Side - Mobile Menu & Breadcrumb */}
            <div className="flex items-center space-x-4">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {isSidebarOpen ? (
                        <X className="h-5 w-5 text-gray-600" />
                    ) : (
                        <Menu className="h-5 w-5 text-gray-600" />
                    )}
                </button>

                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm">
                    <Link 
                        to="/" 
                        className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 transition-colors"
                    >
                        <Home className="h-4 w-4" />
                        <span className="hidden sm:block">Home</span>
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-medium">
                        {user?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </span>
                </div>
            </div>

            {/* Right Side - User Menu */}
            <div className="relative user-menu-container">
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200 border border-gray-200"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-gray-900 max-w-32 truncate">
                            {user?.full_name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                            {user?.role}
                        </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 transition-all duration-200 origin-top-right ${
                    isUserMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        <p className="text-xs text-green-600 capitalize font-medium mt-1">{user?.role}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;