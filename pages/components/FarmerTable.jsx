const FarmerTable = ({ farmers, error }) => {
    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Farmer Id</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Farmer Name</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {farmers && farmers.map((farmerRow, index) => {
                    return (
                        <tr key={index} className="bg-gray-10 text-center">
                            <td className="px-16 py-2">
                                <span>{farmerRow.farmerId}</span>
                            </td>
                            <td className="px-16 py-2">
                                <span>{farmerRow.name}</span>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default FarmerTable;
