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

        const convertMilkCollectionsToArrayOfJS = milkCollections = milkCollections.map(collection => {
            return {
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
