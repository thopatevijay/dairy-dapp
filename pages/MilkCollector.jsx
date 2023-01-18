import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import { BiUserPlus } from "react-icons/bi";
import MilkCollectTable from './components/MilkCollectTable';

const MilkCollector = () => {
    const { user } = useUserContext();

    const router = useRouter();

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
                <div className="left flex gap-3">
                    <button className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800">
                        Collect Milk <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                    </button>
                </div>
            </div>
            <div className="container mx-auto">
                <MilkCollectTable />
            </div>
        </main>
    );
};

export default MilkCollector;
