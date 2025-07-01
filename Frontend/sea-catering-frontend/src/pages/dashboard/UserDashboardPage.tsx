/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { getUserSubscriptions, getUserPausedSubscriptions } from '../../store/slices/subscriptionsSlice';
import { cancelSubscription, pauseSubscription, type Subscription } from '../../services/api/subscriptionsApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock, Users, MapPin, Pause, X, Plus } from 'lucide-react';

const SubscriptionCard = ({ sub, onRefetch, index }: { sub: Subscription, onRefetch: () => void, index: number }) => {
    const [isPauseModalOpen, setPauseModalOpen] = useState(false);
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [pauseDates, setPauseDates] = useState<[Date | null, Date | null]>([null, null]);

    const handlePause = async () => {
        if (!pauseDates[0] || !pauseDates[1]) {
            toast.error("Please select a date range.");
            return;
        }
        
        try {
            await pauseSubscription(sub.id, {
                pause_start_date: format(pauseDates[0], 'yyyy-MM-dd'),
                pause_end_date: format(pauseDates[1], 'yyyy-MM-dd'),
            });
            toast.success("Subscription paused successfully.");
            setPauseModalOpen(false);
            onRefetch();
        } catch (error: any) {
            toast.error(error.message || "Failed to pause subscription.");
        }
    };

    const handleCancel = async () => {
        try {
            await cancelSubscription(sub.id);
            toast.success("Subscription cancelled.");
            setCancelModalOpen(false);
            onRefetch();
        } catch (error: any) {
            toast.error(error.message || "Failed to cancel subscription.");
        }
    };
    
    return (
        <div 
            className="group flex-col h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2 overflow-hidden"
            style={{
                animationDelay: `${index * 100}ms`,
                animation: `fadeInUp 0.6s ease-out forwards`
            }}
        >
            {/* Status Bar */}
            <div className={`h-1 w-full ${
                sub.status === 'active' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                sub.status === 'paused' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                'bg-gradient-to-r from-red-400 to-pink-500'
            }`} />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                            {sub.plan_name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                sub.status === 'active' ? 'bg-green-100 text-green-700' : 
                                sub.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 
                                'bg-red-100 text-red-700'
                            }`}>
                                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Rp {parseFloat(sub.total_price).toLocaleString()},00
                        </div>
                    </div>
                </div>

                {/* Date Information */}
                <div className="space-y-3 mb-6">
                    {sub.start_date && sub.end_date && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-green-500" />
                            <span className="text-sm">
                                {format(new Date(sub.start_date), 'dd MMM yyyy')} - {format(new Date(sub.end_date), 'dd MMM yyyy')}
                            </span>
                        </div>
                    )}
                    
                    {sub.status === 'paused' && sub.pause_start_date && sub.pause_end_date && (
                        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                Paused: {format(new Date(sub.pause_start_date), 'dd MMM')} - {format(new Date(sub.pause_end_date), 'dd MMM')}
                            </span>
                        </div>
                    )}
                </div>

                {/* Meal Types */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <h4 className="font-semibold text-sm text-gray-700">Meal Types</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sub.meal_types.map((type, idx) => (
                            <span 
                                key={type} 
                                className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium hover:from-green-200 hover:to-emerald-200 transition-all duration-300 transform hover:scale-105"
                                style={{
                                    animationDelay: `${(index * 100) + (idx * 50)}ms`,
                                    animation: `slideInRight 0.5s ease-out forwards`
                                }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
                
                {/* Delivery Days */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <h4 className="font-semibold text-sm text-gray-700">Delivery Days</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sub.delivery_days.map((day, idx) => (
                            <span 
                                key={day} 
                                className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 transform hover:scale-105"
                                style={{
                                    animationDelay: `${(index * 100) + (idx * 50) + 200}ms`,
                                    animation: `slideInRight 0.5s ease-out forwards`
                                }}
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3">
                {sub.status === 'active' && (
                    <button 
                        onClick={() => setPauseModalOpen(true)} 
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        <Pause className="w-4 h-4" />
                        Pause
                    </button>
                )}
                <button 
                    onClick={() => setCancelModalOpen(true)} 
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </button>
            </div>

            {/* Pause Modal */}
            {isPauseModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
                    <div className="bg-white p-3 rounded-2xl w-[92%] max-w-md mx-4 shadow-2xl animate-scaleIn">
                        <h4 className="font-bold text-lg mb-1 text-gray-800">Paused Subscription</h4>
                        <p className="mb-3 text-gray-600 text-sm">Select the date range to pause your subscription.</p>
                        <div className="mb-4 flex justify-center">
                        <ReactDatePicker 
                            selectsRange
                            startDate={pauseDates[0]}
                            endDate={pauseDates[1]}
                            onChange={(update) => setPauseDates(update)}
                            minDate={new Date()}
                            inline
                            className="!w-full max-w-[280px] mb-4 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        </div>
                        <div className="flex justify-end gap-4 mt-2">
                            <button 
                                onClick={() => setPauseModalOpen(false)}
                                className="px-9 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handlePause}
                                className="px-9 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                                disabled={!pauseDates[0] || !pauseDates[1]}
                            >
                                Confirm Pause
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Cancel Modal */}
            {isCancelModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-md mx-4 shadow-2xl animate-scaleIn">
                        <h4 className="font-bold text-2xl mb-4 text-gray-800">Confirm Cancellation</h4>
                        <p className="mb-6 text-gray-600">Are you sure you want to cancel this subscription? This action cannot be undone.</p>
                        
                        <div className="flex justify-end gap-3 mt-6">
                            <button 
                                onClick={() => setCancelModalOpen(false)}
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                Keep Subscription
                            </button>
                            <button 
                                onClick={handleCancel}
                                className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UserDashboardPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { activeItems, pausedItems, status } = useSelector((state: RootState) => state.subscriptions);
    const [activeTab, setActiveTab] = useState<'active' | 'paused'>('active');

    const fetchSubs = () => {
        dispatch(getUserSubscriptions());
        dispatch(getUserPausedSubscriptions());
    };
    
    useEffect(() => {
        fetchSubs();
    }, [dispatch]);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl py-4 font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        My Subscriptions
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your meal subscription plans</p>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                        <button
                            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
                                activeTab === 'active' 
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg transform scale-105' 
                                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                            }`}
                            onClick={() => setActiveTab('active')}
                        >
                            Active ({activeItems.length})
                        </button>
                        <button
                            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 ${
                                activeTab === 'paused' 
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg transform scale-105' 
                                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                            }`}
                            onClick={() => setActiveTab('paused')}
                        >
                            Paused ({pausedItems.length})
                        </button>
                    </div>
                </div>
                
                {status === 'loading' && (
                    <div className="flex justify-center py-16">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                            <div className="animate-ping absolute top-2 left-2 rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-300"></div>
                        </div>
                    </div>
                )}
                
                {status === 'succeeded' && (
                    <>
                        {activeTab === 'active' && (
                            <>
                                {activeItems.length === 0 ? (
                                    <div className="max-w-2xl mx-auto">
                                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100 animate-fadeInUp">
                                            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Plus className="w-12 h-12 text-green-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Active Subscriptions</h3>
                                            <p className="text-gray-600 mb-8 text-lg">Start your healthy meal journey today!</p>
                                            <button 
                                                onClick={() => navigate('/subscription')}
                                                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
                                            >
                                                Subscribe Now
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {activeItems.map((sub, index) => (
                                            <SubscriptionCard key={sub.id} sub={sub} onRefetch={fetchSubs} index={index} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                        
                        {activeTab === 'paused' && (
                            <>
                                {pausedItems.length === 0 ? (
                                    <div className="max-w-2xl mx-auto">
                                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100 animate-fadeInUp">
                                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Pause className="w-12 h-12 text-yellow-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Paused Subscriptions</h3>
                                            <p className="text-gray-600 text-lg">All your subscriptions are currently active.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {pausedItems.map((sub, index) => (
                                            <SubscriptionCard key={sub.id} sub={sub} onRefetch={fetchSubs} index={index} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                
                {status === 'failed' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-red-200 animate-fadeInUp">
                            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <X className="w-12 h-12 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Failed to Load Subscriptions</h3>
                            <p className="text-gray-600 mb-8 text-lg">Something went wrong. Please try again.</p>
                            <button 
                                onClick={fetchSubs}
                                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UserDashboardPage;