import features from '../../../assets/features.webp';

export const SectionFeatures = () => {
    return (
        <>
            <section id='features'>
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img className="w-full rounded-3xl" src={features} alt="features image" />
                    <img className="w-full hidden rounded-3xl" src={features} alt="features image" />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
                            Potenciado por tecnologías de vanguardia
                        </h2>
                        <p className="mb-6 font-light md:text-lg text-gray-400">
                            Nuestro sistema de informacion de la clínica odontológica,fue desarrollada utilizando el stack PERN (PostgreSQL, Express, React y Node). Estas tecnologías de vanguardia se combinan para brindarte una experiencia de usuario fluida y una plataforma confiable.Utilizamos AWS(Amazon Web Services) como servidor en la nube para nuestro backend,y para el frontend usamos el hosting gratuito de FIREBASE(Software as a Service).
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}