import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import { getCollctedMilk, getFarmers } from '../common/Provider/lib/helper';
import AddMilkCollection from './components/AddMilkCollection';
import AddFarmer from './components/AddFarmer';
import moment from 'moment';
import { getAllBatches, getBatchCollectionIds } from '../database/milk-collector.controller';
import MilkCollectorBatches from './components/MilkCollectorBatches';
import { useCollector } from './components/hooks/useCollector';

const MilkCollector = () => {
    const [milkCollections, setMilkCollections] = useState([]);
    const [existingBatches, setExistingBatches] = useState([]);
    const [activeTab, setActiveTab] = useState("milk-collection");
    const [error, setError] = useState('');
    const { user } = useUserContext();
    const { farmers } = useCollector({ user });
    const router = useRouter();


    const convertTimestamp = (timestamp) => {
        return moment.unix(timestamp).format("h:mm:ss A : DD/MM/YYYY");
    };

    const getAllBatchesList = useCallback(async () => {
        if (user) {
            try {
                const batches = await getAllBatches();

                const batchPromises = batches.map(async (batch) => {
                    const collectionIds = await getBatchCollectionIds(batch.batchId);

                    return { ...batch, collectionIds: collectionIds };
                });
                const batchesWithCollectionIds = await Promise.all(batchPromises);


                return batchesWithCollectionIds;
            } catch (e) {
                console.log(e);
                setError('An error occurred. Please try again later.');
            }
        }
    }, [user]);

    const getMillColletionList = useCallback(async () => {
        if (user) {
            try {
                const milkCollections = await getCollctedMilk();
                const farmers = await getFarmers();

                const milkCollectionsWithFarmerName = milkCollections.map((milkCollection) => {
                    const farmer = farmers.find((farmer) => farmer.farmerId === milkCollection.farmerId);
                    const newTime = convertTimestamp(milkCollection.timestamp);

                    return { ...milkCollection, farmerName: farmer.name, timestamp: newTime }
                })

                const filterMilkCollectionByCollectorID = milkCollectionsWithFarmerName.filter((collection) =>
                    collection.milkCollectorId === user.id
                )

                const batchesWithCollectionIds = await getAllBatchesList();

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
            } catch (e) {
                console.log(e);
                setError('An error occurred. Please try again later.');
            }
        }
    }, [getAllBatchesList, user, setExistingBatches]);

    useEffect(() => {
        const interval = setInterval(() => {
            getMillColletionList();
        }, 1000);
        return () => clearInterval(interval);
    }, [getMillColletionList]);


    if (user && user.role !== "milkcollector") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Milk Collector" />
    }

    return (
        <main className='py-5'>
            <div className="tabs ml-6">
                <button
                    className={`tab-item py-2 px-4 rounded-md ${activeTab === "milk-collection" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("milk-collection")}
                >
                    Milk Collection
                </button>
                <button
                    className={`tab-item py-2 px-4 rounded-md ${activeTab === "add-farmer" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("add-farmer")}
                >
                    Add Farmer
                </button>
                <button
                    className={`tab-item py-2 px-4 rounded-md ${activeTab === "baches" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("baches")}
                >
                    Batches
                </button>
            </div>
            {activeTab === "milk-collection"
                ?
                <div className="milk-collection-content">
                    <AddMilkCollection milkCollections={milkCollections} error={error} farmers={farmers} />
                </div>
                : activeTab === "add-farmer"
                    ?
                    <div className="add-farmer-content">
                        <AddFarmer farmers={farmers} error={error} />
                    </div>
                    :
                    <div className="batches-content">
                        <MilkCollectorBatches batches={existingBatches} />
                    </div>
            }
        </main>
    );
};

export default MilkCollector;
