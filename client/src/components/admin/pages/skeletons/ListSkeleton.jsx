export const ListSkeleton = ({ length }) => {
    return (
        <>
            <tbody>
                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index}>
                            {
                                Array.from({ length: length }).map((_, index) => (
                                    <td key={index} className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div className="h-2.5 bg-gray-300 w-full animate-pulse mb-2.5"></div>
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </>
    )
}