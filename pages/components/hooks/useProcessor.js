import { useState, useCallback, useEffect } from 'react';
import { getAllProcessorsBatches, getProcessorBatchCollectionIds } from '../../../database/milk-processor.controller';
import { getAllBatches, getBatchCollectionIds } from '../../../database/milk-collector.controller';
import moment from 'moment';

export function useProcessor() {
    const [batchesByProcessor, setBatchesByProcessor] = useState([]);
    const [batchesByCollectors, setBatchesByCollectors] = useState([]);
    const [error, setError] = useState('');


    const convertTimestamp = (timestamp) => {
        return moment.unix(timestamp).format("h:mm:ss A : DD/MM/YYYY");
    };

    const getBatchesAndIDs = useCallback( async () => {
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
    },[]);

    const getAllCollectorsBatchesList = useCallback(async () => {
        try {
            const batches = await getAllBatches();

            const batchPromises = batches.map(async (batch) => {
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
    }, [getBatchesAndIDs]);

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

    useEffect(() => {
        const interval = setInterval(() => {
            getAllCollectorsBatchesList();
            getAllProcessorBatchesList();
        }, 1000);
        return () => clearInterval(interval);
    }, [getAllCollectorsBatchesList, getAllProcessorBatchesList]);

    return { batchesByProcessor, batchesByCollectors }
}