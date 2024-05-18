import React, { useState, createContext } from 'react';

// Create UserContext
const nickname = '';


export const UserContext = createContext({ nickname});

// Create UserProvider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [nickname] = useState("");

    return (
        <UserContext.Provider value={{nickname}}>
            {children}
        </UserContext.Provider>
    );
};