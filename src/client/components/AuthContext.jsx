import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkLoggedIn } from "../services/user";
import { useContext } from "react";
import { getUnixTime } from "date-fns";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const userLogin = (userData) => userData.id && setUser(userData)
    const userLogout = () => setUser(null)
    useEffect(()=> {
        async function checkCredentials() {
            const logged = await checkLoggedIn()
            if(logged.loggedIn) userLogin(logged.user)
            else {
                userLogout()
                navigate(`/`) 
            }
        }
        checkCredentials()
    }, [])
    return (
        <AuthContext value={{ user: user, userLogin, userLogout}}>
            {children}
        </AuthContext>
    );
}

export const useAuth = () => useContext(AuthContext);