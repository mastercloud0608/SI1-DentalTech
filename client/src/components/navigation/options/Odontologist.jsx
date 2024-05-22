import { Link } from 'react-router-dom';

import {
    AiOutlineUser,
    AiOutlineFieldTime
} from "react-icons/ai";

import {
    BiPackage,
} from "react-icons/bi";

import {
    GiMedicines,
} from "react-icons/gi";


const links = [
    {
        to: '/odontologist/patients',
        label: 'PACIENTES',
        icon: AiOutlineUser
    },
    {
        to: '/odontologist/quotes',
        label: 'CITAS',
        icon: AiOutlineFieldTime
    },
    // {
    //     to: '/odontologist/medicament',
    //     label: 'MEDICAMENTOS',
    //     icon: GiMedicines
    // },
    // {
    //     to: '/odontologist/supplies',
    //     label: 'SUMINISTROS',
    //     icon: BiPackage
    // },
]

export const Odontologist = ({ selected, toogle }) => {
    return (
        <>
            {
                links.map((link, index) => (
                    <li key={index} className="mb-2">
                        <Link
                            to={link.to}
                            onClick={toogle}
                            className={`flex text-xl py-2 px-4 rounded ${selected === link.to ? 'bg-custom-green' : 'hover:bg-custom-green w-full'} `}>
                            <link.icon className={`mr-4 mb-0 mt-1 ${selected === link.to ? "text-custom-blue" : "text-custom-green"}`} />
                            <span className="text-white">{link.label}</span>
                        </Link>
                    </li>
                ))
            }
        </>
    )
}