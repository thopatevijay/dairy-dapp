import React, { useState, createContext, useEffect, useContext } from 'react';
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
        const {email, role} = userData;
        localStorage.setItem('dairy-login', JSON.stringify({email: email, role: role}));
        setUser({email, role});
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

export const useUserContext = () => {
    return useContext(UserContext);
};