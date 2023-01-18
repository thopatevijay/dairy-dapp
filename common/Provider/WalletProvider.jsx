import React, { useState, createContext, useEffect, useContext } from 'react';
import { useMetaMask } from "metamask-react";


const defaultMetamaskState = {
    metaMask: {
        isConnected: false,
        selectedAddress: "",
    },
};

const WalletContext = createContext(defaultMetamaskState);

export const WalletProvider = ({ children }) => {
    const [metaMask, setMetaMask] = useState(defaultMetamaskState.metaMask);
    const { ethereum, connect } = useMetaMask();

    const connectToMetaMask = async () => {
        const accounts = await connect();
        if (accounts?.length) {
            setMetaMask({
                isConnected: ethereum.selectedAddress ? true : false,
                selectedAddress: ethereum.selectedAddress,
            });
        }
    };

    useEffect(() => {
        if (ethereum) {
            setMetaMask({
                isConnected: ethereum.selectedAddress ? true : false,
                selectedAddress: ethereum.selectedAddress,
            });
        }
    }, [ethereum]);

    return (
        <WalletContext.Provider value={{ metaMask, connectToMetaMask }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => {
    return useContext(WalletContext);
};