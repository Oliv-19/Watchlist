import { useRef } from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Search() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const search = (e) => {
    e.preventDefault()
    setQuery('')
    navigate(`/search/${query}`, {state: query})
  }
  return (
    <form onSubmit={search}>
        <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} />
        <button type="submit">search</button>
    </form>
  )
}

export default Search