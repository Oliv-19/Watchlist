import { useState } from "react"
import { Account } from "./Account"
import Search from "./Search/Search"
import { Link } from "react-router-dom"
import { Icon } from "./Icons"
import { useEffect } from "react"
import { checkLoggedIn, logout } from "../services/user"
import { useAuth } from "./AuthContext"

function Menu(){
  const {setOpenMenu, openMenu, userLogout} = useAuth()
  const onClose = ()=> {setOpenMenu(false)}
  return (
    <>
      <div className={`overflow-hidden 
      ${!openMenu && 'pointer-events-none' } absolute 
      top-0 z-5 right-0  h-full w-full flex`}>
        <div onClick={onClose} className={`fixed ${openMenu && 'bg-black/50'} inset-0`} />
        <div className={`fixed justify-start w-50 h-full left-full p-5 
            bg-(--color-bg) rounded-l-2xl text-slate-200 flex flex-col items-start
            transition-all duration-300 ease-in-out gap-4 
            ${openMenu ? '-translate-x-50' :'translate-x-0'}
            `}>
              <button onClick={onClose}>X</button>
          <button className="cursor-pointer flex w-full gap-2"  onClick={userLogout}>
            <Icon title={'logout'} style={'fill-(--color-bg-light) w-6 sm:w-8 '} />  
            Log Out
          </button>
          <Link onClick={onClose} to={'/profile'} className="flex w-full gap-2">
              <Icon title={'watchList'} style={'fill-(--color-bg-light) w-6 sm:w-8 '} /> 
              Watchlist
            </Link>
        </div> 

    </div>
    </>
  )
}
function Nav() {
  const {user, setOpenMenu, userLogout, isOpen, setIsOpen} = useAuth()
  const openMenuModal = ()=> {
    setOpenMenu(true)
  }
  return (
    <nav className="flex sm:grid  sm:grid-cols-(--grid-nav) justify-center 
      sm:justify-items-center gap-2 w-full p-3 items-center bg-white">
        <Link to={`/`} className="flex items-center">
          <Icon title={'tv'}  style={'fill-(--color-bg) w-8 sm:w-10'}/>
          <h1 className=" hidden sm:block text-(--color-bg) sm:font-bold sm:text-2xl sm:mt-2">Watch List</h1>
        </Link>
        <Search></Search>
        {user ? (
          <>
            <Link to={'/profile'} className="hidden sm:block [grid-area:1/3/2/4]">
              <Icon title={'watchList'} style={'fill-(--color-bg) w-6 sm:w-8 '} /> 
            </Link>
            <button className="hidden sm:block cursor-pointer [grid-area:1/4/2/5]"  
              onClick={userLogout}>
                <Icon title={'logout'} style={'fill-(--color-bg) w-6 sm:w-8 '} />  
            </button>
            <div className="block sm:hidden h-full">
              <button className="cursor-pointer [grid-area:1/4/2/5] h-full"  
                onClick={openMenuModal}>
                  <Icon title={'menu'} style={'fill-(--color-bg) w-6 sm:w-8 '} />  
              </button>
              <Menu />

            </div>
          </>
        ): (
          <>
            <button className="cursor-pointer [grid-area:1/4/2/5]"  onClick={() => {setIsOpen(true)}}>
              <Icon title={'login'} style={'fill-(--color-bg) w-8 '} /> 
            </button>
            <Account />
          </>
        )
        }
    </nav>
  )
}

export default Nav