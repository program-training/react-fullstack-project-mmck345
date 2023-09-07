import React, { createContext, useEffect, useState } from "react";

type TokenContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TokenContext = createContext<TokenContextType | null>(null)

type TokenContextProps = {
    children: React.ReactNode;
}

function TokenContextProvider(props: TokenContextProps) {
    const [token, setToken] = useState<string | null>(null)

    useEffect(()=> {
        let tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage) {
            setToken(tokenFromLocalStorage) 
        };
    }, [])

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {props.children}
        </TokenContext.Provider>
    )
}

export default TokenContextProvider;