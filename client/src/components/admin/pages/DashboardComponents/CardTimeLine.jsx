import { SkeletonTimelineAndServices } from '../skeletons';
import { useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { getTimeLine } from '../../../../services/adminApi';
import socket_client from '../../../../context/socket'


export const CardTimeLine = () => {

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['timeline'],
        queryFn: getTimeLine
    });

    const transformDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const transformTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const handleTimelineUpdate = (updatedTimeline) => {
            queryClient.setQueryData('timeline', updatedTimeline);
        };

        socket_client.on('timeline', handleTimelineUpdate);

        return () => {
            socket_client.off('timeline', handleTimelineUpdate);
        };
    }, [queryClient]);


    return (
        <>
            {
                isLoading ?
                    <SkeletonTimelineAndServices />
                    :
                    <>
                        <div className="px-4 py-4 border-b rounded-t sm:px-6">
                            <div className="overflow-hidden p-3 bg-white shadow-lg rounded-2xl text-black">

                                <div className="w-full px-4 py-4 border-b sm:px-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                                        Linea del tiempo
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Resumen de los diferentes actividades en la web.
                                    </p>
                                </div>

                                <ul className="divide-y divide-gray-200">
                                    {
                                        data.map(({ id, creat_at, creat_update, creat_delete, accion, descripcion }) => (
                                            <li key={id}>
                                                <div className="px-4 py-4 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-gray-700 text-md md:truncate">
                                                            {descripcion}
                                                        </p>
                                                        <div className="flex flex-shrink-0 ml-2">
                                                            <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                                {accion}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            {creat_at && (
                                                                <p className="flex items-center font-light text-gray-500 text-md">
                                                                    {transformDate(creat_at)} |  {transformTime(creat_at)}
                                                                </p>
                                                            )}
                                                            {creat_update && (
                                                                <p className="flex items-center font-light text-gray-500 text-md">
                                                                    {transformDate(creat_update)} |  {transformTime(creat_update)}
                                                                </p>
                                                            )}
                                                            {creat_delete && (
                                                                <p className="flex items-center font-light text-gray-500 text-md">
                                                                    {transformDate(creat_delete)} |  {transformTime(creat_delete)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}