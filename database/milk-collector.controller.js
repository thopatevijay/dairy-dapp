import { contractInstance } from "../pages/utils/ethers"

export async function collectMilk(req, res) {
    try {
        const data = req.body;
        console.log(data);

        let txn = await contractInstance.collectMilk(data.milkCollectorId, data.farmerId, data.milkQuantity, data.milkQuality);
        res.status(200).json(txn);
    } catch (error) {
        console.error(error)
        res.status(404).json({ error: "Error ..." });
    }
}

export async function getAllCollctedMilk(req, res) {
    try {
        const milkCollectionCount = await contractInstance.milkCollectionCounter();
        let milkCollections = [];

        for (let i = 1; i < milkCollectionCount; i++) {
            const milkCollection = await contractInstance.milkCollections(i);

            milkCollections.push(milkCollection);
        }

        const convertMilkCollectionsToArrayOfJS = milkCollections = milkCollections.map((collection, index) => {
            return {
                collectionId: index + 1,
                milkCollectorId: collection[0].toString(),
                farmerId: collection[1].toString(),
                quantity: collection[2].toString(),
                quality: collection[3].toString(),
                timestamp: collection[4].toString()
            }
        });
        res.status(200).json(convertMilkCollectionsToArrayOfJS);
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}

export async function getAllBatches() {
    try {
        const batchCount = await contractInstance.collectorBatchIdCounter();
        let batches = [];

        for (let i = 1; i < batchCount; i++) {
            const batch = await contractInstance.collectorBatches(i);

            batches.push(batch);
        }
        const convertBatchesToArrayOfJS = batches.map(batch => {
            return {
                batchId: batch[0].toString(),
                collectorId: batch[1].toString(),
                batchCreatedTime: batch[2].toString(),
                quantity: batch[3].toString(),
                quality: batch[4].toString(),
                accepted: batch[5],
                statusUpdateTime: batch[6].toString(),
            }
        });
        return convertBatchesToArrayOfJS;
    } catch (error) {
        return {Error : error}
    }
}

export async function getBatchCollectionIds(batchId) {
    try {
        const batch = await contractInstance.getBatchCollectionIds(batchId);
        const collectionIds = batch.map(id => id.toNumber());
        return collectionIds;
    } catch (error) {
        return {Error : error}
    }
}

export const createMilkCollectorBatch = async (collectorId,collectionIds,quantity,quality) => {
    try {
        let txn = await contractInstance.createMilkCollectorBatch(collectorId,collectionIds,quantity,quality);
        return txn;
    } catch (error) {
        console.error(error)
        return error;
    }
}