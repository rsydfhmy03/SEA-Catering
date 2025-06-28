import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {User} from './authSlice';
import { getAllUsers as fetchAllUsers } from '../../services/api/adminApi';

interface UserManagementState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserManagementState = {
    users: [],
    status: 'idle',
};

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async () => {
    const users = await fetchAllUsers();
    return users;
});

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState,
    reducers: {
        updateUserRoleInState: (state, action) => {
            const { userId, newRole } = action.payload;
            const userIndex = state.users.findIndex((user: { id: unknown; }) => user.id === userId);
            if (userIndex !== -1) {
                state.users[userIndex].role = newRole;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            });
    },
});

export const { updateUserRoleInState } = userManagementSlice.actions;
export default userManagementSlice.reducer;