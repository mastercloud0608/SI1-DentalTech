import { Link } from 'react-router-dom';

import {
    AiOutlineUser,
    AiOutlineFieldTime
} from "react-icons/ai";

import {
    MdMiscellaneousServices,
    MdMedicationLiquid
} from "react-icons/md";

import {
    TbFileInvoice
} from "react-icons/tb"

const links = [
    {
        to: '/patient/profile',
        label: 'PERFIL',
        icon: AiOutlineUser
    },
    // {
    //     to: '/patient/quote',
    //     label: 'CREAR CITA',
    //     icon: AiOutlineFieldTime
    // },
    // {
    //     to: '/patient/services',
    //     label: 'SERVICIOS',
    //     icon: MdMiscellaneousServices
    // },
    // {
    //     to: '/patient/invoice',
    //     label: 'FACTURACION',
    //     icon: TbFileInvoice
    // },
]


export const Patient = ({ selected,toogle }) => {
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
            {/* <li className="mb-2">
                <Link to='/patient/treatment' className={`flex text-xl py-2 px-4 rounded ${selected === '/patient/treatment' ? 'bg-custom-green' : 'hover:bg-custom-green w-full'} `}>
                    <MdMedicationLiquid className={`mr-4 mb-0 mt-1 ${selected === '/patient/treatment' ? "text-custom-blue" : "text-custom-green"}`} />
                    <span className="text-white uppercase">Tratamientos</span>
                </Link>
            </li> */}
        </>
    )
}


