import Search from "./Search"
import { Link } from "react-router-dom"
function Nav() {
  return (
    <nav className="flex justify-between w-full p-3 items-center">
        <Link to={`/`}><h1>Watch List</h1></Link>
        <Link to={`/serverStatus`}><h1>status</h1></Link>
        <Search></Search>
    </nav>
  )
}

export default Nav