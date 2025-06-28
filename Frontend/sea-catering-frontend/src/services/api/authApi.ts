import apiClient from '../apiClient';

export interface LoginCredentials { email: string; password: string; }
export interface RegisterData { full_name: string; email: string; password: string; }
export interface AuthResponse {
    token: string;
    user: { id: string; full_name: string; email: string; role: 'user' | 'admin'; };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.data;
};

export const register = async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
};

export const logoutUser = async () => {
    return apiClient.post('/auth/logout');
};
