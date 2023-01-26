import { contractInstance } from "../pages/utils/ethers";

export const updateCollectorBatchStatus = async (batchId, newStatus) => {
    try {
        let txn = await contractInstance.updateMilkCollectorBatchStatus(batchId, newStatus);
        return txn;
    } catch (error) {
        console.error(error)
        return error;
    }
}

export const createProcessorBatch = async (collectorBatchesIds, quantity, quality) => {
    try {
        console.log(collectorBatchesIds);
        console.log(quantity);
        console.log(quality);
        const txn = await contractInstance.createProcessorBatch(collectorBatchesIds, quantity, quality);
        return txn;
    } catch (error) {

    }
}

export async function getAllProcessorsBatches() {
    try {
        const batchCount = await contractInstance.processorBatchIdCounter();
        let batches = [];

        for (let i = 1; i < batchCount; i++) {
            const batch = await contractInstance.processorBatches(i);

            batches.push(batch);
        }
        const convertBatchesToArrayOfJS = batches.map(batch => {
            const inProductionArray = batch[4][0];
            const productionDoneArray = batch[4][1];
            const moveToDistributorArray = batch[4][2];

            const inProductionStatus = {
                isInProduction: inProductionArray[0],
                quantity: inProductionArray[1].toString(),
                quality: inProductionArray[2].toString(),
                updatedTime: inProductionArray[3].toString(),
            }

            const productionDoneStatus = {
                isProductionDone: productionDoneArray[0],
                quantity: productionDoneArray[1].toString(),
                quality: productionDoneArray[2].toString(),
                updatedTime: productionDoneArray[3].toString(),
            }

            const moveToDistributorSattus = {
                isSentToDistributor: moveToDistributorArray[0],
                updatedTime: moveToDistributorArray[1].toString(),
            }

            const atDistributorArray = batch[5][0];
            const moveToRetailerArray = batch[5][1];

            const atDistributorStatus = {
                accepted: atDistributorArray[0],
                quantity: atDistributorArray[1].toString(),
                quality: atDistributorArray[2].toString(),
                updatedTime: atDistributorArray[3].toString(),
            }

            const moveToRetailerStatus = {
                isSentToRetailer: moveToRetailerArray[0],
                updatedTime: moveToRetailerArray[1].toString(),
            }

            const retailerUpdateArray = batch[6];
            const retailerStatus = {
                accepted: retailerUpdateArray[0],
                quantity: retailerUpdateArray[1].toString(),
                quality: retailerUpdateArray[2].toString(),
                updatedTime: retailerUpdateArray[3].toString(),
            }

            return {
                batchId: batch[0].toString(),
                batchCreatedTime: batch[1].toString(),
                quantity: batch[2].toString(),
                quality: batch[3].toString(),
                productionStatus: {
                    inProductionStatus,
                    productionDoneStatus,
                    moveToDistributorSattus
                },
                distributorStatus: {
                    atDistributorStatus,
                    moveToRetailerStatus
                },
                retailerStatus,
            }
        });

        return convertBatchesToArrayOfJS;
    } catch (error) {
        return { Error: error }
    }
}

export async function getProcessorBatchCollectionIds(batchId) {
    try {
        const batch = await contractInstance.getProcessorBatchCollectionIds(batchId);
        const collectionIds = batch.map(id => id.toNumber());
        return collectionIds;
    } catch (error) {
        return { Error: error }
    }
}