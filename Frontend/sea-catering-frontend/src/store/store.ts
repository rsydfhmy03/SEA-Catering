import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subscriptionsReducer from './slices/subscriptionsSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        subscriptions: subscriptionsReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;