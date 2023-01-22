import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import { getCollctedMilk, getFarmers } from '../common/Provider/lib/helper';
import AddMilkCollection from './components/AddMilkCollection';
import AddFarmer from './components/AddFarmer';
import moment from 'moment';

const MilkCollector = () => {
    const [milkCollections, setMilkCollections] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [activeTab, setActiveTab] = useState("milk-collection");
    const [error, setError] = useState('');
    const { user } = useUserContext();
    const router = useRouter();

    const convertTimestamp = (timestamp) => {
        return moment.unix(timestamp).format("h:mm:ss A : DD/MM/YYYY");
    };

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
                setMilkCollections(filterMilkCollectionByCollectorID);
            } catch (e) {
                console.log(e);
                setError('An error occurred. Please try again later.');
            }
        }
    }, [setMilkCollections, user]);

    const getFarmersList = useCallback(async () => {
        if (user) {
            try {
                const farmers = await getFarmers();
                const filterFarmersByMilkCollectorID = farmers.filter((farmer) =>
                    farmer.milkCollectorId === user.id
                )
                setFarmers(filterFarmersByMilkCollectorID);
            } catch (e) {
                console.log(e);
                setError('An error occurred. Please try again later.');
            }
        }
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            getMillColletionList();
            getFarmersList();
        }, 1000);
        return () => clearInterval(interval);
    }, [getFarmersList, getMillColletionList]);


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
                    className={`tab-item py-2 px-4 rounded-l-md ${activeTab === "milk-collection" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("milk-collection")}
                >
                    Milk Collection
                </button>
                <button
                    className={`tab-item py-2 px-4 rounded-r-md ${activeTab === "add-farmer" ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                    onClick={() => setActiveTab("add-farmer")}
                >
                    Add Farmer
                </button>
            </div>
            {activeTab === "milk-collection" ?
                <div className="milk-collection-content">
                    <AddMilkCollection milkCollections={milkCollections} error={error} />
                </div> :
                <div className="add-farmer-content">
                    <AddFarmer farmers={farmers} error={error} />
                </div>
            }
        </main>
    );
};

export default MilkCollector;
