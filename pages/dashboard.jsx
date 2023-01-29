import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import MilkCollector from './modules/MilkCollector';
import MilkProcessor from './modules/MilkProcessor';
import Distributor from './modules/Distributor';
import Retailer from './modules/Retailer';

const Dashboard = () => {
    const router = useRouter();
    const { user } = useUserContext();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('dairy-login'));
        if (!userData) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div>
            {user?.role === "milkcollector"
                ? <MilkCollector />
                : user?.role === 'milkprocessor'
                    ? <MilkProcessor />
                    : user?.role === 'distributor'
                        ? <Distributor />
                        : <Retailer />
            }

        </div>
    );
};

export default Dashboard;
