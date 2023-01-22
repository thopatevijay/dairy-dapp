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

        let txn = await contractInstance.addFarmer(data.milkCollectorId, data.farmerName);
        res.status(200).json(txn);
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}

export async function getAllFarmers(req, res) {
    try {
        const farmerCount = await contractInstance.farmerIdCounter();
        let farmers = [];

        for (let i = 1; i < farmerCount; i++) {
            const farmer = await contractInstance.farmers(i);

            farmers.push(farmer);
        }

        const convertAllFarmersToArrayOfJS = farmers.map(farmer => {
            return {
                farmerId: farmer[0].toString(),
                name: farmer[1].toString(),
                milkCollectorId: farmer[4].toString()
            }
        });
        res.status(200).json(convertAllFarmersToArrayOfJS);
    } catch (error) {
        res.status(404).json({ error: "Error ..." });
    }
}