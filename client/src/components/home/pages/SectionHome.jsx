import home from '../../../assets/home.webp';
import { Link } from 'react-router-dom';

export const SectionHome = () => {

    return (
        <>
            <section id='home'>
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white uppercase">RESERVA TODAS TUS CITAS, MANTÉN TUS FACTURAS DE ATENCIÓN DENTAL EN UN SOLO LUGAR</h1>
                        <p className="max-w-2xl mb-6 font-light text-custom-green lg:mb-8 md:text-lg lg:text-xl">
                            Descubre cómo nuestra clínica odontológica puede ayudarte a cuidar de tu salud dental.
                        </p>
                        <Link to='/login' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:bg-custom-rose hover:text-custom-blue focus:ring-4 focus:ring-gray-100 text-white">
                            Iniciar sesion
                        </Link>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img className='rounded-full' src={home} alt="odontologa" />
                    </div>
                </div>
            </section>
        </>
    )
}