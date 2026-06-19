import { useState } from "react"
import { Account } from "./Account"
import Search from "./Search"
import { Link } from "react-router-dom"
import { Icon } from "./Icons"
import { useEffect } from "react"
import { checkLoggedIn, logout } from "../services/user"
import { useAuth } from "./AuthContext"

function Menu({onClose, open, logOut}){
  return (
    <>
      <div className={`${!open && 'pointer-events-none'} fixed top-0 z-2 right-0  h-full w-full flex`}>
        <div onClick={onClose} 
        className={`fixed ${open && 'bg-black/50'} inset-0`} />
        <div className={`relative justify-start w-50 h-full left-full p-5 
            bg-(--color-bg) rounded-l-2xl text-slate-200 flex flex-col items-start
            transition-all duration-300 ease-in-out gap-4
            ${open ? '-translate-x-50' :'translate-x-0'}
            `}>
              <button>X</button>
          <button className="cursor-pointer flex w-full gap-2"  onClick={logOut}>
            <Icon title={'logout'} style={'fill-(--color-bg-light) w-6 md:w-8 '} />  
            Log Out
          </button>
          <Link to={'/profile'} className="flex w-full gap-2">
              <Icon title={'watchList'} style={'fill-(--color-bg-light) w-6 md:w-8 '} /> 
              Watchlist
            </Link>
        </div> 

    </div>
    </>
  )
}
function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
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
            <Link to={'/profile'} className="hidden md:block [grid-area:1/3/2/4]">
              <Icon title={'watchList'} style={'fill-(--color-bg) w-6 md:w-8 '} /> 
            </Link>
            <button className="hidden md:block cursor-pointer [grid-area:1/4/2/5]"  onClick={logOut}>
              <Icon title={'logout'} style={'fill-(--color-bg) w-6 md:w-8 '} />  
            </button>
            <div className="block md:hidden">
              <button className="cursor-pointer [grid-area:1/4/2/5]"  onClick={()=>{setOpenMenu(true)}}>
                <Icon title={'menu'} style={'fill-(--color-bg) w-6 md:w-8 '} />  
              </button>
              <Menu onClose={()=>{setOpenMenu(false)}} open={openMenu} logOut={logOut}/>

            </div>
          </>
        ): (
          <>
            <button className="cursor-pointer [grid-area:1/4/2/5]"  onClick={() => {setIsOpen(true)}}>
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