import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Meal Plans', path: '/menu' },
    { name: 'Subscription', path: '/subscription' },
    { name: 'Contact Us', path: '/contact' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeLinkClass = 'text-green-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:rounded-full';
    const defaultLinkClass = 'text-gray-700 hover:text-green-600 transition-all duration-300 relative group after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-green-600 after:rounded-full after:transition-all after:duration-300 hover:after:w-full hover:after:left-0';

    return (
        <header 
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-green-100/50' 
                    : 'bg-white/95 backdrop-blur-sm shadow-md'
            }`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-emerald-50/30"></div>
            
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
                <NavLink 
                    to="/" 
                    className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300"
                >
                    <div className="relative">
                        <UtensilsCrossed className="h-8 w-8 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                        <div className="absolute -inset-1 bg-green-600/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-800 bg-clip-text text-transparent">
                        SEA Catering
                    </span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `${isActive ? activeLinkClass : defaultLinkClass} py-2 px-1 font-medium`
                            }
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <span className="relative z-10">{link.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-lg hover:bg-green-50 transition-colors duration-200 relative group"
                    >
                        <div className="absolute inset-0 bg-green-600/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                        {isMenuOpen ? 
                            <X className="h-6 w-6 text-gray-700 relative z-10 rotate-0 group-hover:rotate-90 transition-transform duration-200" /> : 
                            <Menu className="h-6 w-6 text-gray-700 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                        }
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-6 pb-4 bg-gradient-to-b from-green-50/50 to-white/50 backdrop-blur-sm border-t border-green-100/50">
                    <div className="flex flex-col space-y-1 pt-4">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${isActive ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-green-50/50'} py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-x-2`
                                }
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    animation: isMenuOpen ? `slideInLeft 0.3s ease-out ${index * 50}ms both` : 'none'
                                }}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                `}
            </style>
        </header>
    );
};

export default Header;