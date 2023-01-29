import React, { useState } from 'react'
import { RenderStatusAndActions } from './RenderStatusAndActions';
import Timeline from './Timeline';

const Production = ({ batchesByProcessor, isProcessor, isDistributor, isRetailer }) => {
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
                            <th className="px-4 py-2 text-sm">Batch Id</th>
                            <th className="px-4 py-2 text-sm">Created Time</th>
                            <th className="px-4 py-2 text-sm">Milk Quantity</th>
                            <th className="px-4 py-2 text-sm">Milk Quality</th>
                            <th className="px-4 py-2 text-sm">Status / Action</th>
                            <th className="px-4 py-2 text-sm">History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batchesByProcessor.length ?
                            (
                                batchesByProcessor.map((batch, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                            className={`bg-white cursor-pointer ${index === activeRow ? 'bg-gray-200' : ''}`}>
                                            <td className="px-4 py-2 text-xs">{batch.batchId}</td>
                                            <td className="px-4 py-2 text-xs">{batch.batchCreatedTime}</td>
                                            <td className="px-4 py-2 text-xs">{batch.quantity}</td>
                                            <td className="px-4 py-2 text-xs">{batch.quality}</td>
                                            <td className="px-4 py-2 text-xs">
                                                < RenderStatusAndActions batch={batch}
                                                    isProcessor={isProcessor} isDistributor={isDistributor} isRetailer={isRetailer}
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-xs" onClick={() => handleRowClick(index)}>
                                                <span className="text-blue-600 px-5 py-1 rounded-full" >
                                                    See history
                                                </span>
                                            </td>
                                        </tr>
                                        {index === activeRow && (
                                            <tr className='ml-8'>
                                                <td colSpan={7} className="px-4 py-2 text-xs text-left">
                                                    <div>
                                                        <Timeline
                                                            productionStatus={batch.productionStatus}
                                                            distributorStatus={batch.distributorStatus}
                                                            retailerStatus={batch.retailerStatus}
                                                        />
                                                    </div>
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