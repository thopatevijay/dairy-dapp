import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import BatchesByCollectors from './components/BatchesByCollectors';
import { getAllBatches, getBatchCollectionIds } from '../database/milk-collector.controller';
import moment from 'moment';
import Production from './components/Production';
import { getAllProcessorsBatches, getProcessorBatchCollectionIds } from '../database/milk-processor.controller';

const MilkProcessor = () => {
    const [activeTab, setActiveTab] = useState("batches");
    const [error, setError] = useState('');
    const [batchesByCollectors, setBatchesByCollectors] = useState([]);
    const [batchesByProcessor, setBatchesByProcessor] = useState([]);

    const { user } = useUserContext();

    const router = useRouter();

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
            // console.log(batchesWithCollectionIds)
            // const batchesWithLocalTimestamp = batchesWithCollectionIds.map((batch) => {
            //     const batchCreatedTime = convertTimestamp(batch.batchCreatedTime);
            //     const statusUpdateTime = convertTimestamp(batch.statusUpdateTime);

            //     return { ...batch, batchCreatedTime, statusUpdateTime }
            // })
            setBatchesByProcessor(batchesWithCollectionIds);
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

    if (user && user.role !== "milkprocessor") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Milk Processor" />
    }

    return (
        <main className='py-5'>
            <div className="tabs ml-6">
                <button
                    className={`tab-item py-2 px-4 rounded-md ${activeTab === "batches" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("batches")}
                >
                    Batches
                </button>
                <button
                    className={`tab-item py-2 px-4 rounded-md ${activeTab === "production" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("production")}
                >
                    Production
                </button>
            </div>
            {activeTab === "batches"
                ?
                <div className="batches-content">
                    <BatchesByCollectors batchesByCollectors={batchesByCollectors} />
                </div>
                :
                <div className="production-content">
                    <Production batchesByProcessor={batchesByProcessor} />
                </div>
            }
        </main>
    );
};

export default MilkProcessor;
