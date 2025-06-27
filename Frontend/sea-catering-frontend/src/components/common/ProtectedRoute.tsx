import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../../store/slices/authSlice';
import type { JSX } from 'react';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;

