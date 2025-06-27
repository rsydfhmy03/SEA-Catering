import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subscriptionsReducer from './slices/subscriptionsSlice';
import adminReducer from './slices/adminSlice';
import userManagementReducer from './slices/userManagementSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        subscriptions: subscriptionsReducer,
        admin: adminReducer,
        userManagement: userManagementReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;