import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProvider } from "../../../context/AuthProvider";
import TextareaAutosize from 'react-textarea-autosize';

export const CreateSupplie = () => {

    const { createSupplie } = useProvider();

    const navigate = useNavigate();

    const [supplie, setSupplie] = useState({
        nombre: '',
        cantidad: '',
        descripcion: ''
    });

    const [error, setError] = useState('')

    const handleChange = ({ target: { name, value } }) => {
        setSupplie({ ...supplie, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const option = e.nativeEvent.submitter.id;

        if (option === 'cancel') {
            navigate('/admin/supplies');
            return;
        }

        try {
            await createSupplie(supplie);
            navigate('/admin/supplies');
        } catch (e) {
            console.log(e)
            setError(e);
        }
    }

    return (
        <>
            <div className="w-full p-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <form onSubmit={handleSubmit} className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                                <div className="flex items-center">
                                    <p className="mb-0 ">Crear Suministro</p>
                                </div>
                            </div>

                            <div className="flex-auto p-6">
                                {/* <p className="leading-normal uppercase text-sm text-gray-500">Informacion detallada del suministro</p> */}
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Nombre del material</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                onChange={handleChange}
                                                value={supplie.nombre}
                                                className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Cantidad</label>
                                            <input
                                                type="text"
                                                name="cantidad"
                                                onChange={handleChange}
                                                value={supplie.cantidad}
                                                className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                                        <div className="mb-4">
                                            <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Descripcion</label>
                                            <TextareaAutosize
                                                name="descripcion"
                                                onChange={handleChange}
                                                value={supplie.descripcion}
                                                className="resize-none focus:shadow-primary-outline dark:bg-slate-850 text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                                rows={1}
                                            />
                                        </div>
                                    </div>

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
                                                Crear suministro
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}