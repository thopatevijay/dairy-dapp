import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../common/Provider/UserProvider';

const MilkCollector = () => {
    const { user } = useContext(UserContext);
    const router = useRouter();

    if (user && user.role !== "milkcollector") {
        setTimeout(() => {
            router.push('/');
        }, 5000);
        return (
            <div className="">
                <div className="bg-indigo-500 text-center text-white py-3">
                    <h1 className="text-3xl font-medium">Access Denied</h1>
                </div>
                <div className="p-4">
                    <p className="text-lg font-medium">You must be a user to access this page. Redirecting to Dashboard.</p>
                </div>
            </div>
        )
    }

    return (
        <div>Milk collector</div>
    );
};

export default MilkCollector;
