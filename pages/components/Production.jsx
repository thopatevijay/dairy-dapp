import React, { useState } from 'react'

const Production = ({ batchesByProcessor }) => {
    const [activeRow, setActiveRow] = useState(null);

    console.log(batchesByProcessor);

    const handleRowClick = (index) => {
        setActiveRow(index === activeRow ? null : index);
    }

    return (
        <div className="container mx-auto flex justify-between py-5 ">
            <div className="mx-auto">
                <table className="table-auto text-center">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="px-4 py-2 text-sm">Batch Id</th>
                            <th className="px-4 py-2 text-sm">Created Time</th>
                            <th className="px-4 py-2 text-sm">Milk Quantity</th>
                            <th className="px-4 py-2 text-sm">Milk Quality</th>
                            <th className="px-4 py-2 text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batchesByProcessor.length ?
                            (
                                batchesByProcessor.map((batch, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                            className={`bg-white cursor-pointer ${index === activeRow ? 'bg-gray-200' : ''}`}
                                            // onClick={() => handleRowClick(index)}
                                        >
                                            <td className="px-4 py-2 text-xs">{batch.batchId}</td>
                                            <td className="px-4 py-2 text-xs">{batch.batchCreatedTime}</td>
                                            <td className="px-4 py-2 text-xs">{batch.quantity}</td>
                                            <td className="px-4 py-2 text-xs">{batch.quality}</td>
                                            <td className="px-4 py-2 text-xs">
                                                {batch.productionStatus.isInProduction ?
                                                    (
                                                        <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                                                            In Production
                                                        </span>
                                                    ) : (
                                                        <span className="bg-blue-700 text-white px-5 py-1 rounded-full">
                                                            In Processing
                                                        </span>
                                                    )

                                                }
                                            </td>
                                            <td className="px-4 py-2 text-xs">{batch.statusUpdateTime}</td>
                                            {/* <td className="px-4 py-2 text-xs">
                                                {batch.accepted ?
                                                    (
                                                        <span className="text-blue-600 px-5 py-1 rounded-full" >
                                                            Reject
                                                        </span>
                                                    )
                                                    :
                                                    (
                                                        <span className="text-blue-600 px-5 py-1 rounded-full" >
                                                            Accept
                                                        </span>
                                                    )
                                                }
                                            </td> */}
                                        </tr>
                                        {index === activeRow && (
                                            <tr className="bg-gray-100">
                                                <td colSpan={7} className="px-4 py-2 text-xs">
                                                    <span>Collection Id : </span>
                                                    {batch.collectionIds.map((id, index) => {
                                                        return (
                                                            <span key={index}>{id} {","}</span>
                                                        )
                                                    })}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : <tr><td>Batches not found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Production