/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getDashboardMetrics } from '../../store/slices/adminSlice';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { 
    TrendingUp, 
    DollarSign, 
    UserPlus, 
    Users, 
    Calendar,
    Filter,
    Activity,
    RefreshCw
} from 'lucide-react';

const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    color = 'green',
    index 
}: { 
    title: string;
    value: string | number;
    icon: any;
    trend?: string;
    color?: 'green' | 'blue' | 'purple' | 'orange';
    index: number;
}) => {
    const colorClasses = {
        green: {
            bg: 'from-green-400 to-emerald-500',
            text: 'text-green-600',
            iconBg: 'bg-green-100',
            border: 'border-green-200'
        },
        blue: {
            bg: 'from-blue-400 to-cyan-500',
            text: 'text-blue-600',
            iconBg: 'bg-blue-100',
            border: 'border-blue-200'
        },
        purple: {
            bg: 'from-purple-400 to-pink-500',
            text: 'text-purple-600',
            iconBg: 'bg-purple-100',
            border: 'border-purple-200'
        },
        orange: {
            bg: 'from-orange-400 to-red-500',
            text: 'text-orange-600',
            iconBg: 'bg-orange-100',
            border: 'border-orange-200'
        }
    };

    const colors = colorClasses[color];

    return (
        <div 
            className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border ${colors.border} hover:border-opacity-50 hover:-translate-y-2 overflow-hidden`}
            style={{
                animationDelay: `${index * 150}ms`,
                animation: `fadeInUp 0.6s ease-out forwards`
            }}
        >
            {/* Gradient Top Bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${colors.bg}`} />
            
            <div className="p-6">
                {/* Header with Icon */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    {trend && (
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 font-semibold">{trend}</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h4 className="text-gray-600 text-sm font-medium mb-2 group-hover:text-gray-700 transition-colors">
                    {title}
                </h4>

                {/* Value */}
                <p className={`text-3xl font-bold ${colors.text} group-hover:scale-105 transition-transform duration-300`}>
                    {value}
                </p>
            </div>
        </div>
    );
};

const AdminDashboardPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { metrics, status } = useSelector((state: RootState) => state.admin);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [isFiltering, setIsFiltering] = useState(false);

    const fetchMetrics = async () => {
        setIsFiltering(true);
        const params = {
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
            endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
        };
        dispatch(getDashboardMetrics(params));
        setTimeout(() => setIsFiltering(false), 500); // Small delay for visual feedback
    };

    const clearFilters = () => {
        setDateRange([null, null]);
        dispatch(getDashboardMetrics({}));
    };

    useEffect(() => {
        fetchMetrics();
    }, [dispatch]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const statsData = metrics ? [
        {
            title: "New Subscriptions",
            value: metrics.newSubscriptions.toLocaleString(),
            icon: UserPlus,
            color: 'green' as const,
            trend: "+12%"
        },
        {
            title: "Monthly Recurring Revenue", 
            value: formatCurrency(metrics.mrr),
            icon: DollarSign,
            color: 'blue' as const,
            trend: "+8.5%"
        },
        {
            title: "Reactivations",
            value: metrics.reactivations.toLocaleString(),
            icon: RefreshCw,
            color: 'purple' as const,
            trend: "+15%"
        },
        {
            title: "Total Active Subscriptions",
            value: metrics.totalActiveSubscriptions.toLocaleString(),
            icon: Users,
            color: 'orange' as const,
            trend: "+6.2%"
        }
    ] : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="container mx-auto px-4 py-12">

                {/* Filter Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-slideInDown">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar className="w-5 h-5 text-green-500" />
                            <h3 className="text-lg font-semibold text-gray-800">Filter by Date Range</h3>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                                <ReactDatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => setDateRange(update)}
                                    isClearable={true}
                                    placeholderText="Select date range to filter metrics"
                                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-300"
                                    calendarClassName="shadow-2xl border-0 rounded-2xl"
                                />
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={fetchMetrics}
                                    disabled={isFiltering}
                                    className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:transform-none"
                                >
                                    {isFiltering ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    ) : (
                                        <Filter className="w-4 h-4" />
                                    )}
                                    {isFiltering ? 'Filtering...' : 'Apply Filter'}
                                </button>
                                
                                {(startDate || endDate) && (
                                    <button 
                                        onClick={clearFilters}
                                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Active Filter Indicator */}
                        {(startDate || endDate) && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center gap-2 text-green-700">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Active Filter: {startDate && format(startDate, 'MMM dd, yyyy')} 
                                        {startDate && endDate && ' - '}
                                        {endDate && format(endDate, 'MMM dd, yyyy')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
                        <div className="relative mb-6">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                            <div className="animate-ping absolute top-2 left-2 rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-300"></div>
                        </div>
                        <p className="text-gray-600 text-lg font-medium">Loading metrics...</p>
                        <p className="text-gray-500 text-sm">Please wait while we fetch the latest data</p>
                    </div>
                )}

                {/* Metrics Grid */}
                {status === 'succeeded' && metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {statsData.map((stat, index) => (
                            <StatCard
                                key={stat.title}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                trend={stat.trend}
                                color={stat.color}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {status === 'failed' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-red-200 animate-fadeInUp">
                            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Activity className="w-12 h-12 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Failed to Load Metrics</h3>
                            <p className="text-gray-600 mb-8 text-lg">Something went wrong while fetching the dashboard data.</p>
                            <button 
                                onClick={fetchMetrics}
                                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Quick Stats Summary */}
                {status === 'succeeded' && metrics && (
                    <div className="mt-16 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fadeInUp">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Performance Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="p-4">
                                    <div className="text-3xl font-bold text-green-600 mb-2">
                                        {((metrics.reactivations / (metrics.totalActiveSubscriptions || 1)) * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-gray-600">Reactivation Rate</div>
                                </div>
                                <div className="p-4">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        {formatCurrency(metrics.mrr / (metrics.totalActiveSubscriptions || 1))}
                                    </div>
                                    <div className="text-gray-600">ARPU (Average Revenue Per User)</div>
                                </div>
                                <div className="p-4">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                        {((metrics.newSubscriptions / (metrics.totalActiveSubscriptions || 1)) * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-gray-600">Growth Rate</div>
                                </div>
                            </div>
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

                @keyframes slideInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }

                .animate-slideInDown {
                    animation: slideInDown 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboardPage;