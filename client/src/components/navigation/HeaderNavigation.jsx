import avatar from '../../assets/avatar.webp';
import { Link, Outlet } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { useState } from 'react';
import { Dialog } from '@headlessui/react'
import { AiOutlineCloseCircle ,AiOutlineMenu} from 'react-icons/ai'

const links = [
    {
        to: 'home',
        label: 'Inicio'
    },
    {
        to: 'features',
        label: 'Caracteristicas'
    },
    {
        to: 'about-us',
        label: 'Sobre nosotros'
    },
]

export const HeaderNavigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header>
                <nav className=" border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center">
                            <img src={avatar} className="mr-3 h-6 sm:h-9" alt="dentaltech Logo" />
                            <span className="uppercase self-center text-xl font-semibold whitespace-nowrap text-white">
                                dentaltech
                            </span>
                        </div>
                        <div className="flex items-center lg:order-2">
                            <Link
                                to='login'
                                className="hidden sm:block md:block lg:block text-white hover:bg-green-200 bg-custom-green focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">
                                Iniciar Sesion
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <AiOutlineMenu className="lg:hidden xl:hidden w-6 h-6 text-white"/>
                            </button>
                            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                                <div className="fixed inset-0 z-10" />
                                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-custom-green px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <AiOutlineCloseCircle className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="mt-6 flow-root">
                                        <div className="-my-6 divide-y divide-gray-500/10">
                                            <div className="space-y-2 py-6">
                                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                                    {
                                                        links.map(({ to, label }, index) => (
                                                            <LinkScroll
                                                                key={index}
                                                                to={to} spy={true} smooth={true} offset={0} duration={300}
                                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 "
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {label}
                                                            </LinkScroll>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Dialog>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                {
                                    links.map(({ to, label }, index) => (
                                        <LinkScroll
                                            key={index}
                                            to={to} spy={true} smooth={true} offset={0} duration={300}
                                            className='block py-2 pr-4 pl-3 text-gray-400 hover:text-white cursor-pointer'
                                        >
                                            {label}
                                        </LinkScroll>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    )
}