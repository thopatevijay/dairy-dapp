import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../../common/Provider';
import AccessDenied from "../components/AccessDenied";
import BatchesByCollectors from '../components/BatchesByCollectors';
import Production from '../components/Production';
import { useProcessor } from '../components/hooks/useProcessor';

const MilkProcessor = () => {
    const [activeTab, setActiveTab] = useState("batches");
    const { batchesByProcessor, batchesByCollectors } = useProcessor();
    
    const { user } = useUserContext();

    const router = useRouter();

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
                    <Production batchesByProcessor={batchesByProcessor}
                        isProcessor={true} isDistributor={false} isRetailer={false}
                    />
                </div>
            }
        </main>
    );
};

export default MilkProcessor;
