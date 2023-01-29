import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../../common/Provider';
import AccessDenied from "../components/AccessDenied";
import { useProcessor } from '../components/hooks/useProcessor';
import Production from '../components/Production';

const Distributor = () => {
    const { user } = useUserContext();
    const { batchesByProcessor, batchesByCollectors } = useProcessor();


    const router = useRouter();

    if (user && user.role !== "distributor") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Distributor" />
    }

    return (
        <main className='py-5'>
            <div className="production-content">
                <Production batchesByProcessor={batchesByProcessor}
                    isProcessor={false} isDistributor={true} isRetailer={false}
                />
            </div>
        </main>
    );
};

export default Distributor;
