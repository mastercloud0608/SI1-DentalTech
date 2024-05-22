import { Navigate, Outlet } from 'react-router-dom';
import { useProvider } from '../../context/AuthProvider';

export const ProtectedHome = ({ children }) => {
    const { getUser } = useProvider();

    const user = getUser();

    if (user) {
        return <Navigate to={`/${user.rol}`} />
    }
     
    return children ? children : <Outlet />
}