import React, { useState, useEffect } from 'react';
import { useWalletContext, useUserContext } from '../../common/Provider';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { metaMask, connectToMetaMask } = useWalletContext();
    const { user, logout } = useUserContext();
    const [displayedUser, setDisplayedUser] = useState(user);
    const handleLogout = logout;

    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        setDisplayedUser(user);
    }, [user]);

    if (pathname === '/login' || pathname === '/ProductId/[productId]') {
        return null;
    }
    return (
        <header className="bg-indigo-500 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div>
                    <span className="text-sm font-medium mr-2">Welcome, {displayedUser && displayedUser.email}</span>
                    <button className="bg-indigo-500 text-white px-4 py-2 mr-1 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="bg-indigo-500 text-white px-4 py-2 mr-1 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800" onClick={connectToMetaMask}>
                        {metaMask.isConnected ? "Wallet connected" : "Connect wallet"}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
