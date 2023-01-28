import { useDistributor } from "./hooks/useDistributor";
import { useRetailer } from "./hooks/useRetailer";
import { useProcessor } from "./hooks/useProcessor";

export const RenderStatusAndActions = ({ batch, isProcessor, isDistributor, isRetailer }) => {
    const { acceptBatchByProcessor, sentToRetailer } = useDistributor();
    const { acceptBatchByDistributor } = useRetailer();
    const { handleSendToProduction, handleMarkProductionDone, handleSendToDistributor } = useProcessor();
    const { inProductionStatus, productionDoneStatus, moveToDistributorStatus } = batch.productionStatus;
    const { atDistributorStatus, moveToRetailerStatus } = batch.distributorStatus;
    const retailerStatus = batch.retailerStatus;

    if (retailerStatus.accepted) {
        return (
            <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                Accepted by  Retailer
            </span>
        );
    } else if (moveToRetailerStatus.isSentToRetailer) {
        return (
            <>
                <span className="bg-blue-500 text-white px-5 py-1 rounded-full">
                    Awaiting Retailer acceptance
                </span>
                {isRetailer &&
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => acceptBatchByDistributor(
                            batch.batchId, true, batch.quantity, batch.quality)
                        } >
                        Accept Batch
                    </span>
                }
            </>

        );
    } else if (atDistributorStatus.accepted) {
        return (
            <>
                <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                    Accepted by Distributor
                </span>
                {isDistributor &&
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => sentToRetailer(batch.batchId, true)} >
                        Send To Retailer
                    </span>
                }
            </>
        );
    } else if (moveToDistributorStatus.isSentToDistributor) {
        return (
            <>
                <span className="bg-blue-500 text-white px-5 py-1 rounded-full">
                    Awaiting Distributor acceptance
                </span>
                {isDistributor &&
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => acceptBatchByProcessor(batch.batchId, true, batch.quantity, batch.quality)} >
                        Accept Batch
                    </span>
                }
            </>
        );
    } else if (productionDoneStatus.isProductionDone) {
        return (
            <>
                <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                    Production Done
                </span>
                {isProcessor &&
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => handleSendToDistributor(batch.batchId, true)} >
                        Send To Distributor
                    </span>
                }
            </>
        );
    } else if (inProductionStatus.isInProduction) {
        return (
            <>
                <span className="bg-blue-500 text-white px-5 py-1 rounded-full">
                    In Production
                </span>
                {isProcessor &&
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => handleMarkProductionDone(batch.batchId, true, batch.quantity, batch.quality)} >
                        Mark Production Done
                    </span>
                }
            </>
        );
    } else {
        return (
            <>
                <span className="bg-yellow-500 text-white px-5 py-1 rounded-full">
                    In Processing
                </span>
                {isProcessor &&
                    <span className="text-blue-600 px-5 py-1 rounded-full"
                        onClick={() => handleSendToProduction(batch.batchId, true, batch.quantity, batch.quality)}>
                        Send To Production
                    </span>
                }
            </>
        );
    }
}

