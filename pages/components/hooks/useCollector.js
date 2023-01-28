import { useState, useCallback, useEffect } from 'react';
import { contractInstance } from "../../utils/ethers";
import moment from 'moment';

export function useCollector({ user }) {
    const [error, setError] = useState('');
    const [farmers, setFarmers] = useState([]);
    const [milkCollections, setMilkCollections] = useState([]);
    const [existingBatches, setExistingBatches] = useState([]);

    const convertTimestamp = (timestamp) => {
        return moment.unix(timestamp).format("h:mm:ss A : DD/MM/YYYY");
    };

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
                let farmersList = [];

                for (let i = 1; i < farmerCount; i++) {
                    const farmer = await contractInstance.farmers(i);

                    farmersList.push(farmer);
                }

                const convertAllFarmersToArrayOfJS = farmersList.map(farmer => {
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
                return filterFarmersByMilkCollectorID;
            } catch (error) {
                console.error(error)
                return error;
            }
        }
    }, [user, setFarmers]);

    const getBatchCollectionIds = useCallback(async (batchId) => {
        try {
            const batch = await contractInstance.getBatchCollectionIds(batchId);
            const collectionIds = batch.map(id => id.toNumber());
            return collectionIds;
        } catch (error) {
            return { Error: error }
        }
    }, []);

    const getAllBatches = useCallback(async () => {
        try {
            const batchCount = await contractInstance.collectorBatchIdCounter();
            let batches = [];

            for (let i = 1; i < batchCount; i++) {
                const batch = await contractInstance.collectorBatches(i);

                batches.push(batch);
            }
            const convertBatchesToArrayOfJS = batches.map(batch => {
                return {
                    batchId: batch[0].toString(),
                    collectorId: batch[1].toString(),
                    batchCreatedTime: batch[2].toString(),
                    quantity: batch[3].toString(),
                    quality: batch[4].toString(),
                    accepted: batch[5],
                    statusUpdateTime: batch[6].toString(),
                }
            });

            const batchPromises = convertBatchesToArrayOfJS.map(async (batch) => {
                const collectionIds = await getBatchCollectionIds(batch.batchId);

                return { ...batch, collectionIds: collectionIds };
            });
            const batchesWithCollectionIds = await Promise.all(batchPromises);

            return batchesWithCollectionIds;
        } catch (error) {
            return { Error: error }
        }
    }, [getBatchCollectionIds]);

    const getAllCollectedMilk = useCallback(async () => {
        try {
            const milkCollectionCount = await contractInstance.milkCollectionCounter();
            let milkCollectionsList = [];

            for (let i = 1; i < milkCollectionCount; i++) {
                const milkCollection = await contractInstance.milkCollections(i);

                milkCollectionsList.push(milkCollection);
            }

            const convertMilkCollectionsToArrayOfJS = milkCollectionsList.map((collection, index) => {
                return {
                    collectionId: index + 1,
                    milkCollectorId: collection[0].toString(),
                    farmerId: collection[1].toString(),
                    quantity: collection[2].toString(),
                    quality: collection[3].toString(),
                    timestamp: collection[4].toString()
                }
            });
            const filterFarmersByMilkCollectorID = await getFarmersList();
            const milkCollectionsWithFarmerName = convertMilkCollectionsToArrayOfJS.map((milkCollection) => {
                
                const farmer = filterFarmersByMilkCollectorID.find((farmer) => farmer.farmerId === milkCollection.farmerId);
                const newTime = convertTimestamp(milkCollection.timestamp);

                return { ...milkCollection, farmerName: farmer.name, timestamp: newTime }
            })

            const filterMilkCollectionByCollectorID = milkCollectionsWithFarmerName.filter((collection) =>
                collection.milkCollectorId === user.id
            )

            const batchesWithCollectionIds = await getAllBatches();

            console.log(batchesWithCollectionIds);

            const allCollectionIds = batchesWithCollectionIds.map((batch) => batch.collectionIds).flat();
            const uniqueCollectionIds = [...new Set(allCollectionIds)];

            const filteredMilkCollectionsExcludingBatches = filterMilkCollectionByCollectorID.filter(
                (collection) => !uniqueCollectionIds.includes(collection.collectionId)
            );

            const timestampConvertedBatces = batchesWithCollectionIds.map((batch) => {
                const batchCreatedTime = convertTimestamp(batch.batchCreatedTime);
                const statusUpdateTime = convertTimestamp(batch.statusUpdateTime);

                return { ...batch, batchCreatedTime, statusUpdateTime }
            })
           
            const filterBatchesByCollectorId = timestampConvertedBatces.filter((batch) =>
                batch.collectorId === user.id
            );


            setExistingBatches(filterBatchesByCollectorId);
            setMilkCollections(filteredMilkCollectionsExcludingBatches);
        } catch (error) {
            return { Error: error }
        }
    }, [getAllBatches, user?.id, setExistingBatches, setMilkCollections, getFarmersList]);


    const collectMilk = useCallback(async (e, farmerId, milkQuantity, milkQuality) => {
        e.preventDefault();
        try {
            const txn = await contractInstance.collectMilk(user.id, farmerId, milkQuantity, milkQuality);
            console.log(txn);
        } catch (error) {
            console.error(error)
            return error;
        }
    }, [user?.id])

    useEffect(() => {
        
        getFarmersList();
        getAllCollectedMilk();
        contractInstance.on("AddFarmerEvent", () => getFarmersList());

        contractInstance.on("CollectMilkEvent", () => getAllCollectedMilk());
    }, [getAllCollectedMilk, getFarmersList]);

    return { addFarmer, farmers, milkCollections, existingBatches, collectMilk }
}