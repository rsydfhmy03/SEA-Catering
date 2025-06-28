import { useState, useEffect } from 'react';
import { getMealPlans, type MealPlan } from '../../services/api/mealPlansApi';
import MealPlanCard from '../../components/cards/MealPlanCard';
import Modal from '../../components/ui/Modal';
import { UtensilsCrossed, Sparkles, Clock, Users } from 'lucide-react';

const MenuPage = () => {
    const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoading(true);
                const plans = await getMealPlans();
                setMealPlans(plans);
                setError(null);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Oops! Failed to load our meal plans. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleOpenModal = (plan: MealPlan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
                {/* Compensate for fixed header */}
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center justify-center py-20">
                            {/* Loading Animation */}
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
                                <UtensilsCrossed className="absolute inset-0 m-auto w-6 h-6 text-green-600 animate-pulse" />
                            </div>
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading our delicious plans...</h3>
                                <p className="text-gray-600">Preparing something amazing for you</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
                {/* Compensate for fixed header */}
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <UtensilsCrossed className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="text-center max-w-md">
                                <h3 className="text-xl font-semibold text-red-800 mb-2">Something went wrong!</h3>
                                <p className="text-red-600 mb-6">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50">
            {/* Compensate for fixed header height */}
            <div className="pt-24">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 py-16 relative">
                        <div className="text-center max-w-4xl mx-auto">
                            {/* Floating Icons */}
                            <div className="relative mb-8">
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s' }}>
                                    <Sparkles className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="absolute -top-2 -right-6 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                                    <Clock className="w-3 h-3 text-emerald-600" />
                                </div>
                                <div className="absolute -bottom-2 left-8 w-7 h-7 bg-green-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                                    <Users className="w-4 h-4 text-green-600" />
                                </div>
                                
                                <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-800 bg-clip-text text-transparent mb-6 leading-tight">
                                    Our Meal Plans
                                </h1>
                            </div>
                            
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Discover the perfect plan that fits your lifestyle and goals. 
                                <span className="text-green-600 font-semibold"> Fresh, delicious, and crafted with love.</span>
                            </p>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <UtensilsCrossed className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1">Fresh Daily</h3>
                                    <p className="text-sm text-gray-600">Prepared fresh every morning</p>
                                </div>
                                
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1">On Time</h3>
                                    <p className="text-sm text-gray-600">Delivered right on schedule</p>
                                </div>
                                
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1">For Everyone</h3>
                                    <p className="text-sm text-gray-600">Plans for every lifestyle</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meal Plans Grid */}
                <div className="container mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mealPlans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className="transform transition-all duration-300 hover:scale-105"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'slideInUp 0.6s ease-out both'
                                }}
                            >
                                <MealPlanCard plan={plan} onSeeDetails={handleOpenModal} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPlan?.name}>
                {selectedPlan && (
                    <div className="space-y-6">
                        {/* Image with overlay gradient */}
                        <div className="relative overflow-hidden rounded-xl">
                            <img 
                                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" 
                                src={selectedPlan.image_url} 
                                alt={selectedPlan.name} 
                                onError={(e) => { 
                                    e.currentTarget.src = `https://placehold.co/600x400/e0f2f1/105D4B?text=${selectedPlan.name}` 
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed text-lg">{selectedPlan.description}</p>
                            
                            {/* Price Card */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Price per meal</p>
                                        <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            {new Intl.NumberFormat('id-ID', { 
                                                style: 'currency', 
                                                currency: 'IDR', 
                                                minimumFractionDigits: 0 
                                            }).format(parseFloat(selectedPlan.price))}
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                        <UtensilsCrossed className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <style>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default MenuPage;