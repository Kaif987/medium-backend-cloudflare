import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { User } from "@/context/authContext";


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useUserContext must be used inside UserContextProvider")
    }

    const { user, setUser } = context

    const login = (userPayload: User) => {
        setUser(userPayload)
        localStorage.setItem("user", JSON.stringify(userPayload))
    }

    const logout = () => {
        setUser(null);
        localStorage.setItem("user", "");
    };

    return { user, login, logout, setUser };
};
