import { useState } from 'react';
import { LoadingLayout } from '../../utils/LoadingLayout';
import { useNavigate } from 'react-router-dom';
import { ConfirmChanges } from '../../utils/ConfirmChanges';
import { useFetchUser } from './useFetchUser';
import { useProvider } from '../../../context/AuthProvider';

export const PerfilUser = () => {

    const navigate = useNavigate();
    const { updateProfileById } = useProvider();
    const [error, setError] = useState('')
    const [changesMade, setChangesMade] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState(null);

    const { currentuser, loadingcurrentuser, setCurrentUser } = useFetchUser();

    const handleChange = ({ target: { name, value } }) => {
        setCurrentUser({ ...currentuser, [name]: value });
        console.log({ [name]: value })
        setChangesMade(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const option = e.nativeEvent.submitter.id;

        if (option === 'cancel') {
            setShowModal(true);
            return;
        }

        try {
            await updateProfileById(currentuser);
        } catch (e) {
            console.log(e)
            setError(e);
        }
    }

    const handleCancel = () => {
        setShowModal(false);
        setChangesMade(false);
    }


    return (
        <>
            {
                loadingcurrentuser ?
                    <LoadingLayout />
                    :
                    <>
                        <div className="w-full p-6 mx-auto">
                            <div className="flex flex-wrap -mx-3">
                                <form onSubmit={handleSubmit} className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                                        <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                                            <div className="flex items-center">
                                                <p className="mb-0 ">PERFIL</p>
                                            </div>
                                        </div>

                                        <div className="flex-auto p-6">
                                            <p className="leading-normal uppercase text-sm">Informacion personal</p>
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Nombre de usuario</label>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            onChange={handleChange}
                                                            value={currentuser?.username || ''}
                                                            className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Correo electronico</label>
                                                        <input
                                                            type="email"
                                                            name="correo"
                                                            onChange={handleChange}
                                                            value={currentuser?.correo || ''}
                                                            className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Nombre</label>
                                                        <input
                                                            type="text"
                                                            name="nombre"
                                                            onChange={handleChange}
                                                            value={currentuser?.nombre || ''}
                                                            className="focus:shadow-primary-outline dark:bg-slate-850 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Apellido</label>
                                                        <input
                                                            type="text"
                                                            name="apellido"
                                                            onChange={handleChange}
                                                            value={currentuser?.apellido || ''} className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>

                                                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Carnet de identidad</label>
                                                        <input
                                                            type="text"
                                                            name="ci"
                                                            onChange={handleChange}
                                                            value={currentuser?.ci || ''}
                                                            className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>

                                                <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Telefono</label>
                                                        <input
                                                            type="text"
                                                            name="telefono"
                                                            onChange={handleChange}
                                                            value={currentuser?.telefono || ''}
                                                            className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

                                            <p className="leading-normal uppercase  dark:opacity-60 text-sm">Informacion de contacto</p>
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Direccion</label>
                                                        <input
                                                            type="text"
                                                            name="direccion"
                                                            onChange={handleChange}
                                                            value={currentuser?.direccion || ''} className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>
                                                {

                                                    changesMade &&
                                                    <>
                                                        <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                            <div className="mb-4">
                                                                <button
                                                                    className="inline-block border w-full px-4 py-2 text-base font-semibold text-white bg-custom-blue rounded-lg shadow-md"
                                                                    type="submit"
                                                                    id='cancel'
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                                            <div className="mb-4">
                                                                <button
                                                                    className="inline-block border w-full  px-4 py-2 text-base font-semibold text-black bg-custom-rose rounded-lg shadow-md"
                                                                    type="submit"
                                                                    id='edit'
                                                                >
                                                                    Guardar cambios
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {showModal && <ConfirmChanges handleCancel={handleCancel} />}
                    </>
            }
        </>
    )
}