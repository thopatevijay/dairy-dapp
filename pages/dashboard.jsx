import { useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [user, setUser] = useState("");
    const router = useRouter();

    useLayoutEffect(() => {
        const userData = JSON.parse(localStorage.getItem('dairy-login'));
        setUser(userData);
        if (!userData) {
            router.push('/login');
        }
    }, [router]);


    const handleLogout = () => {
        localStorage.removeItem('dairy-login');
        router.push('/login');
    }

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-4">Welcome, {user && user.email}</h1>
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
