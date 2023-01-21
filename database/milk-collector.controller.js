import { contractInstance } from "../pages/utils/ethers"

export async function collectMilk(req, res) {
    try {
        const data = req.body;

        let txn = await contractInstance.collectMilk(data.id, data.milkAmount, data.milkQuality);
        res.status(200).json(txn);
    } catch (error) {
        console.error(error)
        res.status(404).json({ error: "Error ..." });
    }
}