import React, { useState } from 'react'
import { sendToProduction, markProductionDone, sendToDistributor } from '../../database/milk-processor.controller';

const Production = ({ batchesByProcessor }) => {
    const [activeRow, setActiveRow] = useState(null);

    const handleRowClick = (index) => {
        setActiveRow(index === activeRow ? null : index);
    }

    const handleSendToProduction = async (batchId, isInProduction, quantity, quality) => {
        try {
            const res = await sendToProduction(batchId, isInProduction, quantity, quality);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const handleMarkProductionDone = async (batchId, isProductionDone, quantity, quality) => {
        try {
            const res = await markProductionDone(batchId, isProductionDone, quantity, quality);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendToDistributor = async (batchId, isSentToDistributor) => {
        try {
            const res = await sendToDistributor(batchId, isSentToDistributor);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    function RenderStatusAndActions({ batch }) {
        const { inProductionStatus, productionDoneStatus, moveToDistributorStatus } = batch.productionStatus;
        const { atDistributorStatus, moveToRetailerStatus } = batch.distributorStatus;
        const retailerStatus = batch.retailerStatus;

        if (retailerStatus.accepted) {
            return (
                <span className="bg-red-500 text-white px-5 py-1 rounded-full">
                    Accepted by  Retailer
                </span>
            );
        } else if (moveToRetailerStatus.isSentToRetailer) {
            return (
                <span className="bg-red-500 text-white px-5 py-1 rounded-full">
                    Sent to Retailer
                </span>
            );
        } else if (atDistributorStatus.accepted) {
            return (
                <span className="bg-red-500 text-white px-5 py-1 rounded-full">
                    Accepted by Distributor
                </span>
            );
        } else if (moveToDistributorStatus.isSentToDistributor) {
            return (
                <span className="bg-blue-500 text-white px-5 py-1 rounded-full">
                    Sent to Distributor
                </span>
            );
        } else if (productionDoneStatus.isProductionDone) {
            return (
                <>
                    <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                        Production Done
                    </span>
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => handleSendToDistributor(batch.batchId, true)} >
                        Send To Distributor
                    </span>
                </>
            );
        } else if (inProductionStatus.isInProduction) {
            return (
                <>
                    <span className="bg-blue-500 text-white px-5 py-1 rounded-full">
                        In Production
                    </span>
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => handleMarkProductionDone(batch.batchId, true, batch.quantity, batch.quality)} >
                        Mark Production Done
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <span className="bg-yellow-500 text-white px-5 py-1 rounded-full">
                        In Processing
                    </span>
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => handleSendToProduction(batch.batchId, true, batch.quantity, batch.quality)}>
                        Send To Production
                    </span>
                </>
            );
        }
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
                                                < RenderStatusAndActions batch={batch} />
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