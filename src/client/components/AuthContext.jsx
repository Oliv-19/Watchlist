import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkLoggedIn, logout } from "../services/user";
import { useContext } from "react";
import { getUnixTime } from "date-fns";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    
    
    const userLogin = (userData) => userData.id && setUser(userData)
    const userLogout = async() => {
        await logout()
        setUser(null)
        setOpenMenu(false)
    }
    useEffect(()=> {
        async function checkCredentials() {
            const logged = await checkLoggedIn() 
            if(logged.loggedIn){
                setUser(logged.user)
            } 
            else {
                userLogout()
                navigate(`/`) 
            }
        }
        checkCredentials()
    }, [user])
    
    return (
        <AuthContext value={{ user: user, userLogin, userLogout, isOpen, openMenu, 
        setOpenMenu, setIsOpen}}>
            {children}
        </AuthContext>
    );
}

export const useAuth = () => useContext(AuthContext);