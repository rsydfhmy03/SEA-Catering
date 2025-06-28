import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getUserSubscriptions as fetchUserSubscriptions,
    getUserPausedSubscriptions as fetchPausedSubscriptions,
    type Subscription 
} from '../../services/api/subscriptionsApi';

interface SubscriptionsState {
    activeItems: Subscription[];
    pausedItems: Subscription[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SubscriptionsState = {
    activeItems: [],
    pausedItems: [],
    status: 'idle',
    error: null,
};

export const getUserSubscriptions = createAsyncThunk(
    'subscriptions/getUser', 
    async () => await fetchUserSubscriptions()
);

export const getUserPausedSubscriptions = createAsyncThunk(
    'subscriptions/getPaused',
    async () => await fetchPausedSubscriptions()
);

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
                state.activeItems = action.payload.filter(sub => sub.status === 'active');
                state.pausedItems = action.payload.filter(sub => sub.status === 'paused');
            })
            .addCase(getUserSubscriptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch subscriptions.';
            })
            .addCase(getUserPausedSubscriptions.fulfilled, (state, action) => {
                state.pausedItems = action.payload;
            });
    },
});

export default subscriptionsSlice.reducer;