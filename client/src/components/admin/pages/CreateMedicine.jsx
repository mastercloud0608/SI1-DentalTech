import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProvider } from "../../../context/AuthProvider";

export const CreateMedicine = () => {

    const { createMedicine } = useProvider();

    const navigate = useNavigate();

    const [medicine, setMedicine] = useState({
        nombre:'',
        descripcion:''
    });

    const [error, setError] = useState('')

    const handleChange = ({ target: { name, value } }) => {
        setMedicine({ ...medicine, [name]: value });
        console.log({ [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const option = e.nativeEvent.submitter.id;

        if (option === 'cancel') {
            navigate('/admin/medicines');
            return;
        }

        try {
            await createMedicine(medicine);
            navigate('/admin/medicines');
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
                                    <p className="mb-0 uppercase">Crear Medicamento</p>
                                </div>
                            </div>

                            <div className="flex-auto p-6">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Nombre</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                onChange={handleChange}
                                                value={medicine.nombre}
                                                className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                        </div>
                                    </div>
                                  
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Descripcion</label>
                                            <input
                                                type="text"
                                                name="descripcion"
                                                onChange={handleChange}
                                                value={medicine.descripcion} className="focus:shadow-primary-outline dark:bg-slate-850  text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
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
                                                Crear Medicamento
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