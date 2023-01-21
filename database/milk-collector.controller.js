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