import {
    AiOutlineFilePdf
} from "react-icons/ai";

import { Link, useNavigate } from 'react-router-dom';
import { useProvider } from "../../../context/AuthProvider";
import { LoadingLayout } from '../../utils/LoadingLayout';

export const ListPatients = () => {

    const { patients, loadingPatients } = useProvider();

    const navigate = useNavigate();

    console.log(patients);

    return (
        <>
            {
                (loadingPatients)
                    ? <LoadingLayout />
                    :
                    <div className="container overflow-auto max-w-7xl px-4 mx-auto sm:px-8">
                        <div className="py-8">
                            <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                                <h2 className="text-2xl mb-10">
                                    Pacientes
                                </h2>
                                <div className="text-end">
                                    <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                                        <div className=" relative ">
                                            <input type="text" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent" placeholder="nombre,rol" />
                                        </div>
                                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-custom-blue rounded-lg shadow-md" type="submit">
                                            Filtrar
                                        </button>
                                    </form>
                                </div>
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
                                                    Apellido
                                                </th>
                                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                    ci
                                                </th>
                                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>


                                        {
                                            patients.map(({ id, nombre, apellido, ci }) => (
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
                                                                {apellido}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {ci}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex justify-start pl-4">
                                                                <Link to='/' href="#" title="editar" className="mr-2 text-custom-blue">
                                                                    <AiOutlineFilePdf className="text-red-500 text-xl" />
                                                                </Link>
                                                            
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }

                                    </table>

                                    {
                                        (patients.length === 0) &&
                                        <>
                                            <div className="flex items-center justify-center px-4 py-4 bg-white">
                                                <p>
                                                    Aun no hay Pacientes ...
                                                </p>
                                            </div>

                                        </>
                                    }

                                
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}