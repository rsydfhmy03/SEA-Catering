import apiClient from '../apiClient';

export interface MealPlan {
    id: string;
    name: string;
    price: string;
    description: string;
    image_url: string;
}

export const getMealPlans = async (): Promise<MealPlan[]> => {
    try {
        const response = await apiClient.get<{ data: MealPlan[] }>('/meal-plans');
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch meal plans:', error);
        throw error;
    }
};

export const getMealPlanById = async (id: string): Promise<MealPlan> => {
    try {
        const response = await apiClient.get<{ data: MealPlan }>(`/meal-plans/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch meal plan with id ${id}:`, error);
        throw error;
    }
};