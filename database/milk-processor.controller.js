import { contractInstance } from "../pages/utils/ethers";

export const updateCollectorBatchStatus = async (batchId,newStatus) => {
    try {
        let txn = await contractInstance.updateMilkCollectorBatchStatus(batchId,newStatus);
        return txn;
    } catch (error) {
        console.error(error)
        return error;
    }
}