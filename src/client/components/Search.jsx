import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "./Icons"

function Search() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const search = (e) => {
    e.preventDefault()
    setQuery('')
    navigate(`/search/${query}`)
  }
  return (
    <form id="searchForm" className="w-60 sm:w-75" onSubmit={search}>   
      <label htmlFor="search" className=" text-gray-900 sr-only 
      dark:text-(--color-text)">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
             <Icon title='search'/>
          </div>
          <input value={query} onChange={(e)=>{setQuery(e.target.value)}} type="search" id="search" className="block w-full p-2 ps-9 bg-neutral-secondary-medium border border-default-medium border-(--color-bg) text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
          <button type="submit" form="searchForm" className="bg-(--color-bg) absolute text-[0.8rem] font-bold right-0.5 top-0.5 text-(--color-text) hover:cursor-pointer hover:bg-gray-700 box-border border border-transparen leading-5 rounded-lg px-3 py-1.5 focus:outline-none">Search</button>
      </div>
  </form>
  )
}

export default Search