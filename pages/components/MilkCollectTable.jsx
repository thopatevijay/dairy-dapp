const MilkCollectTable = ({ milkCollections, getMilkDataError }) => {
    return (
        <div>
            {milkCollections.length ?
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-200">Farmer Id</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-200">Farmer Name</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-200">Milk Quality</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-200">Milk Quality</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-200">Date</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-200">
                        {milkCollections && milkCollections.map((milkCollectionRow, index) => {
                            return (
                                <tr key={index} className="bg-gray-10 text-center">
                                    <td className="px-16 py-2">
                                        <span>{milkCollectionRow.farmerId}</span>
                                    </td>
                                    <td className="px-16 py-2">
                                        <span>{milkCollectionRow.farmerName}</span>
                                    </td>
                                    <td className="px-16 py-2">
                                        <span>{milkCollectionRow.quality}</span>
                                    </td>
                                    <td className="px-16 py-2">
                                        <span>{milkCollectionRow.quantity}</span>
                                    </td>
                                    <td className="px-16 py-2">
                                        <span>{milkCollectionRow.timestamp}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : "...fetching milk collections "}
        </div>

    )
}

export default MilkCollectTable;
