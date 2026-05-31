import { useState } from "react"
import { Account } from "./Account"
import Search from "./Search"
import { Link } from "react-router-dom"
function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="flex justify-between w-full p-3 items-center">
        <Link to={`/`}><h1>Watch List</h1></Link>
        <Search></Search>
        <button onClick={() => {setIsOpen(true)}}>Sign up</button>
        <Account isOpen={isOpen} onClose={()=> {setIsOpen(false)}}/>
    </nav>
  )
}

export default Nav