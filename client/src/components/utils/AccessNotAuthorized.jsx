import avatarAuth from '../../assets/avatar-auth.webp';
import { Link } from 'react-router-dom';

export const AccessNotAuthorized = () => {
    return (
        <>
            <div className='flex items-center justify-center w-screen h-screen' >
                <div className="py-8 px-4 lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-custom-green">401</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Acceso no autorizado</p>
                        <p className="mb-4 text-lg font-light text-gray-400">
                            No tienes permiso para acceder a esta página.
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-400">
                            Por favor, inicia sesión con las credenciales adecuadas para obtener acceso autorizado.
                        </p>
                        <Link to='/' className="inline-flex  bg-custom-rose hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Volver al inicio</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
