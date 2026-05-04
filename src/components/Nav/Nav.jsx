import Search from "./Search"
import './Nav.css'
import { Link } from "react-router-dom"
function Nav() {
  return (
    <nav>
        <Link to={`/`}><h1>Watch List</h1></Link>
        <Search></Search>
    </nav>
  )
}

export default Nav