import React from 'react'
import { useRouter } from "next/router";

const Timeline = ({ batchId, productionStatus, distributorStatus, retailerStatus }) => {
    const { inProductionStatus, productionDoneStatus, moveToDistributorStatus } = productionStatus;
    const { atDistributorStatus, moveToRetailerStatus } = distributorStatus;
    const router = useRouter();

    return (
        <div>
            <ol className="border-l-2 border-gray-400 ml-16 mt-4">
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${inProductionStatus.isInProduction ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Processing finished</h4>
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {inProductionStatus.updatedTime}
                        </a>
                    </div>
                </li>
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${inProductionStatus.isInProduction ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Production started</h4>
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {inProductionStatus.updatedTime}
                        </a>
                        <p className="text-gray-700 mt-2">Quantity : {inProductionStatus.quantity}</p>
                        <p className="text-gray-700 mt-1">Quality : {inProductionStatus.quality}</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${productionDoneStatus.isProductionDone ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Production finished</h4>
                        {productionDoneStatus.isProductionDone &&
                            <span className="text-blue-600 px-5 -mt-2 ml-10 rounded-full cursor-pointer"
                                onClick={() => router.push(`/BatchId/${batchId}`)}
                            >
                                See product codes
                            </span>
                        }
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {productionDoneStatus.updatedTime}
                        </a>
                        <p className="text-gray-700 mt-2">Quantity : {productionDoneStatus.quantity}</p>
                        <p className="text-gray-700 mt-1">Quality : {productionDoneStatus.quantity}</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${moveToDistributorStatus.isSentToDistributor ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Sent to distributor</h4>
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {moveToDistributorStatus.updatedTime}
                        </a>
                    </div>
                </li>
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${atDistributorStatus.accepted ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Accepted by distributor</h4>
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {atDistributorStatus.updatedTime}
                        </a>
                        <p className="text-gray-700 mt-2">Quantity : {atDistributorStatus.quantity}</p>
                        <p className="text-gray-700 mt-1">Quality : {atDistributorStatus.quantity}</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${moveToRetailerStatus.isSentToRetailer ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Sent to retailer</h4>
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {moveToRetailerStatus.updatedTime}
                        </a>
                    </div>
                </li>
                <li>
                    <div className="flex flex-start items-center">
                        <div className={`${retailerStatus.accepted ? `bg-green-600` : `bg-gray-400`} w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2`}></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Accepted by retailer</h4>
                    </div>
                    <div className="ml-6 mb-6 ">
                        <a className="text-blue-600 hover:text-blue-700 
                        focus:text-blue-800 duration-300 transition ease-in-out text-xs">
                            {retailerStatus.updatedTime}
                        </a>
                        <p className="text-gray-700 mt-2">Quantity : {retailerStatus.quantity}</p>
                        <p className="text-gray-700 mt-1">Quality : {retailerStatus.quantity}</p>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default Timeline