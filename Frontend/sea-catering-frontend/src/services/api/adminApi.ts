import apiClient from '../apiClient';
import type {User} from '../../store/slices/authSlice';

export interface DashboardMetrics {
    newSubscriptions: number;
    mrr: number;
    reactivations: number;
    totalActiveSubscriptions: number;
}

export const getDashboardMetrics = async (startDate?: string, endDate?: string): Promise<DashboardMetrics> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    const response = await apiClient.get('/admin/dashboard/metrics', { params });
    return response.data.data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await apiClient.get('/admin/users');
    return response.data.data;
};

export const updateUserRole = async (userId: string, role: 'user' | 'admin'): Promise<User> => {
    const response = await apiClient.put(`/admin/users/${userId}/role`, { role });
    return response.data.data;
};
