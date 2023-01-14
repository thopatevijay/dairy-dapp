import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../common/Provider/UserProvider';
import AccessDenied from "../common/AccessDenied";

const MilkProcessor = () => {
    const { user } = useContext(UserContext);
    const router = useRouter();

    if (user && user.role !== "milkprocessor") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return <AccessDenied requiredRole="Milk Processor"/>
    }

    return (
        <div>Milk Processor</div>
    );
};

export default MilkProcessor;
