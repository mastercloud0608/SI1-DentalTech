import { useState } from 'react';
import { useProvider } from '../../../context/AuthProvider';
import { LoadingLayout } from '../../utils/LoadingLayout';
import { useNavigate } from 'react-router-dom';

export const SelectService = () => {

    const { services, loadingServices } = useProvider();

    const navigate = useNavigate();

    const handleChange = ({ target: { value } }) => {  //log_agenda
        navigate(`/patient/quote/calendar/${value}`);
    };


    return (
        <>
            {
                loadingServices ?
                    <LoadingLayout />
                    :
                    <div className="container overflow-auto max-w-3xl px-4 mx-auto sm:px-8">
                        <div className="py-4">
                            <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                                <h1 className="text-2xl mb-10">
                                    Crear cita
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                            <p className="text-xp mb-10">
                                Seleccione un servicio:
                            </p>
                        </div>
                        <select
                            name='id'
                            onChange={handleChange}
                            className=" text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="" selected disabled defaultValue >Seleccione una opcion</option>
                            {
                                services.map(({ id,especialidad_id, nombre }) => (
                                    <option
                                        key={id}
                                        value={especialidad_id}
                                    >
                                        {nombre}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
            }
        </>
    )
}