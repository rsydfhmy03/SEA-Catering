import { useState, useEffect, useMemo } from 'react';
import { getMealPlans, type MealPlan } from '../../services/api/mealPlansApi';
import { createSubscription, type SubscriptionData } from '../../services/api/subscriptionsApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Calendar, Utensils, Phone, Info, Wallet, CheckCircle, Star, Sparkles, Clock, Shield } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';

const mealTypeOptions = ["Breakfast", "Lunch", "Dinner"];
const deliveryDayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SubscriptionPage = () => {
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    const [formData, setFormData] = useState({
        plan_id: '',
        meal_types: [] as string[],
        delivery_days: [] as string[],
        allergies: '',
        phone_number: '',
    });

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const plans = await getMealPlans();
                setMealPlans(plans);
                if (plans.length > 0) {
                    setFormData(prev => ({ ...prev, plan_id: plans[0].id }));
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast.error("Could not load meal plans.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const totalPrice = useMemo(() => {
        const selectedPlan = mealPlans.find(p => p.id === formData.plan_id);
        if (!selectedPlan || formData.meal_types.length === 0 || formData.delivery_days.length === 0) return 0;
        return parseFloat(selectedPlan.price) * formData.meal_types.length * formData.delivery_days.length * 4.3;
    }, [formData, mealPlans]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'meal_types' | 'delivery_days') => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentValues = prev[field];
            const newValues = checked ? [...currentValues, value] : currentValues.filter(v => v !== value);
            return { ...prev, [field]: newValues };
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.plan_id || formData.meal_types.length === 0 || formData.delivery_days.length === 0 || !formData.phone_number) {
            toast.error("Please fill all required fields.");
            return;
        }
        setIsSubmitting(true);
        try {
            await createSubscription(formData as SubscriptionData);
            toast.success('Subscription successful! Welcome aboard.');
            navigate('/'); // Atau nanti ke /dashboard
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(error) {
            toast.error('Subscription failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
                                <Wallet className="absolute inset-0 m-auto w-6 h-6 text-green-600 animate-pulse" />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading subscription form...</h3>
                                <p className="text-gray-600">Preparing your personalized experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const steps = [
        { id: 1, title: "Choose Plan", icon: Wallet, color: "from-blue-400 to-blue-600" },
        { id: 2, title: "Customize", icon: Utensils, color: "from-green-400 to-green-600" },
        { id: 3, title: "Details", icon: Info, color: "from-purple-400 to-purple-600" },
        { id: 4, title: "Confirm", icon: CheckCircle, color: "from-emerald-400 to-emerald-600" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30">
            {/* Compensate for fixed header */}
            <div className="pt-24">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 py-16 relative">
                        <div className="text-center max-w-4xl mx-auto">
                            {/* Floating Icons */}
                            <div className="relative mb-8">
                                <div className="absolute -top-6 -left-8 w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '0s' }}>
                                    <Sparkles className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="absolute -top-4 -right-10 w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}>
                                    <Star className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="absolute -bottom-4 left-12 w-11 h-11 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                
                                <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-800 bg-clip-text text-transparent mb-6 leading-tight">
                                    Create Your Subscription
                                </h1>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100/50 shadow-sm max-w-2xl mx-auto mb-12">
                                <p className="text-xl text-gray-700 mb-2">
                                    Welcome back, <span className="font-bold text-green-600">{user?.full_name}!</span>
                                </p>
                                <p className="text-gray-600">Let's customize your perfect meal plan and start your healthy journey.</p>
                            </div>

                            {/* Progress Steps */}
                            <div className="flex justify-center items-center space-x-4 mb-7 overflow-x-auto pb-4 py-6">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = activeStep >= step.id;
                                    const isCurrent = activeStep === step.id;
                                    
                                    return (
                                        <div key={step.id} className="flex items-center">
                                            <div className={`relative flex flex-col items-center ${isCurrent ? 'scale-110' : ''} transition-all duration-300`}>
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                                                    isActive 
                                                        ? `bg-gradient-to-r ${step.color} text-white shadow-xl transform scale-110` 
                                                        : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                                                    isActive ? 'text-green-600' : 'text-gray-500'
                                                }`}>
                                                    {step.title}
                                                </span>
                                                {isCurrent && (
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-lg animate-pulse"></div>
                                                )}
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                                                    activeStep > step.id ? 'bg-green-400' : 'bg-gray-300'
                                                }`}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="container mx-auto px-6 pb-20">
                    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100/50 overflow-hidden">
                            
                            {/* Section 1: Choose Your Plan */}
                            <div className="p-8 border-b border-green-100/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Wallet className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Choose Your Plan</h2>
                                        <p className="text-gray-600">Select the meal plan that fits your lifestyle</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {mealPlans.map((plan) => (
                                        <label 
                                            key={plan.id} 
                                            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                                formData.plan_id === plan.id ? 'scale-105' : ''
                                            }`}
                                            onClick={() => setActiveStep(2)}
                                        >
                                            <input 
                                                type="radio" 
                                                name="plan_id" 
                                                value={plan.id} 
                                                checked={formData.plan_id === plan.id} 
                                                onChange={handleChange} 
                                                className="sr-only"
                                            />
                                            <div className={`relative p-10 rounded-2xl border-2 transition-all duration-300 ${
                                                formData.plan_id === plan.id 
                                                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl' 
                                                    : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-lg'
                                            }`}>
                                                {formData.plan_id === plan.id && (
                                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                                        <CheckCircle className="w-5 h-5 text-white" />
                                                    </div>
                                                )}
                                                
                                                <div className="text-center">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plan.description}</p>
                                                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                                                        formData.plan_id === plan.id
                                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(parseFloat(plan.price))}/meal
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Customize Meals & Schedule */}
                            <div className="p-8 border-b border-green-100/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Utensils className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Customize Your Experience</h2>
                                        <p className="text-gray-600">Choose your meal types and delivery schedule</p>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Meal Types */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Utensils className="w-5 h-5 text-green-600" />
                                            <h3 className="text-lg font-semibold text-gray-800">Meal Types</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {mealTypeOptions.map((type, ) => (
                                                <label 
                                                    key={type} 
                                                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                                        formData.meal_types.includes(type)
                                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md'
                                                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                    }`}
                                                    onClick={() => setActiveStep(3)}
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        value={type} 
                                                        checked={formData.meal_types.includes(type)} 
                                                        onChange={e => handleCheckboxChange(e, 'meal_types')} 
                                                        className="w-5 h-5 rounded text-green-600 focus:ring-green-500 focus:ring-2"
                                                    />
                                                    <span className="font-medium text-gray-700">{type}</span>
                                                    {formData.meal_types.includes(type) && (
                                                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Delivery Days */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                            <h3 className="text-lg font-semibold text-gray-800">Delivery Days</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {deliveryDayOptions.map((day) => (
                                                <label 
                                                    key={day} 
                                                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                                        formData.delivery_days.includes(day)
                                                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 shadow-md'
                                                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                    }`}
                                                    onClick={() => setActiveStep(3)}
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        value={day} 
                                                        checked={formData.delivery_days.includes(day)} 
                                                        onChange={e => handleCheckboxChange(e, 'delivery_days')} 
                                                        className="w-5 h-5 rounded text-green-600 focus:ring-green-500 focus:ring-2"
                                                    />
                                                    <span className="font-medium text-gray-700">{day}</span>
                                                    {formData.delivery_days.includes(day) && (
                                                        <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto" />
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Personal & Delivery Details */}
                            <div className="p-8 border-b border-green-100/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Info className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
                                        <p className="text-gray-600">Help us serve you better with these details</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone_number" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 text-green-600" />
                                            Phone Number
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="tel" 
                                            name="phone_number" 
                                            id="phone_number" 
                                            value={formData.phone_number} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="Enter your phone number"
                                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                                            onClick={() => setActiveStep(4)}
                                        />
                                        <p className="text-xs text-gray-500">We'll use this for delivery updates</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="allergies" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Allergies or Dietary Restrictions
                                            <span className="text-gray-400 font-normal"> (optional)</span>
                                        </label>
                                        <textarea 
                                            name="allergies" 
                                            id="allergies" 
                                            value={formData.allergies} 
                                            onChange={handleChange} 
                                            rows={4}
                                            placeholder="Tell us about any allergies or special dietary needs..."
                                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                                        />
                                        <p className="text-xs text-gray-500">This helps us customize your meals safely</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Summary & Submit */}
                            <div className="p-8 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Subscription Summary</h2>
                                        <p className="text-gray-600">Review your selections before confirming</p>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-8 items-start">
                                    {/* Summary Details */}
                                    <div className="space-y-4">
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 shadow-sm">
                                            <h4 className="font-semibold text-gray-800 mb-3">Your Selection:</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Meal Plan:</span>
                                                    <span className="font-medium">{mealPlans.find(p => p.id === formData.plan_id)?.name || 'None selected'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Meal Types:</span>
                                                    <span className="font-medium">{formData.meal_types.length || 0} selected</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Delivery Days:</span>
                                                    <span className="font-medium">{formData.delivery_days.length || 0} days/week</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-xl">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span>Estimated delivery: 7-9 AM on selected days</span>
                                        </div>
                                    </div>

                                    {/* Price & Submit */}
                                    <div className="lg:text-right space-y-6">
                                        <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl border border-green-200/50 shadow-lg">
                                            <p className="text-gray-600 mb-2">Monthly Total</p>
                                            <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice)}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-2">
                                                {formData.meal_types.length} meals × {formData.delivery_days.length} days × 4.3 weeks
                                            </p>
                                        </div>
                                        
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting || isLoading || !formData.plan_id || formData.meal_types.length === 0 || formData.delivery_days.length === 0 || !formData.phone_number} 
                                            className="w-full py-4 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Subscribing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <CheckCircle className="w-5 h-5" />
                                                    Subscribe Now
                                                </div>
                                            )}
                                        </button>
                                        
                                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                            <Shield className="w-4 h-4" />
                                            <span>Secure payment • Cancel anytime</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;