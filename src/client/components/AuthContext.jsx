import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkLoggedIn } from "../services/user";
import { useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        async function checkCredentials() {
        const logged = await checkLoggedIn()
        if(logged.loggedIn) setUser(logged.user)
        }
        checkCredentials()
    }, [])
    const userLogin = (userData) => setUser(userData)
    const userLogout = () => setUser(null)
    return (
        <AuthContext value={{ user: user, userLogin, userLogout}}>
            {children}
        </AuthContext>
    );
}

export const useAuth = () => useContext(AuthContext);