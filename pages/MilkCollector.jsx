import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import { BiUserPlus } from "react-icons/bi";
import MilkCollectTable from './components/MilkCollectTable';
import MilkCollectForm from './components/MilkCollectForm';

const MilkCollector = () => {
    const [formVisible, setFormVisible] = useState(false)
    const [milkCollections, setMilkCollections] = useState([]);
    const [error, setError] = useState('');
    const { user } = useUserContext();
    const router = useRouter();

    const handleToggleForm = () => {
        setFormVisible(!formVisible);
    }

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/milk-collector');
            if (response.ok) {
                const data = await response.json();
                setMilkCollections(data);
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again later.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
