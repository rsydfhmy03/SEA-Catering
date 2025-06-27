import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSubscriptions as fetchUserSubscriptions, type Subscription } from '../../services/api/subscriptionsApi';

interface SubscriptionsState {
    items: Subscription[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SubscriptionsState = {
    items: [],
    status: 'idle',
    error: null,
};

export const getUserSubscriptions = createAsyncThunk('subscriptions/getUser', async () => {
    const subscriptions = await fetchUserSubscriptions();
    return subscriptions;
});

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserSubscriptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserSubscriptions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getUserSubscriptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch subscriptions.';
            });
    },
});

export default subscriptionsSlice.reducer;
