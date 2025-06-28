import apiClient from '../apiClient';

export interface Testimonial {
    id: string;
    customer_name: string;
    review_message: string;
    rating: number;
    status: 'approved' | 'pending';
}

export interface NewTestimonialData {
    customer_name: string;
    review_message: string;
    rating: number;
}

export const getApprovedTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const response = await apiClient.get<{ data: Testimonial[] }>('/testimonials');
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        throw error;
    }
};

export const submitTestimonial = async (testimonialData: NewTestimonialData): Promise<Testimonial> => {
    try {
        const formData = new FormData();
        formData.append('customer_name', testimonialData.customer_name);
        formData.append('review_message', testimonialData.review_message);
        formData.append('rating', testimonialData.rating.toString());

        const response = await apiClient.post<{ data: Testimonial }>('/testimonials', formData, {
             headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Failed to submit testimonial:', error);
        throw error;
    }
};
