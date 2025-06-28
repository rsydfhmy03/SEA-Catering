import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { User } from '../../store/slices/authSlice';
import { updateUserRole } from '../../services/api/adminApi';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { updateUserRoleInState } from '../../store/slices/userManagementSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';

const columnHelper = createColumnHelper<User>();

// Komponen untuk mengubah peran
const RoleChanger = ({ userId, currentRole }: { userId: string, currentRole: 'user' | 'admin' }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleRoleChange = async (newRole: 'user' | 'admin') => {
        if (newRole === currentRole) return;

        setIsUpdating(true);
        try {
            await updateUserRole(userId, newRole);
            dispatch(updateUserRoleInState({ userId, newRole }));
            toast.success("User role updated!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to update role.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <select
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value as 'user' | 'admin')}
            disabled={isUpdating}
            className={`p-1 rounded-md border ${isUpdating ? 'bg-gray-200' : 'bg-white'}`}
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
    );
};


const columns = [
    columnHelper.accessor('full_name', {
        header: 'Full Name',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
        header: 'Email',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
        header: 'Role',
        cell: info => <RoleChanger userId={info.row.original.id} currentRole={info.getValue()} />,
    }),
];

export const UsersTable = ({ data }: { data: User[] }) => {
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
                        <tr key={row.id}>
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