import React, { useState } from 'react'
import { RenderStatusAndActions } from './RenderStatusAndActions';

const Production = ({ batchesByProcessor, isProcessor, isDistributor }) => {
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
                                                < RenderStatusAndActions batch={batch} isProcessor={isProcessor} isDistributor={isDistributor}/>
                                            </td>
                                            <td className="px-4 py-2 text-xs" onClick={() => handleRowClick(index)}>
                                                <span className="text-blue-600 px-5 py-1 rounded-full" >
                                                    See history
                                                </span>
                                            </td>
                                        </tr>
                                        {index === activeRow && (
                                            <tr className="bg-gray-100">
                                                <td colSpan={7} className="px-4 py-2 text-xs">
                                                    <div>
                                                        <div className="flex justify-center">
                                                            <span className="inline-block leading-1 font-medium text-blue-500">
                                                                Processing finished time :
                                                            </span>
                                                            <span className="inline-block leading-1 ml-1 font-medium text-blue-500">
                                                                11:01:09 AM : 26/01/2023
                                                            </span>
                                                        </div>
                                                        <div className='mt-2 '>
                                                            <div className="flex justify-center">
                                                                <span className="inline-block leading-1 font-medium text-[#a68383]">
                                                                    Production started time :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#a68383]">
                                                                    11:01:09 AM : 26/01/2023
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-center">
                                                                <span className="inline-block leading-1 font-medium text-[#a68383] ml-12">
                                                                    Quantity :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#a68383]">
                                                                    100
                                                                </span>
                                                                <span className="inline-block leading-1 font-medium text-[#a68383] ml-12">
                                                                    Quality :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#a68383]">
                                                                    100
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <div className="flex justify-center">
                                                                <span className="inline-block leading-1 font-medium text-[#224040]">
                                                                    Production finished time :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#224040]">
                                                                    11:01:09 AM : 26/01/2023
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-center">
                                                                <span className="inline-block leading-1 font-medium text-[#224040] ml-12">
                                                                    Quantity :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#224040]">
                                                                    100
                                                                </span>
                                                                <span className="inline-block leading-1 font-medium text-[#224040] ml-12">
                                                                    Quality :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#224040]">
                                                                    100
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                            <div className="flex justify-center">
                                                                <span className="inline-block leading-1 font-medium text-[#8465c7]">
                                                                    Sent to distributor time :
                                                                </span>
                                                                <span className="inline-block leading-1 ml-1 font-medium text-[#8465c7]">
                                                                    11:01:09 AM : 26/01/2023
                                                                </span>
                                                            </div>
                                                        </div>
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