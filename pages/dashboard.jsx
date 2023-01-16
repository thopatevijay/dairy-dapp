import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('dairy-login'));
        if (!userData) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
        </div>
    );
};

export default Dashboard;
