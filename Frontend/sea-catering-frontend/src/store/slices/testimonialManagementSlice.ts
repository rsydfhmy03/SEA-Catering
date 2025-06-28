import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTestimonials as fetchAll } from '../../services/api/adminApi';
import type { Testimonial } from '../../services/api/testimonialsApi';

interface TestimonialManagementState {
    testimonials: Testimonial[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TestimonialManagementState = {
    testimonials: [],
    status: 'idle',
};

export const getAllTestimonials = createAsyncThunk('admin/getAllTestimonials', async () => {
    const testimonials = await fetchAll();
    return testimonials;
});

const testimonialManagementSlice = createSlice({
    name: 'testimonialManagement',
    initialState,
    reducers: {
        approveTestimonialInState: (state, action) => {
            const { testimonialId } = action.payload;
            const testimonial = state.testimonials.find(t => t.id === testimonialId);
            if (testimonial) {
                testimonial.status = 'approved';
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTestimonials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTestimonials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.testimonials = action.payload;
            });
    },
});

export const { approveTestimonialInState } = testimonialManagementSlice.actions;
export default testimonialManagementSlice.reducer;