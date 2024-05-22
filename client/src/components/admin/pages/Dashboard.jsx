import React, { useState, useEffect } from 'react';
import {
    CardStadisticPostponedQuote,
    CardStadisticQuoteDay,
    CardStadisticUsersNews,
    CardTimeLine,
    CardTopServices
} from "./DashboardComponents";
import { getUser } from '../../../services/userApi';

export const Dashboard = () => {
    const [showPostponedQuote, setShowPostponedQuote] = useState(true);
    const [showUsersNews, setShowUsersNews] = useState(true);
    const [showQuoteDay, setShowQuoteDay] = useState(true);
    const [showTimeLine, setShowTimeLine] = useState(true);
    const [showTopServices, setShowTopServices] = useState(true);

    useEffect(() => {
        // Aquí puedes agregar lógica adicional para determinar si mostrar o no cada componente
        // Por ejemplo, puedes verificar el tipo de usuario, permisos, etc.
        // Si no deseas que se muestre un componente específico, puedes establecer setShowComponente(false)
        console.log("showTopServices:", showTopServices);
    }, [showTopServices]);

    return (
        <>
            <main className="flex-1 overflow-hidden">
                <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <p className="flex text-xl items-center mr-4">Bienvenido {getUser().username}</p>
                </div>

                <div className="container max-w-4xl px-4 mx-auto  md:grid-cols-2 sm:px-8 grid lg:grid-cols-3  gap-3">
                    {/* pospuestas */}
                    {showPostponedQuote && <CardStadisticPostponedQuote />}
                    {/* usuarios nuevos */}
                    {showUsersNews && <CardStadisticUsersNews />}
                    {/* citas del dia */}
                    {showQuoteDay && <CardStadisticQuoteDay />}
                </div>

                <div className="container max-w-4xl px-4 mx-auto sm:px-8 grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                    {/* linea del tiempo */}
                    {showTimeLine && <CardTimeLine />}
                    {/* top servicios */}
                    {showTopServices && <CardTopServices />}
                    {console.log("Rendering CardTopServices:", showTopServices)}
                </div>
            </main>
        </>
    )
}
