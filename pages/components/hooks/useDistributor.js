import { useState, useCallback, useEffect } from 'react';
import { contractInstance } from "../../utils/ethers";

export function useDistributor() {
    const [error, setError] = useState('');

    const acceptBatchByProcessor = useCallback(async (batchId, accepted, quantity, quality) => {
        try {
            const txn = await contractInstance.acceptBatchByProcessor(batchId, accepted, quantity, quality);
            console.log(txn);
            return txn;
        } catch (error) {
            console.error(error)
            return error;
        }
    }, []);

    const sentToRetailer = useCallback(async (batchId, isSentToRetailer) => {
        try {
            const txn = await contractInstance.sendToRetailer(batchId, isSentToRetailer);
            console.log(txn);
            return txn;
        } catch (error) {
            console.error(error)
            return error;
        }
    }, []);


    return { acceptBatchByProcessor, sentToRetailer }
}