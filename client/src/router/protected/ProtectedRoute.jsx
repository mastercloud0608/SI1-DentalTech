import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../../services/userApi';

export const ProtectedRoute = ({ children }) => {

    const user = getUser();

    if (!user) {
        return <Navigate to='/' />
    }
     
    return children ? children : <Outlet />
}