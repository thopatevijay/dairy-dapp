import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../common/Provider/UserProvider';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const handleLogout = useContext(UserContext).logout;
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
