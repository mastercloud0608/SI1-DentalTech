import { Link as LinkScroll } from 'react-scroll';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { SiAmazonaws } from 'react-icons/Si';
import { GrArchlinux } from 'react-icons/gr';


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


const icons = [
    {
        icon: AiFillGithub,
    },
    {
        icon: SiAmazonaws,
    },
    {
        icon: AiFillLinkedin,
    },
    {
        icon: GrArchlinux,
    },
]

export const SectionFooter = () => {
    return (
        <>
            <footer className="w-full py-8">
                <hr className="border-t border-custom-grey my-4" />
                <div className="max-w-screen-xl px-4 mx-auto">
                    <ul className="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
                        {
                            links.map(({ to, label }, index) => (
                                <LinkScroll
                                    key={index}
                                    to={to} spy={true} smooth={true} offset={0} duration={300}
                                    className="-mx-3 block rounded-lg px-3 cursor-pointer  py-2 text-base font-semibold leading-7 text-gray-400  hover:text-white"
                                >
                                    {label}
                                </LinkScroll>
                            ))
                        }
                    </ul>
                    <div className="pt-8 flex max-w-xs mx-auto items-center justify-between">
                        {
                            icons.map((Icon, index) => (
                                <Icon.icon key={index} className="text-gray-400 transition-colors text-2xl duration-200 hover:text-white" />
                            ))
                        }
                    </div>
                    <div className="text-center text-gray-400 pt-10 sm:pt-12 font-light flex items-center justify-center">
                        © 2023 DENTALTECH, Inc. Todos los Derechos Reservados.
                    </div>
                </div>
            </footer>

        </>
    )
}