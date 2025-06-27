import apiClient from '../apiClient';

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