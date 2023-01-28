import { useState, useCallback, useEffect } from 'react';
import { getAllProcessorsBatches, getProcessorBatchCollectionIds } from '../../../database/milk-processor.controller';
import moment from 'moment';
import { contractInstance } from "../../utils/ethers";

export function useProcessor() {
    const [batchesByProcessor, setBatchesByProcessor] = useState([]);
    const [batchesByCollectors, setBatchesByCollectors] = useState([]);
    const [getAcceptedBatches, setGetAcceptedBatches] = useState([]);
    const [error, setError] = useState('');


    const convertTimestamp = (timestamp) => {
        return moment.unix(timestamp).format("h:mm:ss A : DD/MM/YYYY");
    };

    const getBatchCollectionIds = useCallback(async (batchId) => {
        try {
            const batch = await contractInstance.getBatchCollectionIds(batchId);
            const collectionIds = batch.map(id => id.toNumber());
            return collectionIds;
        } catch (error) {
            return { Error: error }
        }
    }, []);

    const getBatchesAndIDs = useCallback(async () => {
        try {
            const batches = await getAllProcessorsBatches();
            const batchPromises = batches.map(async (batch) => {
                const collectionsIds = await getProcessorBatchCollectionIds(batch.batchId);

                return { ...batch, collectionIds: collectionsIds };
            });
            const batchesWithCollectionIds = await Promise.all(batchPromises);

            const allCollectionIds = batchesWithCollectionIds.map((batch) => batch.collectionIds).flat();
            const uniqueCollectionBatchIds = [...new Set(allCollectionIds)];

            return { batchesWithCollectionIds, uniqueCollectionBatchIds }
        } catch (e) {
            console.log(e);
        }
    }, []);

    const getAllCollectorsBatchesList = useCallback(async () => {
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

            const batchesWithLocalTimestamp = batchesWithCollectionIds.map((batch) => {
                const batchCreatedTime = convertTimestamp(batch.batchCreatedTime);
                const statusUpdateTime = convertTimestamp(batch.statusUpdateTime);

                return { ...batch, batchCreatedTime, statusUpdateTime, batchId: Number(batch.batchId) }
            })

            const { uniqueCollectionBatchIds } = await getBatchesAndIDs();

            const filteredBatchIdThoseAlreadyBatched = batchesWithLocalTimestamp.filter(
                (collection) => !uniqueCollectionBatchIds.includes(collection.batchId)
            );

            setBatchesByCollectors(filteredBatchIdThoseAlreadyBatched);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again later.');
        }
    }, [getBatchCollectionIds, getBatchesAndIDs]);

    const getAllProcessorBatchesList = useCallback(async () => {
        try {
            const { batchesWithCollectionIds } = await getBatchesAndIDs();

            const batchesWithLocalTimestamp = batchesWithCollectionIds.map((batch) => {
                const batchCreatedTime = convertTimestamp(batch.batchCreatedTime);

                return { ...batch, batchCreatedTime }
            })
            setBatchesByProcessor(batchesWithLocalTimestamp);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again later.');
        }
    }, [getBatchesAndIDs]);

    const getAllAcceptedBatches = useCallback(
        async () => {
            const filterBatchesByAccepted = batchesByCollectors.filter((batch) => batch.accepted === true);
            setGetAcceptedBatches(filterBatchesByAccepted);
        },
        [batchesByCollectors, setGetAcceptedBatches],
    )

    const createBatchForProcessing = useCallback(async () => {
        try {
            const filterBatchesByAccepted = batchesByCollectors.filter((batch) => batch.accepted === true);

            const getBatchesId = filterBatchesByAccepted.map((batch) => batch.batchId).flat();

            const totalQuantity = filterBatchesByAccepted.reduce((acc, batch) => {
                return acc + parseFloat(batch.quantity);
            }, 0);

            const averageQuality = filterBatchesByAccepted.reduce((acc, batch) => {
                return acc + parseFloat(batch.quality);
            }, 0) / filterBatchesByAccepted.length;

            const txn = await contractInstance.createProcessorBatch(getBatchesId, totalQuantity, averageQuality);
            return txn;
        } catch (error) {

        }
    }, [batchesByCollectors]);

    const acceptCollectorBatch = useCallback(async (batchId, newStatus) => {
        try {
            const txn = await contractInstance.updateMilkCollectorBatchStatus(batchId, newStatus);
            return txn;
        } catch (error) {
            console.error(error)
            return error;
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getAllCollectorsBatchesList();
            getAllProcessorBatchesList();
            getAllAcceptedBatches();
        }, 1000);
        return () => clearInterval(interval);
    }, [getAllAcceptedBatches, getAllCollectorsBatchesList, getAllProcessorBatchesList]);

    return { batchesByProcessor, batchesByCollectors, acceptCollectorBatch, createBatchForProcessing, getAcceptedBatches }
}