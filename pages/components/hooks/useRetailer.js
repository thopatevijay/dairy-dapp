import { useState, useCallback, useEffect } from 'react';
import { contractInstance } from "../../utils/ethers";

export function useRetailer() {
    const [error, setError] = useState('');

    const acceptBatchByDistributor = useCallback(async (batchId, accepted, quantity, quality) => {
        try {
            const txn = await contractInstance.acceptBatchByDistributor(batchId, accepted, quantity, quality);
            console.log(txn);
            return txn;
        } catch (error) {
            console.error(error)
            return error;
        }
    }, []);

    return { acceptBatchByDistributor }
}