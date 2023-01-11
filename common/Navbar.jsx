import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './Provider/UserProvider';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [displayedUser, setDisplayedUser] = useState(user);

    const handleLogout = useContext(UserContext).logout;
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        setDisplayedUser(user);
      }, [user]);

    if (pathname === '/login') {
        return null;
    }
    return (
        <header className="bg-indigo-500 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div>
                    <span className="text-sm font-medium mr-2">Welcome, {displayedUser && displayedUser.email}</span>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
