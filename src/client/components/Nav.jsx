import { useState } from "react"
import { Account } from "./Account"
import Search from "./Search"
import { Link } from "react-router-dom"
import { Icon } from "./Icons"
function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="flex justify-between w-full p-3 items-center">
        <Link to={`/`} className="flex items-center">
          <Icon title={'tv'}  style={'fill-(--color-bg) w-8 md:w-10'}/>
          <h1 className=" hidden md:block md:text-(--color-bg) md:font-bold md:text-2xl md:mt-2">Watch List</h1>
        </Link>
        <Search></Search>
        <button className="cursor-pointer"  onClick={() => {setIsOpen(true)}}>
          <Icon title={'account'} style={'fill-(--color-bg) w-8 md:w-10'} />
        </button>
        <Account isOpen={isOpen} onClose={()=> {setIsOpen(false)}}/>
    </nav>
  )
}

export default Nav