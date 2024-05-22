import { FcConferenceCall } from "react-icons/fc";
import { SkeletonCardStadistics } from "../skeletons";
import { useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { getUserCountDay } from '../../../../services/adminApi';
import socket_client from '../../../../context/socket';

export const CardStadisticUsersNews = () => {

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['usercount'],
        queryFn: getUserCountDay
    });
    

    useEffect(() => {
        const handleUserCountUpdate = (updatedUsercount) => {
            queryClient.setQueryData('usercount', updatedUsercount);
        };

        socket_client.on('usercountday', handleUserCountUpdate);

        return () => {
            socket_client.off('usercountday', handleUserCountUpdate);
        };
    }, [queryClient]);

    return (
        <>
            {
                (isLoading) ?
                    <SkeletonCardStadistics />
                    :
                    <div className="flex mx-auto py-2 px-4 sm:px-6 lg:px-8 lg:py-8">
                        <div className="relative w-60 p-4 overflow-hidden bg-white shadow-lg rounded-2xl">
                            <div className="flex flex-row items-center">
                                <div className="w-4/8 mr-2">
                                    <p className="text-xm font-medium text-gray-400">
                                        Usuarios nuevos
                                    </p>
                                    <p className="mb-2 text-lg font-medium text-gray-800">
                                        {data.count_users}
                                    </p>
                                </div>
                                <FcConferenceCall className="ml-auto mr-auto w-10 h-10" />
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}