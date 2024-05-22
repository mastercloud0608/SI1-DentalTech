import { FcBullish } from "react-icons/fc";

export const CardStadisticQuoteDay = () => {
    return (
        <>
            <div className="flex mx-auto py-2 px-4 sm:px-6 lg:px-8 lg:py-8">
                <div className="relative w-60 p-4 overflow-hidden bg-white shadow-lg rounded-2xl">
                    <div className="flex flex-row items-center">
                        <div className="w-4/8 mr-2">
                            <p className="text-xm font-medium text-gray-400">
                                Citas del dia
                            </p>
                            <p className="mb-2 text-lg font-medium text-gray-800">
                                50
                            </p>
                        </div>
                        <FcBullish className="w-10 h-10 ml-auto mr-auto" />
                    </div>
                </div>
            </div>

        </>
    )
}