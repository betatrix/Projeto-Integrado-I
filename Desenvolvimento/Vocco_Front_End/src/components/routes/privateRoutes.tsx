// src/components/PrivateRoute.tsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';

interface PrivateRouteProps {
    requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
    const authContext = useContext(AuthContext);

    if (!authContext || !authContext.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && decryptData(authContext.role || "") !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
