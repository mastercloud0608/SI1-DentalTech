import { Navigate, Outlet } from 'react-router-dom';
import { useProvider } from '../../context/AuthProvider';


export const ProtectedRedirect = ({ children, redirectTo, rol }) => {
    const { getUser } = useProvider();

    const user = getUser();

    if (user && user.rol !== rol) {
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />
}