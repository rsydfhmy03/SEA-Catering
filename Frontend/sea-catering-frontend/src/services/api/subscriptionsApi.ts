import apiClient from '../apiClient';

export interface SubscriptionData {
    plan_id: string;
    meal_types: string[];
    delivery_days: string[];
    allergies: string;
    phone_number: string;
}
export interface Subscription {
    id: string;
    plan_name: string;
    meal_types: string[];
    delivery_days: string[];
    total_price: string;
    status: 'active' | 'paused' | 'cancelled';
    start_date: string;
    end_date: string;
}

export const createSubscription = async (data: SubscriptionData) => {
    const response = await apiClient.post('/subscriptions', data);
    return response.data;
};

export const getUserSubscriptions = async (): Promise<Subscription[]> => {
    const response = await apiClient.get('/subscriptions/me/subscriptions');
    return response.data.data;
};

export const pauseSubscription = async (id: string, dates: { pause_start_date: string, pause_end_date: string }) => {
    const response = await apiClient.put(`/subscriptions/${id}/pause`, dates);
    return response.data;
};

export const cancelSubscription = async (id: string) => {
    const response = await apiClient.delete(`/subscriptions/${id}`);
    return response.data;
};