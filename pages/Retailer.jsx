import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";
import { useProcessor } from './components/hooks/useProcessor';
import Production from './components/Production';

const Retailer = () => {
    const { user } = useUserContext();
    const { batchesByProcessor } = useProcessor();


    const router = useRouter();

    if (user && user.role !== "retailer") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Retailer" />
    }

    return (
        <main className='py-5'>
            <div className="production-content">
                <Production batchesByProcessor={batchesByProcessor}
                    isProcessor={false} isDistributor={false} isRetailer={true}
                />
            </div>
        </main>
    );
};

export default Retailer;
