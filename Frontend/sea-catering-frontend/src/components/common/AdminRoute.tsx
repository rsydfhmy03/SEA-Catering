import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/slices/authSlice';
import type { JSX } from 'react';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector(selectCurrentUser);
    if (user?.role !== 'admin') {
        // Jika bukan admin, redirect ke dasbor pengguna atau halaman utama
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};
export default AdminRoute;