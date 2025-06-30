/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
    createColumnHelper, 
    flexRender, 
    getCoreRowModel, 
    useReactTable 
} from '@tanstack/react-table';
import type { Testimonial } from '../../services/api/testimonialsApi';
import { approveTestimonial } from '../../services/api/adminApi';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { approveTestimonialInState } from '../../store/slices/testimonialManagementSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { 
    Star, 
    CheckCircle, 
    Clock, 
    User, 
    MessageSquare, 
    ThumbsUp,
    Check,
    X
} from 'lucide-react';

const columnHelper = createColumnHelper<Testimonial>();

// Modal Konfirmasi Approval
const ApprovalModal = ({
    isOpen,
    onClose,
    onConfirm,
    testimonial,
    isLoading
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    testimonial: Testimonial;
    isLoading: boolean;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                        Approve Testimonial
                    </h3>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                        <div className="text-center mb-4">
                            <p className="text-gray-700 mb-2">
                                Are you sure you want to approve this testimonial from 
                                <span className="font-semibold text-green-700"> {testimonial.customer_name}</span>?
                            </p>
                            
                            {/* Rating Display */}
                            <div className="flex items-center justify-center space-x-1 mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                            </div>
                            
                            {/* Review Preview */}
                            <div className="bg-white rounded-lg p-3 border border-green-200">
                                <p className="text-sm text-gray-700 italic">
                                    "{testimonial.review_message.length > 100 
                                        ? testimonial.review_message.substring(0, 100) + '...' 
                                        : testimonial.review_message}"
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors disabled:opacity-50"
                        >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>
                        
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Check className="w-4 h-4" />
                            )}
                            <span>{isLoading ? 'Approving...' : 'Approve'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActionCell = ({ testimonial }: { testimonial: Testimonial }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isApproving, setIsApproving] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleApproveRequest = () => {
        setShowModal(true);
    };

    const handleConfirmApproval = async () => {
        setIsApproving(true);
        try {
            await approveTestimonial(testimonial.id);
            dispatch(approveTestimonialInState({ testimonialId: testimonial.id }));
            toast.success("Testimonial approved successfully!", {
                icon: '✅',
                style: {
                    borderRadius: '12px',
                    background: '#10B981',
                    color: '#fff',
                }
            });
        } catch (error) {
            toast.error("Failed to approve testimonial. Please try again.", {
                icon: '❌',
                style: {
                    borderRadius: '12px',
                    background: '#EF4444',
                    color: '#fff',
                }
            });
        } finally {
            setIsApproving(false);
            setShowModal(false);
        }
    };

    if (testimonial.status === 'approved') {
        return (
            <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-green-700 font-semibold text-sm">Approved</span>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={handleApproveRequest}
                disabled={isApproving}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
                <ThumbsUp className="w-4 h-4" />
                <span>Approve</span>
            </button>

            <ApprovalModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmApproval}
                testimonial={testimonial}
                isLoading={isApproving}
            />
        </>
    );
};

const columns = [
    columnHelper.accessor('customer_name', {
        header: 'Customer',
        cell: info => (
            <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-2 rounded-full">
                    <User className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="font-semibold text-gray-800">{info.getValue()}</div>
                    <div className="text-sm text-gray-500">Customer</div>
                </div>
            </div>
        ),
    }),
    columnHelper.accessor('review_message', {
        header: 'Review',
        cell: info => (
            <div className="flex items-start space-x-3 max-w-md">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-2 rounded-full flex-shrink-0 mt-1">
                    <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                        {info.getValue().length > 120 
                            ? info.getValue().substring(0, 120) + '...' 
                            : info.getValue()}
                    </p>
                    {info.getValue().length > 120 && (
                        <button className="text-green-600 text-xs font-medium hover:text-green-700 mt-1">
                            Read more
                        </button>
                    )}
                </div>
            </div>
        ),
    }),
    columnHelper.accessor('rating', {
        header: 'Rating',
        cell: info => (
            <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-full">
                    <Star className="w-5 h-5 text-white fill-current" />
                </div>
                <div>
                    <div className="flex items-center space-x-1">
                        {[...Array(info.getValue())].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        {[...Array(5 - info.getValue())].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">{info.getValue()}/5 stars</div>
                </div>
            </div>
        ),
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
            const status = info.getValue();
            return (
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                        status === 'approved' 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                            : 'bg-gradient-to-br from-amber-400 to-orange-500'
                    }`}>
                        {status === 'approved' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                            <Clock className="w-5 h-5 text-white" />
                        )}
                    </div>
                    <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            status === 'approved' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                            {status === 'approved' ? 'Live on website' : 'Awaiting review'}
                        </div>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => <ActionCell testimonial={info.row.original} />,
    }),
];

export const TestimonialsTable = ({ data }: { data: Testimonial[] }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                    <MessageSquare className="w-7 h-7" />
                    <span>Customer Testimonials</span>
                </h2>
                <p className="text-green-100 mt-2">Review and manage customer feedback</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gradient-to-r from-gray-50 to-green-50 border-b border-green-100">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-6 py-4 text-left">
                                        <div className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr 
                                key={row.id} 
                                className={`border-b border-gray-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                }`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-6">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.length === 0 && (
                <div className="text-center py-16">
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No testimonials found</p>
                    <p className="text-gray-400 text-sm mt-2">Customer reviews will appear here when available</p>
                </div>
            )}
        </div>
    );
};