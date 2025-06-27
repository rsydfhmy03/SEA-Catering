import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardMetrics as fetchMetrics, type DashboardMetrics } from '../../services/api/adminApi';

interface AdminState {
    metrics: DashboardMetrics | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AdminState = {
    metrics: null,
    status: 'idle',
};

export const getDashboardMetrics = createAsyncThunk('admin/getMetrics', async (params?: { startDate?: string, endDate?: string }) => {
    const metrics = await fetchMetrics(params?.startDate, params?.endDate);
    return metrics;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardMetrics.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDashboardMetrics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.metrics = action.payload;
            });
    },
});

export default adminSlice.reducer;
