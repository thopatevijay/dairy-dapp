import { useState, useCallback, useEffect } from 'react';
import { contractInstance } from "../../utils/ethers";

export function useCollector({ user }) {
    const [error, setError] = useState('');
    const [farmers, setFarmers] = useState([]);

    const addFarmer = useCallback(async (farmerName, e) => {
        try {
            e.preventDefault();
            const txn = await contractInstance.addFarmer(user.id, farmerName);
            console.log(txn);
            return txn;
        } catch (error) {
            console.error(error)
            return error;
        }
    }, [user]);


    const getFarmersList = useCallback(async () => {
        if (user) {
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

                const filterFarmersByMilkCollectorID = convertAllFarmersToArrayOfJS.filter((farmer) =>
                    farmer.milkCollectorId === user.id);
                console.log(filterFarmersByMilkCollectorID);
                setFarmers(filterFarmersByMilkCollectorID);
            } catch (error) {
                console.error(error)
                return error;
            }
        }
    }, [user, setFarmers]);

    useEffect(() => {
        getFarmersList();
    }, [getFarmersList]);

    return { addFarmer, farmers }
}