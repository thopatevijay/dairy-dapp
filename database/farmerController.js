import { contractInstance } from "../pages/utils/ethers"

export async function getFarmer(req, res) {
    try {
        const { farmerID } = req.query;
        let txn = await contractInstance.farmers(farmerID);
        res.status(200).json(txn);
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}

export async function addFarmer(req, res) {
    try {
        const data = req.body;

        let txn = await contractInstance.addFarmer(data.milkCollectorId ,data.name);
        res.status(200).json(txn);
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}