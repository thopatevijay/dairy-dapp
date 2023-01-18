import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../common/Provider';
import AccessDenied from "../common/AccessDenied";

const MilkProcessor = () => {
    const { user } = useUserContext();

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
