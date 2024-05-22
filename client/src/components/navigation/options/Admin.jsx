import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import {
    AiOutlineUser,
    AiOutlineHome
} from "react-icons/ai";

import {
    BiPackage,
} from "react-icons/bi";

import {
    TbFileInvoice
} from "react-icons/tb";

import {
    RiServiceLine
} from "react-icons/ri";

import {
    GiMedicines
} from "react-icons/gi";

import {
    TfiAgenda
} from 'react-icons/tfi';

const links = [
    {
        to: '/admin/dashboard',
        label: 'DASHBOARD',
        icon: AiOutlineHome
    },
    {
        to: '/admin/users',
        label: 'USUARIOS',
        icon: AiOutlineUser
    },
    {
         to: '/admin/diary',
         label: 'AGENDAS',
         icon: TfiAgenda
    },
    {
     to: '/admin/supplies',
         label: 'SUMINISTROS',
         icon: BiPackage
    },
    {
         to: '/admin/reports',
         label: 'REPORTES',
         icon: TbFileInvoice
     },
     {
         to: '/admin/treatments',
         label: 'TRATAMIENTOS',
         icon: RiServiceLine
     },
     {
         to: '/admin/medicines',
         label: 'MEDICAMENTOS',
         icon: GiMedicines
     }
]

export const Admin = ({ selected, toogle, hiddenMenu }) => {


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 0) {
                hiddenMenu(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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
