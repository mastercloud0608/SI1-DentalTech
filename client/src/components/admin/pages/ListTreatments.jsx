import {
    AiFillDelete
} from "react-icons/ai";

import {
    FiEdit
} from "react-icons/fi";

import {
    RiServiceLine
} from 'react-icons/ri'

import { Link, useNavigate } from 'react-router-dom';
import { ListSkeleton } from './skeletons'
import { useQuery } from 'react-query';
import { getListTreatments,deleteTreatmentById } from "../../../services/adminApi";

export const ListTreatments = () => {

    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['treatments'],
        queryFn: getListTreatments
    });

    const handleCreate = () => {
        navigate('/admin/treatment/createTreatment')
    }

    const transforInterval = (interval) => {
        if (!interval || typeof interval !== 'object') {
            return '';
        }
        const hoursString = interval.hours !== undefined ? `${interval.hours} horas` : '';
        const minutesString = interval.minutes !== undefined ? `${interval.minutes} minutos` : '';
        return `${hoursString}   ${minutesString}`;
    };

    return (
        <>
            <div className="container overflow-auto max-w-7xl px-4 mx-auto sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full lg:mb-10 md:mb-10 mb-5">
                        <h2 className="text-2xl">
                            Lista de tratamientos
                        </h2>
                    </div>
                    <div className="sm:inline-block sm:w-full lg:flex md:flex xl:flex items-center justify-between pb-4 ">
                        <div className="p-2 pl-0 pr-0 flex flex-col sm:p-0">
                            <button onClick={handleCreate} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-custom-blue rounded-lg shadow-md flex items-center">
                                <RiServiceLine className="mr-2 lg:text-xl md:text-xl text-2xl" />
                                <span className="text-xp p-0.5">Crear nuevo tratamiento</span>
                            </button>
                        </div>

                        <form className="flex flex-col justify-center w-full max-w-sm space-y-3 md:flex-row md:w-auto md:space-x-3 md:space-y-0 mt-3 md:mt-0">
                            <input
                                type="text"
                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                                placeholder="nombre"
                            />
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-custom-blue rounded-lg shadow-md" type="submit">
                                Filtrar
                            </button>
                        </form>
                    </div>

                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Costo
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Duracion
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    isLoading ?
                                        <ListSkeleton length={4} />
                                        :
                                        data.map(({ id, nombre, costo, duracion }) => (
                                            <tbody key={id}>
                                                <tr>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {nombre}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {costo}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {transforInterval(duracion)}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex justify-start pl-4">
                                                            <Link to={`/admin/treatment/edit/${id}`} href="#" title="editar" className="mr-2 text-custom-blue">
                                                                <FiEdit />
                                                            </Link>
                                                            <Link onClick={() => deleteTreatmentById(id)} title="eliminar" className="ml-2  text-custom-blue">
                                                                <AiFillDelete />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                }

                            </table>

                            {
                                 (data?.length === 0 && !isLoading) &&
                                <>
                                    <div className="flex items-center justify-center px-4 py-4 bg-white">
                                        <p>
                                            Aun no hay tratamientos ...
                                        </p>
                                    </div>

                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
