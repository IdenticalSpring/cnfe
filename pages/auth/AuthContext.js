// context/AuthContext.js
import { createContext, useContext, useEffect } from 'react';
import useCheckTokenExpiration from './logout'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    useCheckTokenExpiration(); 

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
