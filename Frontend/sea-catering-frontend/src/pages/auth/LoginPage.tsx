import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/api/authApi';
import { setCredentials } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, Eye, EyeOff, UtensilsCrossed } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await login({ email, password });
            dispatch(setCredentials(data));
            toast.success('Login successful!');
            navigate('/dashboard'); 
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const errorResponse = error as { response?: { data?: { message?: string } } };
                toast.error(errorResponse.response?.data?.message || 'Login failed. Please try again.');
            } else {
                toast.error('Invalid credentials.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-emerald-300/20 to-green-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-200/10 to-emerald-200/10 rounded-full blur-2xl animate-bounce"></div>
            </div>

            {/* Main content with proper navbar spacing */}
            <div className="relative z-10 flex justify-center items-center min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Header with logo */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg border border-green-100/50">
                                    <UtensilsCrossed className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-800 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Sign in to your SEA Catering account
                        </p>
                    </div>

                    {/* Login form */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-green-100/50 p-8 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors duration-200" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors duration-200" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-600 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none group"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                        <span>Sign In</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-500 font-medium">
                                    New to SEA Catering?
                                </span>
                            </div>
                        </div>

                        {/* Register link */}
                        <div className="text-center">
                            <Link 
                                to="/register" 
                                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-all duration-200 hover:underline decoration-2 underline-offset-4 group"
                            >
                                <span>Create your account</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Footer text */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            By signing in, you agree to our{' '}
                            <Link to="/terms" className="text-green-600 hover:underline">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-green-600 hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;