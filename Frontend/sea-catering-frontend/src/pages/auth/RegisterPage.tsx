import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/api/authApi';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, UtensilsCrossed, ArrowRight, LogIn, Check, X } from 'lucide-react';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasStartedTyping, setHasStartedTyping] = useState({
        fullName: false,
        email: false,
        password: false
    });
    const navigate = useNavigate();

    // Validation functions
    const validateFullName = (name: string) => {
        return {
            minLength: name.trim().length >= 2,
            maxLength: name.trim().length <= 100,
            notEmpty: name.trim().length > 0
        };
    };

    const validateEmail = (email : string ) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            format: emailRegex.test(email),
            notEmpty: email.length > 0
        };
    };

    const validatePassword = (password : string) => {
        return {
            minLength: password.length >= 8,
            hasLowercase: /[a-z]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[@$!%*?&#]/.test(password),
            notEmpty: password.length > 0
        };
    };

    // Get validation results
    const fullNameValidation = validateFullName(fullName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Calculate progress
    const getValidationProgress = (validation: Record<string, boolean>) => {
        const total = Object.keys(validation).length;
        const valid = Object.values(validation).filter(Boolean).length;
        return (valid / total) * 100;
    };

    const handleSubmit = async (e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register({ full_name: fullName, email, password });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            let errorMsg = 'Registration failed.';
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const err = error as { response?: { data?: { error?: { details?: { message?: string }[] } } } };
                errorMsg = err.response?.data?.error?.details?.[0]?.message || errorMsg;
            }
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = 
    Object.values(fullNameValidation).every(Boolean) &&
    Object.values(emailValidation).every(Boolean) &&
    Object.values(passwordValidation).every(Boolean);
    type ValidationProgressProps = {
        progress: number;
        validations: Record<string, boolean>;
        label: string;
        show: boolean;
    };

    const ValidationProgress = ({ progress, validations, label, show }: ValidationProgressProps) => {
        if (!show) return null;

        return (
            <div className="mt-3 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">{label} Requirements</span>
                    <span className="text-xs text-gray-500">{Math.round(progress)}% complete</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                    <div 
                        className={`h-2 rounded-full transition-all duration-500 ease-out ${
                            progress === 100 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        }`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Validation Checklist */}
                <div className="space-y-2">
                    {Object.entries(validations).map(([key, isValid]) => {
                        let requirement = '';
                        switch (key) {
                            case 'notEmpty':
                                requirement = 'Field is not empty';
                                break;
                            case 'minLength':
                                requirement = label === 'Full Name' ? 'At least 2 characters' : 'At least 8 characters';
                                break;
                            case 'maxLength':
                                requirement = 'Maximum 100 characters';
                                break;
                            case 'format':
                                requirement = 'Valid email format';
                                break;
                            case 'hasLowercase':
                                requirement = 'Contains lowercase letter';
                                break;
                            case 'hasUppercase':
                                requirement = 'Contains uppercase letter';
                                break;
                            case 'hasNumber':
                                requirement = 'Contains number';
                                break;
                            case 'hasSpecialChar':
                                requirement = 'Contains special character (@$!%*?&#)';
                                break;
                            default:
                                requirement = key;
                        }

                        return (
                            <div key={key} className="flex items-center gap-2">
                                <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isValid 
                                        ? 'bg-green-500 text-white scale-100' 
                                        : 'bg-gray-300 text-gray-500 scale-90'
                                }`}>
                                    {isValid ? (
                                        <Check className="h-3 w-3" />
                                    ) : (
                                        <X className="h-3 w-3" />
                                    )}
                                </div>
                                <span className={`text-xs transition-colors duration-300 ${
                                    isValid ? 'text-green-700 font-medium' : 'text-gray-600'
                                }`}>
                                    {requirement}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
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
                            Join SEA Catering
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Create your account to get started
                        </p>
                    </div>

                    {/* Register form */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-green-100/50 p-8 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name field */}
                            <div className="space-y-2">
                                <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-green-600 transition-colors duration-200" />
                                    </div>
                                    <input
                                        id="full_name"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                            if (!hasStartedTyping.fullName && e.target.value) {
                                                setHasStartedTyping(prev => ({ ...prev, fullName: true }));
                                            }
                                        }}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <ValidationProgress
                                    progress={getValidationProgress(fullNameValidation)}
                                    validations={fullNameValidation}
                                    label="Full Name"
                                    show={hasStartedTyping.fullName}
                                />
                            </div>

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
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (!hasStartedTyping.email && e.target.value) {
                                                setHasStartedTyping(prev => ({ ...prev, email: true }));
                                            }
                                        }}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <ValidationProgress
                                    progress={getValidationProgress(emailValidation)}
                                    validations={emailValidation}
                                    label="Email"
                                    show={hasStartedTyping.email}
                                />
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
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (!hasStartedTyping.password && e.target.value) {
                                                setHasStartedTyping(prev => ({ ...prev, password: true }));
                                            }
                                        }}
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
                                <ValidationProgress
                                    progress={getValidationProgress(passwordValidation)}
                                    validations={passwordValidation}
                                    label="Password"
                                    show={hasStartedTyping.password}
                                />
                            </div>

                            {/* Submit button */}
                            <button 
                                type="submit" 
                                disabled={isLoading || !isFormValid}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none group"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Register Now</span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        {/* Login link */}
                        <div className="text-center">
                            <Link 
                                to="/login" 
                                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-all duration-200 hover:underline decoration-2 underline-offset-4 group"
                            >
                                <LogIn className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                <span>Sign in to your account</span>
                            </Link>
                        </div>
                    </div>

                    {/* Footer text */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            By registering, you agree to our{' '}
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

export default RegisterPage;