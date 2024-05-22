export const SkeletonCardStadistics = () => {
    return (
        <>
            <div className="flex mx-auto py-2 px-4 sm:px-6 lg:px-8 lg:py-8">
                <div className="relative w-60 p-4 overflow-hidden bg-white shadow-lg animate-pulse rounded-2xl">
                    <div className="flex flex-row items-center">
                        <div className="w-4/8 mr-2">
                            <div className="w-32 h-3 bg-gray-200 rounded-full mb-5 mt-2"></div>
                            <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}