// src/components/layout/Footer.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    UtensilsCrossed, 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Instagram, 
    Twitter, 
    ArrowUp,
    Clock,
    Award,
    Users
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Monitor scroll position
    useState(() => {
        const handleScroll = () => {
            setIsScrollToTopVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Meal Plans', path: '/menu' },
        { name: 'Subscription', path: '/subscription' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const features = [
        { icon: Clock, text: 'Fresh Daily Delivery' },
        { icon: Award, text: 'Premium Quality' },
        { icon: Users, text: '10K+ Happy Customers' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-300 rounded-full blur-2xl animate-bounce delay-500"></div>
            </div>

            <div className="container mx-auto px-6 py-12 pt-20 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <UtensilsCrossed className="h-10 w-10 text-green-400 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
                                    SEA Catering
                                </h3>
                                <p className="text-green-400/80 text-sm font-medium">Delicious & Fresh</p>
                            </div>
                        </div>
                        
                        <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                            Experience the finest culinary journey with our premium catering services. 
                            Fresh ingredients, exceptional taste, delivered right to your doorstep.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                                >
                                    <feature.icon className="h-4 w-4 text-green-400" />
                                    <span className="text-sm text-gray-300">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            {[
                                { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-400' },
                                { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
                                { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    aria-label={social.label}
                                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20 border border-white/10`}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white relative">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                        </h4>
                        <nav className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block text-gray-300 hover:text-green-400 transition-all duration-300 transform hover:translate-x-2 relative group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    <div className="absolute inset-0 bg-green-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 -z-10"></div>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white relative">
                            Get in Touch
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 group">
                                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-400/30 transition-colors">
                                    <Phone className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="text-white font-medium">08123456789</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3 group">
                                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-400/30 transition-colors">
                                    <Mail className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="text-white font-medium">hello@seacatering.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 group">
                                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-400/30 transition-colors">
                                    <MapPin className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Location</p>
                                    <p className="text-white font-medium">Jakarta, Indonesia</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-lg border border-green-400/20">
                                <p className="text-sm text-gray-300">
                                    <strong className="text-green-400">Manager:</strong> Brian
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Available 24/7 for support</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700/50 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <p>&copy; {currentYear} SEA Catering. All Rights Reserved.</p>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
                    isScrollToTopVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                } hover:scale-110`}
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-5 w-5 mx-auto" />
            </button>

            {/* CSS Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;