import React from 'react'
import { useConsumerTimeLine } from './hooks/useConsumerTimeLine'

const ConsumerTimeLine = ({ productId }) => {
    const { searchResults } = useConsumerTimeLine({ productId });
    return (
        <>
            <ol className="border-l-2 border-gray-400">
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between mb-4">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Batch Id : {searchResults?.batchId}
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.batchCreatedTime}
                                </a>
                            </div>
                            <div className="flex justify-between ">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Quality : {searchResults?.quality}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Processing finished
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.productionStatus?.inProductionStatus.updatedTime}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-600 w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between mb-4">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Production started
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.productionStatus?.inProductionStatus.updatedTime}
                                </a>
                            </div>
                            <div className="flex justify-between ">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Quality : {searchResults?.productionStatus?.inProductionStatus.quality}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-600 w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between mb-4">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Production finished
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.productionStatus?.productionDoneStatus.updatedTime}
                                </a>
                            </div>
                            <div className="flex justify-between ">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Quality : {searchResults?.productionStatus?.productionDoneStatus.quality}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-600 w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Sent to distributor
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.productionStatus?.moveToDistributorStatus.updatedTime}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-600 w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between mb-4">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Accepted by distributor
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.distributorStatus?.atDistributorStatus.updatedTime}
                                </a>
                            </div>
                            <div className="flex justify-between ">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Quality : {searchResults?.distributorStatus?.atDistributorStatus.quality}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-600 w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Sent to retailer
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.distributorStatus?.moveToRetailerStatus.updatedTime}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="md:flex flex-start mb-10">
                        <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                className="text-white w-3 h-3" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
                                48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 
                                16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 
                                16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 
                                112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </div>
                        <div className="min-w-1000 w-full block p-6 rounded-lg shadow-lg bg-gray-100 ml-6 mb-10">
                            <div className="flex justify-between mb-4">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Accepted by retailer
                                </a>
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm ml-10">
                                    {searchResults?.retailerStatus?.updatedTime}
                                </a>
                            </div>
                            <div className="flex justify-between ">
                                <a className="font-medium text-gray-600 hover:text-purple-700 
                                focus:text-purple-800 duration-300 transition ease-in-out text-sm">
                                    Quality : {searchResults?.retailerStatus?.quality}
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
        </>
    )
}

export default ConsumerTimeLine