import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProvider } from '../../../context/AuthProvider';
import avatarRegister from '../../../assets/avatar-register.webp';

export const RegisterForm = () => {

    const navigate = useNavigate();

    const { registerUser } = useProvider();


    const [user, setUser] = useState({
        username: '',
        password: '',
        correo: '',
    })

    const [error, setError] = useState('')


    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser(user);
            navigate('/home')
        } catch (e) {
            console.log('kkkkkk', e)
            setError(e);
        }
    }

    return (
        <>
            <section className="absolute w-full h-full h-100% scrollBehavior-unset">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-8/12 px-4">
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                <div
                                    className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                                    <div className="w-full">
                                        <div
                                            className="block rounded-lg shadow-lg bg-custom-green">
                                            <div className="g-0 lg:flex lg:flex-wrap">

                                                <div className="bg-custom-grey hidden lg:flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                                                    <img src={avatarRegister} className="w-full h-full  object-cover" />
                                                </div>


                                                <div className="lg:w-6/12 p-5">
                                                    <div className="p-3 md:p-6 lg:p-6">
                                                        <div className="flex p-5 justify-center items-center">
                                                            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">Registrarse</h2>
                                                        </div>
                                                        {
                                                            error &&
                                                            <p className="mb-8 rounded-md flex h-10 items-center justify-center bg-custom-warning text-sm font-medium text-custom-blue">La constraseña debe tener almenos 6 caracteres.</p>
                                                        }
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="relative mb-6" data-te-input-wrapper-init>
                                                                <input
                                                                    type="text"
                                                                    name='username'
                                                                    placeholder='Nombre de usuario'
                                                                    className="peer block w-full rounded border-0 bg-custom-blue px-3 py-[0.32rem] leading-[2.15] outline-none"
                                                                    onChange={handleChange}
                                                                    value={user.username}
                                                                />
                                                            </div>

                                                            <div className="relative mb-6" data-te-input-wrapper-init>
                                                                <input
                                                                    type="text"
                                                                    name='correo'
                                                                    placeholder='Correo electronico'
                                                                    className="peer block w-full rounded border-0 bg-custom-blue px-3 py-[0.32rem] leading-[2.15] outline-none"
                                                                    onChange={handleChange}
                                                                    value={user.correo}
                                                                />
                                                            </div>

                                                            <div className="relative mb-6" data-te-input-wrapper-init>
                                                                <input
                                                                    type='password'
                                                                    name='password'
                                                                    placeholder='Contraseña'
                                                                    className="peer block w-full textrounded border-0 bg-custom-blue px-3 py-[0.32rem] leading-[2.15] outline-none"
                                                                    onChange={handleChange}
                                                                    value={user.password}
                                                                />
                                                            </div>

                                                            <button
                                                                type="submit"
                                                                className="inline-block bg-custom-rose text-custom-blue w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca]"
                                                            >
                                                                Registrarse
                                                            </button>

                                                            <p className='text-black mt-3 text-sm'>Ya tienes cuenta?
                                                                <Link to='/login' className='ml-2'>Inicia sesion Aqui</Link>
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}