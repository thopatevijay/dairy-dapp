import { useState, useCallback, useEffect } from 'react';
import { contractInstance } from "../../utils/ethers";

export function useCollector({user, farmerName}) {
    const [error, setError] = useState('');

    const addFarmer = useCallback(async (e) => {
        try {
            e.preventDefault();
            const txn = await contractInstance.addFarmer(user.id, farmerName);
            console.log(txn);
            return txn;
        } catch (error) {
            console.error(error)
            return error;
        }
    }, [farmerName, user.id]);

    return { addFarmer }
}