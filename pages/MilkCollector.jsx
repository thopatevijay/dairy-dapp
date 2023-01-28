import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import AddMilkCollection from './components/AddMilkCollection';
import AddFarmer from './components/AddFarmer';
import MilkCollectorBatches from './components/MilkCollectorBatches';
import { useCollector } from './components/hooks/useCollector';

const MilkCollector = () => {
    const [activeTab, setActiveTab] = useState("milk-collection");
    const [error, setError] = useState('');
    const { user } = useUserContext();
    const { farmers, milkCollections, existingBatches } = useCollector({ user });
    const router = useRouter();

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
