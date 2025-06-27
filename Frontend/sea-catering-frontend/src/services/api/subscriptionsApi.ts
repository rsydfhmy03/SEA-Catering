import apiClient from '../apiClient';

export interface SubscriptionData {
    plan_id: string;
    meal_types: string[];
    delivery_days: string[];
    allergies: string;
    phone_number: string;
}

export const createSubscription = async (data: SubscriptionData) => {
    const response = await apiClient.post('/subscriptions', data);
    return response.data;
};