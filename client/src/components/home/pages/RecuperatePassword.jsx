import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProvider } from '../../../context/AuthProvider';


export const RestorePassword = () => {

    const navigate = useNavigate();

    const { restorePassword } = useProvider();

    const [user, setUser] = useState({
        correo: ''
    })

    const [error, setError] = useState('')


    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await restorePassword(user);
            navigate(`/restore/password/change/${data.id}`);
        } catch (e) {
            console.error(e)
            setError(e);
        }
    }

    return (
        <>
            <section className="absolute w-full h-full h-100% scrollBehavior-unset">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-8/12 px-4">
                            <div
                                className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
                                <div
                                    className="block rounded-lg shadow-lg bg-custom-green">
                                    <div className="g-0 lg:flex lg:flex-wrap">


                                        <div className="p-3 md:p-6 lg:p-6">

                                            {
                                                (error) ?
                                                    <>
                                                        <div className="text-center">
                                                            <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Restablecer Contraseña</h2>
                                                        </div>
                                                        <p className="mb-8 rounded-md flex h-10 items-center justify-center bg-custom-warning text-sm font-medium text-custom-blue">El correo no existe</p>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="text-center">
                                                            <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Restablecer Contraseña</h2>
                                                        </div>
                                                    </>
                                            }
                                            <form onSubmit={handleSubmit}>
                                                <div className="relative mb-6" data-te-input-wrapper-init>
                                                    <input
                                                        type="text"
                                                        name='correo'
                                                        placeholder='Correo electronico'
                                                        className="text-white peer block w-full rounded border-0 bg-custom-blue px-3 py-[0.32rem] leading-[2.15] outline-none"
                                                        onChange={handleChange}
                                                        value={user.correo}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="inline-block bg-custom-rose text-custom-blue w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca]"
                                                >
                                                    Verificar Correo
                                                </button>
                                            </form>
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