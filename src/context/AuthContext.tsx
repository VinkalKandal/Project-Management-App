import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    token: string | null;
    login: (token:string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(()=>{
        return localStorage.getItem("token");
    });

    const login = (newToken: string)=>{
        setToken(newToken);
        localStorage.setItem('token', newToken)
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token')
    }

    useEffect(()=>{
        // Optional: validate token or auto-logout logic
    })

    return(
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}