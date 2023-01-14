import React, { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('dairy-login'));
        setUser(storedUser);
    }, [setUser, router]);

    const login = (userData) => {
        localStorage.setItem('dairy-login', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('dairy-login');
        setUser(null);
        router.push('/login');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
