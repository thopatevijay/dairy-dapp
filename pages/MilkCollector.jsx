import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "../common/AccessDenied";

const MilkCollector = () => {
    const { user } = useUserContext();

    const router = useRouter();

    if (user && user.role !== "milkcollector") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Milk Collector"/>
    }

    return (
        <div>Milk collector</div>
    );
};

export default MilkCollector;
