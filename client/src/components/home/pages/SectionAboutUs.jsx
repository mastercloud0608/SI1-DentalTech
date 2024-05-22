import React, { useState } from 'react';
import moiso from '../../../assets/moiso.webp';
import quimet from '../../../assets/quimet.webp';
import diego from '../../../assets/diego.webp';
import kathy from '../../../assets/gpta.webp';

const team = [
    {
        img: moiso,
        name: 'Moises Reyes',
        oc: 'CEO / Desarrollador Web / Administrador de la Nube',
    },
    {
        img: quimet,
        name: 'Quimet Medina',
        oc: 'Desarrollador Web / Líder de Documentación',
    },
    {
        img: diego,
        name: 'Diego Iglesias',
        oc: 'Administrador de Base de Datos'
    },
    {
        img: kathy,
        name: 'Katherin Montero',
        oc: 'Marketing'
    },
]

export const SectionAboutUs = () => {
    const [showSection, setShowSection] = useState(false);

    return (
        <>
            {showSection &&
                <section id='about-us' className="py-24 sm:py-32">
                    <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sobre Nosotros</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-400">
                                Somos un equipo brillante de estudiantes de Ingeniería en Ciencias de la Computación y Telecomunicaciones. Estamos comprometidos con la excelencia académica y nos apasiona encontrar soluciones innovadoras a desafíos complejos. Juntos, combinamos creatividad, habilidades y conocimientos para destacar en todo lo que hacemos..
                            </p>
                        </div>
                        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                            {
                                team.map(({ img, name, oc }, index) => (
                                    <li key={index}>
                                        <div className="flex items-center gap-x-6">
                                            <img className="h-20 w-20 rounded-full" src={img} alt={name} />
                                            <div>
                                                <h3 className="text-2xl font-semibold leading-7 tracking-tight text-white">{name}</h3>
                                                <p className="text-sm font-semibold leading-6 text-custom-green">{oc}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </section>
            }
        </>
    )
}
