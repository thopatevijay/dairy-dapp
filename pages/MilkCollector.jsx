import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import { BiUserPlus } from "react-icons/bi";
import MilkCollectTable from './components/MilkCollectTable';
import MilkCollectForm from './components/MilkCollectForm';
import { getCollctedMilk, submitMilkData, getFarmers } from '../common/Provider/lib/helper';

const MilkCollector = () => {
    const [formVisible, setFormVisible] = useState(false)
    const [milkCollections, setMilkCollections] = useState([]);
    const [error, setError] = useState('');
    const { user } = useUserContext();
    const router = useRouter();

    const handleToggleForm = () => {
        setFormVisible(!formVisible);
    }

    const getMillColletionList = useCallback(async () => {
        if (user) {
            try {
                const milkCollections = await getCollctedMilk();
                const farmers = await getFarmers();

                const milkCollectionsWithFarmerName = milkCollections.map((milkCollection) => {
                    const farmer = farmers.find((farmer) => farmer.farmerId === milkCollection.farmerId);

                    return { ...milkCollection, farmerName: farmer.name, }
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
    }, [getCollctedMilk, getFarmers, setMilkCollections, user]);

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
            <h1 className='text-xl md:text-2xl text-center font-bold'>Milk Collection</h1>
            <div className="container mx-auto flex justify-between py-5 border-b">
                <div className="left flex gap-3" onClick={handleToggleForm}>
                    <button className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800">
                        Collect Milk <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                    </button>
                </div>
            </div>
            {
                formVisible
                    ?
                    (
                        <div className="container mx-auto py-5">
                            <MilkCollectForm />
                        </div>
                    )
                    : null
            }
            <div className="container mx-auto">
                <MilkCollectTable milkCollections={milkCollections} error={error} />
            </div>
        </main>
    );
};

export default MilkCollector;
