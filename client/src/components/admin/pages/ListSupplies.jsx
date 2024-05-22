import {
    AiFillDelete
} from "react-icons/ai";

import {
    FiEdit
} from "react-icons/fi";

import {
    LuPackagePlus
} from 'react-icons/lu';

import { Link, useNavigate } from 'react-router-dom';
import { ListSkeleton } from './skeletons'
import { getListAllSupplies,deleteSupplieById } from "../../../services/adminApi";
import { useQuery } from 'react-query';

export const ListSupplies = () => {

    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['supplies'],
        queryFn: getListAllSupplies
    });

    const handleCreate = () => {
        navigate('/admin/users/createsupplie')
    }

    return (
        <>
            <div className="container overflow-auto max-w-7xl px-4 mx-auto sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full lg:mb-10 md:mb-10 mb-5">
                        <h2 className="text-2xl">
                            Lista de suministros
                        </h2>
                    </div>
                    <div className="sm:inline-block sm:w-full lg:flex md:flex xl:flex items-center justify-between pb-4 ">
                        <div className="p-2 pl-0 pr-0 flex flex-col sm:p-0">
                            <button onClick={handleCreate} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-custom-blue rounded-lg shadow-md flex items-center">
                                <LuPackagePlus className="mr-2 lg:text-xl md:text-xl text-2xl" />
                                <span className="text-xp p-0.5">Crear nuevo suministro</span>
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
                                            Cantidad
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Descripcion
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
                                        data.map(({ id, nombre, cantidad, descripcion }) => (
                                            <tbody key={id}>
                                                <tr>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {nombre}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="flex justify-center items-center text-gray-900 whitespace-no-wrap">
                                                            {cantidad}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {descripcion}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex justify-start pl-4">
                                                            <Link to={`/admin/supplies/edit/${id}`} href="#" title="editar" className="mr-2 text-custom-blue">
                                                                <FiEdit />
                                                            </Link>
                                                            <Link onClick={() => deleteSupplieById(id)} title="eliminar" className="ml-2  text-custom-blue">
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
                                (data?.length === 0 && !isLoading)  &&
                                <>
                                    <div className="flex items-center justify-center px-4 py-4 bg-white">
                                        <p>
                                            Aun no hay suministros ...
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