import {
    BiLogOut
} from "react-icons/bi";

import avatar from '../../assets/avatar.webp';

import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogoutModal } from '../utils/LogoutModal';
import { useProvider } from "../../context/AuthProvider";
import { Admin, Odontologist, Patient } from "./options";
import { BiMenu } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai'

export const VerticalNavigation = () => {

    const [selected, setSelected] = useState('');
    const location = useLocation();

    const { logout, getUser } = useProvider();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebarOpen = () => {
        setSidebarOpen(true);
    };

    const toggleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleRute = () => {
        setSelected(location.pathname);
    }

    const handleLogout = () => {
        setShowModal(true);
        toggleSidebar();
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleOk = () => {
        logout();
        navigate('/');
    }


    const switchOptions = (rol, selected, toggle) => {
        switch (rol) {
            case 'admin':
                return <Admin selected={selected} toogle={toggle} hiddenMenu={setSidebarOpen} />
                break;
            case 'odontologist':
                return <Odontologist selected={selected} toogle={toggle} hiddenMenu={setSidebarOpen} />
                break;
            case 'patient':
                return <Patient selected={selected} toogle={toggle}  hiddenMenu={setSidebarOpen}/>
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        handleRute();
    }, [location]);


    return (
        <>
            <div className="bg-gray-200">
                <button
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-custom-blue rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 "
                    onClick={toggleSidebarOpen}
                >
                    <BiMenu className="w-6 h-6 text-black" />
                </button>
                <aside
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } sm:translate-x-0`}
                >
                    <aside
                        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            } sm:translate-x-0`}
                    >
                        <button
                            type="button"
                            onClick={toggleSidebarClose}
                            className="text-gray-400 sm:hidden bg-transparent rounded-lg text-sm p-1.5 absolute top-5 right-2 inline-flex items-center" >
                            <AiOutlineCloseCircle className="w-6 h-6 text-custom-grey" />
                        </button>
                        <div className="h-full px-3 py-4 overflow-y-auto bg-custom-blue">
                            <ul className="space-y-2 font-medium">
                                <div className='text-2xl font-bold p-2'>
                                    <div className='-m-1.5 p-1.5 flex items-center'>
                                        <img className='h-8 w-auto mr-2' src={avatar} alt='avatar img' />
                                        <span className='text-white font-bold text-lg'>DENTALTECH</span>
                                    </div>
                                </div>

                                {switchOptions(getUser().rol, selected, toggleSidebar)}
                                <div className="mb-2">
                                    <button type='button' onClick={handleLogout} className="flex text-xl py-2 px-4 rounded hover:bg-custom-green w-full">
                                        <BiLogOut className="mr-4 mb-0 mt-1 text-custom-green" />
                                        <span className="text-white">SALIR</span>
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </aside>
                </aside>
                <div className="p-4 sm:ml-64 min-h-screen">
                    {
                        showModal && <LogoutModal handleCancel={handleCancel} handleOk={handleOk} />
                    }
                    <Outlet />

                </div>
            </div>

        </>
    )
}

