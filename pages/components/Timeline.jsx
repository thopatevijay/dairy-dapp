import React from 'react'

const Timeline = ({ productionStatus, distributorStatus, retailerStatus }) => {
    const { inProductionStatus, productionDoneStatus, moveToDistributorStatus } = productionStatus;
    const { atDistributorStatus, moveToRetailerStatus } = distributorStatus;

    return (
        <div>
            <ol className="border-l-2 border-blue-600 ml-16 mt-4">
                <li>
                    <div className="flex flex-start items-center">
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
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
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
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
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
                        <h4 className="text-gray-800 font-semibold text-xs -mt-2">Production finished</h4>
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
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
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
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
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
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
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
                        <div className="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2"></div>
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