import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getAllUsers } from '../../store/slices/userManagementSlice';
import { UsersTable } from '../../components/tables/UsersTable'; 

const UserManagementPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, status } = useSelector((state: RootState) => state.userManagement);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getAllUsers());
        }
    }, [status, dispatch]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            {status === 'loading' && <p>Loading users...</p>}
            {status === 'succeeded' && <UsersTable data={users} />}
        </div>
    );
};

export default UserManagementPage;
