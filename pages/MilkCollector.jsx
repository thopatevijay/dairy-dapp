import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../common/Provider/UserProvider';
import AccessDenied from "../common/AccessDenied";

const MilkCollector = () => {
    const { user } = useContext(UserContext);
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