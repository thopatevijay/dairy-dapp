import React, { useState } from 'react'

const MilkCollectorBatches = ({ batches }) => {

    const [activeRow, setActiveRow] = useState(null);

    const handleRowClick = (index) => {
        setActiveRow(index === activeRow ? null : index);
    }

    return (
        <div className="container mx-auto flex justify-between py-5 ">
            <div className="mx-auto">
                <table className="table-auto text-center">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="px-4 py-2">Batch Id</th>
                            <th className="px-4 py-2">Created Time</th>
                            <th className="px-4 py-2">Milk Quantity</th>
                            <th className="px-4 py-2">Milk Quality</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Status update time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batches.length ?
                            (
                                batches.map((batch, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                            className={`bg-white cursor-pointer ${index === activeRow ? 'bg-gray-200' : ''}`}
                                            onClick={() => handleRowClick(index)}
                                        >
                                            <td className="px-4 py-2">{batch.batchId}</td>
                                            <td className="px-4 py-2">{batch.batchCreatedTime}</td>
                                            <td className="px-4 py-2">{batch.quantity}</td>
                                            <td className="px-4 py-2">{batch.quality}</td>
                                            <td className="px-4 py-2">
                                                {batch.accepted ?
                                                    (
                                                        <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                                                            Accepted
                                                        </span>
                                                    ) : (
                                                        <span className="bg-red-500 text-white px-5 py-1 rounded-full">
                                                            Not Accepted
                                                        </span>
                                                    )

                                                }
                                            </td>
                                            <td className="px-4 py-2">{batch.statusUpdateTime}</td>
                                        </tr>
                                        {index === activeRow && (
                                            <tr className="bg-gray-100">
                                                <td colSpan={7} className="px-4 py-2">
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

export default MilkCollectorBatches