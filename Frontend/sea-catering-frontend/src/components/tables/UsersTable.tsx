/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Shield, User as UserIcon, Mail, Crown, AlertTriangle, Check, X } from 'lucide-react';

const columnHelper = createColumnHelper<User>();

// Modal Konfirmasi
const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    userName, 
    currentRole, 
    newRole,
    isLoading 
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string;
    currentRole: string;
    newRole: string;
    isLoading: boolean;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-full">
                            <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                        Confirm Role Change
                    </h3>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                        <p className="text-gray-700 text-center mb-3">
                            Are you sure you want to change <span className="font-semibold text-green-700">{userName}</span>'s role?
                        </p>
                        
                        <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">From:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    currentRole === 'admin' 
                                        ? 'bg-purple-100 text-purple-700' 
                                        : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {currentRole === 'admin' ? '👑 Admin' : '👤 User'}
                                </span>
                            </div>
                            
                            <span className="text-gray-400">→</span>
                            
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">To:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    newRole === 'admin' 
                                        ? 'bg-purple-100 text-purple-700' 
                                        : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {newRole === 'admin' ? '👑 Admin' : '👤 User'}
                                </span>
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
                            <span>{isLoading ? 'Updating...' : 'Confirm'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen untuk mengubah peran dengan konfirmasi
const RoleChanger = ({ userId, currentRole, userName }: { 
    userId: string; 
    currentRole: 'user' | 'admin';
    userName: string;
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pendingRole, setPendingRole] = useState<'user' | 'admin' | null>(null);

    const handleRoleChangeRequest = (newRole: 'user' | 'admin') => {
        if (newRole === currentRole) return;
        
        setPendingRole(newRole);
        setShowConfirmation(true);
    };

    const handleConfirmRoleChange = async () => {
        if (!pendingRole) return;

        setIsUpdating(true);
        try {
            await updateUserRole(userId, pendingRole);
            dispatch(updateUserRoleInState({ userId, newRole: pendingRole }));
            toast.success("User role updated successfully!", {
                icon: '✅',
                style: {
                    borderRadius: '12px',
                    background: '#10B981',
                    color: '#fff',
                }
            });
        } catch (error) {
            toast.error("Failed to update role. Please try again.", {
                icon: '❌',
                style: {
                    borderRadius: '12px',
                    background: '#EF4444',
                    color: '#fff',
                }
            });
        } finally {
            setIsUpdating(false);
            setShowConfirmation(false);
            setPendingRole(null);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmation(false);
        setPendingRole(null);
    };

    return (
        <>
            <select
                value={currentRole}
                onChange={(e) => handleRoleChangeRequest(e.target.value as 'user' | 'admin')}
                disabled={isUpdating}
                className={`px-4 py-2 rounded-xl border-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isUpdating 
                        ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                        : 'bg-white border-green-200 hover:border-green-300 cursor-pointer'
                } ${
                    currentRole === 'admin' 
                        ? 'text-purple-700' 
                        : 'text-blue-700'
                }`}
            >
                <option value="user">👤 User</option>
                <option value="admin">👑 Admin</option>
            </select>

            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={handleCloseModal}
                onConfirm={handleConfirmRoleChange}
                userName={userName}
                currentRole={currentRole}
                newRole={pendingRole || currentRole}
                isLoading={isUpdating}
            />
        </>
    );
};

const columns = [
    columnHelper.accessor('full_name', {
        header: 'Full Name',
        cell: info => (
            <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-full">
                    <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="font-semibold text-gray-800">{info.getValue()}</div>
                    <div className="text-sm text-gray-500">Full Name</div>
                </div>
            </div>
        ),
    }),
    columnHelper.accessor('email', {
        header: 'Email',
        cell: info => (
            <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="font-medium text-gray-800">{info.getValue()}</div>
                    <div className="text-sm text-gray-500">Email Address</div>
                </div>
            </div>
        ),
    }),
    columnHelper.accessor('role', {
        header: 'Role & Permissions',
        cell: info => {
            const row = info.row.original;
            return (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-full ${
                            info.getValue() === 'admin' 
                                ? 'bg-gradient-to-br from-purple-400 to-pink-500' 
                                : 'bg-gradient-to-br from-green-400 to-blue-500'
                        }`}>
                            {info.getValue() === 'admin' ? (
                                <Crown className="w-5 h-5 text-white" />
                            ) : (
                                <Shield className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <div className="mr-4">
                            <div className={`font-semibold ${
                                info.getValue() === 'admin' ? 'text-purple-700' : 'text-blue-700'
                            }`}>
                                {info.getValue() === 'admin' ? 'Administrator' : 'Regular User'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {info.getValue() === 'admin' ? 'Full Access' : 'Limited Access'}
                            </div>
                        </div>
                    </div>
                    
                    <RoleChanger 
                        userId={row.id} 
                        currentRole={info.getValue()} 
                        userName={row.full_name}
                    />
                </div>
            );
        },
    }),
];

export const UsersTable = ({ data }: { data: User[] }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                    <UserIcon className="w-7 h-7" />
                    <span>Users Overview</span>
                </h2>
                <p className="text-green-100 mt-2">Manage user roles and permissions</p>
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
                        <UserIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No users found</p>
                    <p className="text-gray-400 text-sm mt-2">Users will appear here when available</p>
                </div>
            )}
        </div>
    );
};