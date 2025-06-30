import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getAllTestimonials } from '../../store/slices/testimonialManagementSlice';
import { TestimonialsTable } from '../../components/tables/TestimonialsTable';
import { MessageSquare, Star, CheckCircle, Clock, Search } from 'lucide-react';

const TestimonialManagementPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { testimonials, status } = useSelector((state: RootState) => state.testimonialManagement);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllTestimonials());
        }
    }, [status, dispatch]);

    const totalTestimonials = testimonials.length;
    const approvedCount = testimonials.filter(testimonial => testimonial.status === 'approved').length;
    const pendingCount = testimonials.filter(testimonial => testimonial.status === 'pending').length;
    
    // Calculate average rating
    const averageRating = testimonials.length > 0 
        ? (testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length).toFixed(1)
        : '0.0';

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                    Testimonial Management
                                </h1>
                                <p className="text-gray-600 mt-2">Review and manage customer testimonials</p>
                            </div>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search testimonials..."
                                className="pl-10 pr-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                            />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Total Reviews</p>
                                    <p className="text-3xl font-bold">{totalTestimonials}</p>
                                </div>
                                <MessageSquare className="w-10 h-10 text-green-200" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">Approved</p>
                                    <p className="text-3xl font-bold">{approvedCount}</p>
                                </div>
                                <CheckCircle className="w-10 h-10 text-emerald-200" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-teal-100 text-sm font-medium">Pending Review</p>
                                    <p className="text-3xl font-bold">{pendingCount}</p>
                                </div>
                                <Clock className="w-10 h-10 text-teal-200" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-amber-100 text-sm font-medium">Average Rating</p>
                                    <p className="text-3xl font-bold">{averageRating}</p>
                                </div>
                                <Star className="w-10 h-10 text-amber-200 fill-current" />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Table Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                    {status === 'loading' && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin animation-delay-150"></div>
                                </div>
                                <p className="text-green-600 font-medium text-lg">Loading testimonials...</p>
                                <p className="text-gray-500 text-sm">Please wait while we fetch the reviews</p>
                            </div>
                        </div>
                    )}
                    
                    {status === 'succeeded' && <TestimonialsTable data={testimonials} />}
                    
                    {status === 'failed' && (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-red-500 text-2xl">⚠️</span>
                                </div>
                                <p className="text-red-600 font-medium text-lg">Failed to load testimonials</p>
                                <p className="text-gray-500 text-sm mt-2">Please try refreshing the page</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialManagementPage;