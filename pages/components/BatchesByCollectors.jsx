import React, { useState } from 'react'
import { useProcessor } from './hooks/useProcessor';

const BatchesByCollectors = ({ batchesByCollectors }) => {
  const [activeRow, setActiveRow] = useState(null);
  const { acceptCollectorBatch, createBatchForProcessing, getAcceptedBatches } = useProcessor();

  const handleRowClick = (index) => {
    setActiveRow(index === activeRow ? null : index);
  }

  return (
    <div className="container mx-auto flex justify-between py-5 ">
      <div className="mx-auto">
        {getAcceptedBatches.length ?
          <div className="left flex gap-3" onClick={createBatchForProcessing}>
            <button className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800">
              Create Batch <span className='px-1'></span>
            </button>
          </div>
          : null}
        <table className="table-auto text-center">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 text-sm">Collector Id</th>
              <th className="px-4 py-2 text-sm">Batch Id</th>
              <th className="px-4 py-2 text-sm">Created Time</th>
              <th className="px-4 py-2 text-sm">Milk Quantity</th>
              <th className="px-4 py-2 text-sm">Milk Quality</th>
              <th className="px-4 py-2 text-sm">Status</th>
              <th className="px-4 py-2 text-sm">Status update time</th>
              <th className="px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {batchesByCollectors.length ?
              (
                batchesByCollectors.map((batch, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={`bg-white cursor-pointer ${index === activeRow ? 'bg-gray-200' : ''}`}
                    // onClick={() => handleRowClick(index)}
                    >
                      <td className="px-4 py-2 text-xs">{batch.collectorId}</td>
                      <td className="px-4 py-2 text-xs">{batch.batchId}</td>
                      <td className="px-4 py-2 text-xs">{batch.batchCreatedTime}</td>
                      <td className="px-4 py-2 text-xs">{batch.quantity}</td>
                      <td className="px-4 py-2 text-xs">{batch.quality}</td>
                      <td className="px-4 py-2 text-xs">
                        {batch.accepted ?
                          (
                            <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                              Accepted
                            </span>
                          ) : (
                            <span className="bg-red-700 text-white px-5 py-1 rounded-full">
                              Not Accepted
                            </span>
                          )

                        }
                      </td>
                      <td className="px-4 py-2 text-xs">{batch.statusUpdateTime}</td>
                      <td className="px-4 py-2 text-xs">
                        {batch.accepted ?
                          (
                            <span className="text-blue-600 px-5 py-1 rounded-full"
                              onClick={() => acceptCollectorBatch(batch.batchId, false)}>
                              Reject
                            </span>
                          )
                          :
                          (
                            <span className="text-blue-600 px-5 py-1 rounded-full"
                              onClick={() => acceptCollectorBatch(batch.batchId, true)}>
                              Accept
                            </span>
                          )
                        }
                      </td>
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

export default BatchesByCollectors