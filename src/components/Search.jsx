import { useReducer, useRef } from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { urlReducer } from "./reducers/urlReducer"

function Search() {
  const [query, setQuery] = useState('')
  const [url, dispatch] = useReducer(urlReducer, '')
  const navigate = useNavigate()
  const search = (e) => {
    e.preventDefault()
    setQuery('')
    navigate(`/search/${query}`, {state: query})
    dispatch({type:'searchAll', payload:{query}})
  }
  return (
    <form className="w-75" onSubmit={search}>   
      <label htmlFor="search" className=" text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
          </div>
          <input value={query} onChange={(e)=>{setQuery(e.target.value)}} type="search" id="search" className="block w-full p-2 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
          <button type="submit" className="bg-black absolute text-[0.8rem] font-bold inset-e-1.5 top-0.5 text-white hover:cursor-pointer hover:bg-gray-700 box-border border border-transparen leading-5 rounded px-3 py-1.5 focus:outline-none">Search</button>
      </div>
  </form>
  )
}

export default Search