import React, { createContext, useEffect, useState } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => { },
});


export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
