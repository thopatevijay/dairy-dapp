import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../common/Provider/UserProvider';
import AccessDenied from "../common/AccessDenied";

const Distributor = () => {
    const { user } = useContext(UserContext);
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
