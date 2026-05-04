import { useState } from "react"

function Search() {
    const [query, setQuery] = useState(null)
    const searchQuery = (e) => {
        e.preventDefault()
        
    }
  return (
    <form onSubmit={searchQuery}>
        <input type="text" onChange={(e)=>{setQuery(e.target.value)}} />
        <button>search</button>
    </form>
  )
}

export default Search