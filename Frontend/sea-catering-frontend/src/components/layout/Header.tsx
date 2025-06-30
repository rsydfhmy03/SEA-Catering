import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Menu, X, LogIn, UserPlus, LogOut, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../services/api/authApi';
import toast from 'react-hot-toast';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Meal Plans', path: '/menu' },
    { name: 'Subscription', path: '/subscription' },
    { name: 'Contact Us', path: '/contact' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus when clicking outside
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

    const activeLinkClass = 'text-green-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:rounded-full after:animate-pulse';
    const defaultLinkClass = 'text-gray-700 hover:text-green-600 transition-all duration-300 relative group after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-green-600 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:after:left-0';

    const AuthButtons = () => (
        <>
            {user ? (
                <div className="relative user-menu-container">
                    {/* Desktop User Menu */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 px-4 py-2 rounded-full transition-all duration-300 border border-green-200/50 shadow-sm hover:shadow-md group"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-inner">
                                {user.full_name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-700 font-medium max-w-24 truncate">
                                Hi, {user.full_name.split(' ')[0]}!
                            </span>
                            
                            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Desktop Dropdown Menu */}
                        <div className={`absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-green-100/50 py-2 transition-all duration-200 origin-top-right ${
                            isUserMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        }`}>
                            <div className="px-4 py-3 border-b border-green-100/50">
                                <p className="text-sm font-semibold text-gray-900">{user.full_name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            {user.role === 'admin' && (
                                <Link
                                    to="/admin/dashboard"
                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <span className="font-medium">Dashboard</span>
                                </Link>
                            )}
                            { user.role === 'user' && (
                            <Link
                                to="/dashboard"
                                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-2"
                            >
                                <span className="font-medium">Dashboard</span>
                            </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile User Info */}
                    <div className="md:hidden flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {user.full_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-700 font-medium text-sm max-w-20 truncate">
                            {user.full_name.split(' ')[0]}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-3">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        <LogIn className="h-4 w-4" />
                        <span className="hidden sm:block">Login</span>
                    </Link>
                    <Link
                        to="/register"
                        className="flex items-center justify-center gap-2 text-sm font-semibold bg-white hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-full border-2 border-gray-200 hover:border-green-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden sm:block">Register</span>
                    </Link>
                </div>
            )}
        </>
    );

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-green-100/50' 
                    : 'bg-white/95 backdrop-blur-md shadow-lg'
            }`}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/40 via-emerald-50/30 to-green-50/40 animate-gradient-x"></div>
            
            <nav className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center relative">
                {/* Logo */}
                <NavLink 
                    to="/" 
                    className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300 z-10"
                >
                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <UtensilsCrossed className="h-9 w-9 text-green-600 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-800 bg-clip-text text-transparent">
                            SEA Catering
                        </span>
                        <span className="text-xs text-green-600/70 font-medium -mt-1 hidden sm:block">
                            Delicious & Fresh
                        </span>
                    </div>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-green-100/50 shadow-sm">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `${isActive ? activeLinkClass : defaultLinkClass} py-2 px-3 font-medium transition-all duration-300 rounded-lg hover:bg-green-50/50`
                            }
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <span className="relative z-10">{link.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Auth Buttons & Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Auth Buttons */}
                    <AuthButtons />

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl bg-white/80 hover:bg-green-50 transition-all duration-300 relative group shadow-sm border border-green-100/50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                            {isMenuOpen ? 
                                <X className="h-5 w-5 text-gray-700 relative z-10 rotate-0 group-hover:rotate-90 transition-transform duration-300" /> : 
                                <Menu className="h-5 w-5 text-gray-700 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                            }
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
                isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-4 pb-6 bg-gradient-to-b from-white/95 to-green-50/80 backdrop-blur-md border-t border-green-100/50">
                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-2 pt-4">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${isActive ? 'text-green-600 font-semibold bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500' : 'text-gray-700 hover:text-green-600 hover:bg-green-50/50 border-l-4 border-transparent hover:border-green-300'} py-3 px-4 rounded-r-lg transition-all duration-300 transform hover:translate-x-1`
                                }
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    animation: isMenuOpen ? `slideInLeft 0.4s ease-out ${index * 50}ms both` : 'none'
                                }}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile User Actions */}
                    {user && (
                        <div className="mt-6 pt-4 border-t border-green-100/50">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 text-red-700 hover:text-red-800 bg-red-50/50 hover:bg-red-100/70 px-4 py-3 rounded-lg transition-all duration-200"
                            >
                                <LogOut className="h-5 w-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes gradient-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 8s ease infinite;
                }
            `}</style>
        </header>
    );
};

export default Header;