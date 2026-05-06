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
    <form className="w-75" onSubmit={search}>   
      <label for="search" class=" text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
          <div class="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
          </div>
          <input value={query} onChange={(e)=>{setQuery(e.target.value)}} type="search" id="search" class="block w-full p-2 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
          <button type="submit" class="bg-black absolute text-[0.8rem] font-bold inset-e-1.5 top-0.5 text-white hover:cursor-pointer hover:bg-gray-700 box-border border border-transparen leading-5 rounded px-3 py-1.5 focus:outline-none">Search</button>
      </div>
  </form>
  )
}

export default Search