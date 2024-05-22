import { useProvider } from '../../../context/AuthProvider';
import { LoadingLayout } from '../../utils/LoadingLayout'

export const SectionServices = () => {

    const { treatments, loadingTreatment } = useProvider();

    return (
        <>
            {
                loadingTreatment ?
                    <LoadingLayout />
                    :
                    <div className="py-0 px-0 sm:py-10 sm:px-10">
                        <div className="max-w-7xl m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                            <div className="mb-12 space-y-2 text-justify">
                                <h2 className="text-2xl text-custom-blue font-bold md:text-4xl">Nuestros Servicios</h2>
                                <p>Conoce los diferentes servicios que ofrece nuestra clínica odontológica. Nos especializamos en el cuidado integral de tu salud bucal y dental. Nuestro equipo de profesionales altamente calificados está comprometido en brindarte una atención personalizada y de calidad. Entre los servicios que ofrecemos se incluyen:</p>
                            </div>
                            <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
                                {
                                    treatments.map(({ id, nombre, descripcion }) => (
                                        <div key={id}  className="p-1 rounded-xl group sm:flex space-x-6 bg-white shadow-xl hover:rounded-2xl">
                                            <div className="pl-0 p-5">
                                                <div className="space-y-2 px-10">
                                                    <div className="space-y-4">
                                                        <h4 className="text-xl lg:text-2xl font-semibold text-cyan-900 text-justify">{nombre}</h4>
                                                        <p className="text-xp lg:text-xl  text-gray-600 text-justify">{descripcion}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
            }

        </>
    )
}