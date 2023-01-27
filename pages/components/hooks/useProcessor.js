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

                return { ...batch, batchCreatedTime, statusUpdateTime }
            })
            setBatchesByCollectors(batchesWithLocalTimestamp);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again later.');
        }
    }, [setBatchesByCollectors]);

    const getAllProcessorBatchesList = useCallback(async () => {
        try {
            const batches = await getAllProcessorsBatches();
            const batchPromises = batches.map(async (batch) => {
                const collectionsIds = await getProcessorBatchCollectionIds(batch.batchId);

                return { ...batch, collectionIds: collectionsIds };
            });
            const batchesWithCollectionIds = await Promise.all(batchPromises);

            const batchesWithLocalTimestamp = batchesWithCollectionIds.map((batch) => {
                const batchCreatedTime = convertTimestamp(batch.batchCreatedTime);

                return { ...batch, batchCreatedTime }
            })
            setBatchesByProcessor(batchesWithLocalTimestamp);
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again later.');
        }
    }, [setBatchesByProcessor]);

    useEffect(() => {
        const interval = setInterval(() => {
            getAllCollectorsBatchesList();
            getAllProcessorBatchesList();
        }, 1000);
        return () => clearInterval(interval);
    }, [getAllCollectorsBatchesList, getAllProcessorBatchesList]);

    return { batchesByProcessor, batchesByCollectors }
}