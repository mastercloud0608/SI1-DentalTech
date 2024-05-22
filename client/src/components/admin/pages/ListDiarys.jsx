import {
    AiFillDelete
} from "react-icons/ai";

import {
    FiEdit
} from "react-icons/fi";

import {
    BsFillPersonPlusFill
} from "react-icons/bs";


import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ListSkeleton } from './skeletons'
import socket_client from "../../../context/socket";
import { useQuery,useQueryClient } from 'react-query';
import { getListAllDiarysOdontologists } from "../../../services/adminApi";

export const ListDiarys = () => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['diarys'],
        queryFn: getListAllDiarysOdontologists
    });
    
    useEffect(() => {
        const handleDiarysUpdate = (updatedDiarys) => {
            queryClient.setQueryData('diarys', updatedDiarys);
        };

        socket_client.on('listdiarys', handleDiarysUpdate);

        return () => {
            socket_client.off('listdiarys', handleDiarysUpdate);
        };
    }, [queryClient]);

    return (
        <>
            <div className="container overflow-auto max-w-7xl px-4 mx-auto sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full lg:mb-10 md:mb-10 mb-5">
                        <h2 className="text-2xl">
                            Lista de agendas
                        </h2>
                    </div>
                    <div class="sm:inline-block sm:w-full lg:flex md:flex xl:flex items-center justify-between pb-4 ">
                        <form className="flex flex-col justify-center w-full max-w-sm space-y-3 md:flex-row md:w-auto md:space-x-3 md:space-y-0 mt-3 md:mt-0">
                            <input
                                type="text"
                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
                                placeholder="nombre,especialidad"
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
                                            Usuario
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Apellido
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Correo
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Telefono
                                        </th>
                                        {/* <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Acciones
                                        </th> */}
                                    </tr>
                                </thead>
                                {
                                    isLoading ?
                                        <ListSkeleton length={5} />
                                        :
                                        data.map(({ id, username, nombre, apellido, especialidad, correo,telefono }) => (
                                            <tbody key={id}>
                                                <tr>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {username ?? 'N/A'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {nombre ?? 'N/A'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {apellido ?? 'N/A'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {correo ?? 'N/A'}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {telefono ?? 'N/A'}
                                                        </p>
                                                    </td>
                                                    {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex justify-start pl-4">
                                                            <Link to={`/admin/users/edit/${id}`} href="#" title="editar" className="mr-2 text-custom-blue">
                                                                <FiEdit />
                                                            </Link>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            </tbody>
                                        ))
                                }

                            </table>

                            {
                                !data?.length &&
                                <>
                                    <div className="flex items-center justify-center px-4 py-4 bg-white">
                                        <p>
                                            Aun no hay agendas ...
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