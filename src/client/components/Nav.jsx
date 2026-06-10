import { useState } from "react"
import { Account } from "./Account"
import Search from "./Search"
import { Link } from "react-router-dom"
import { Icon } from "./Icons"
import { useEffect } from "react"
import { checkLoggedIn, logout } from "../services/user"
import { useAuth } from "./AuthContext"
function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const {user, userLogout} = useAuth()

  const logOut = async() => {
    await logout()
    userLogout()
  }

  return (
    <nav className="flex md:grid  md:grid-cols-(--grid-nav) justify-center md:justify-items-center gap-2 w-full p-3 items-center">
        <Link to={`/`} className="flex items-center">
          <Icon title={'tv'}  style={'fill-(--color-bg) w-8 md:w-10'}/>
          <h1 className=" hidden md:block md:text-(--color-bg) md:font-bold md:text-2xl md:mt-2">Watch List</h1>
        </Link>
        <Search></Search>
        {user ? (
          <>
            <Link to={'/'} >
              <Icon title={'watchList'} style={'fill-(--color-bg) w-8 '} /> 
            </Link>
            <button className="cursor-pointer"  onClick={logOut}>
              <Icon title={'logout'} style={'fill-(--color-bg) w-8 '} />  
            </button>

          </>
        ): (
          <>
            <button className="cursor-pointer"  onClick={() => {setIsOpen(true)}}>
              <Icon title={'login'} style={'fill-(--color-bg) w-8 '} /> 
            </button>
            <Account isOpen={isOpen} onClose={()=> {setIsOpen(false)}}/>
          </>
        )
        }
    </nav>
  )
}

export default Nav