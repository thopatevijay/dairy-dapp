import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "./components/AccessDenied";

const Distributor = () => {
    const { user } = useUserContext();

    const router = useRouter();

    if (user && user.role !== "distributor") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Distributor"/>
    }

    return (
        <div>Distributor</div>
    );
};

export default Distributor;
