import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { Testimonial } from '../../services/api/testimonialsApi';
import { approveTestimonial } from '../../services/api/adminApi';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { approveTestimonialInState } from '../../store/slices/testimonialManagementSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const columnHelper = createColumnHelper<Testimonial>();

const ActionCell = ({ testimonial }: { testimonial: Testimonial }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isApproving, setIsApproving] = useState(false);

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await approveTestimonial(testimonial.id);
            dispatch(approveTestimonialInState({ testimonialId: testimonial.id }));
            toast.success("Testimonial approved!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to approve testimonial.");
        } finally {
            setIsApproving(false);
        }
    };

    if (testimonial.status === 'approved') {
        return <span className="flex items-center gap-1 text-green-600 font-semibold"><CheckCircle size={16}/> Approved</span>;
    }

    return (
        <button
            onClick={handleApprove}
            disabled={isApproving}
            className="bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-full hover:bg-blue-600 disabled:bg-gray-400"
        >
            {isApproving ? 'Approving...' : 'Approve'}
        </button>
    );
};

const columns = [
    columnHelper.accessor('customer_name', { header: 'Customer' }),
    columnHelper.accessor('review_message', {
        header: 'Review',
        cell: info => <p className="max-w-xs truncate">{info.getValue()}</p>,
    }),
    columnHelper.accessor('rating', {
        header: 'Rating',
        cell: info => <div className="flex">{[...Array(info.getValue())].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current" />)}</div>,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => <span className={`capitalize px-2 py-1 text-xs font-semibold rounded-full ${info.getValue() === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{info.getValue()}</span>,
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Action',
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
         <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
