import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
const key= import.meta.env.VITE_API_KEY

const useSearch = (query)=>{
  const [media, setMedia] = useState(null) 
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${key}`
    }
  };
  useEffect(() => {
    async function fetchData () {
        const response = await fetch(url, options)
        const data = await response.json()
        setMedia(data.results)
    }
    fetchData()
  }, [query])
  
  return media
}

function SearchResults() {
    const location = useLocation()
    const query = location.state
    const results = useSearch(query)
    
    if(results == null){
        return <div>Loading...</div>
    }
    return (
        <div className="w-full flex flex-row flex-wrap justify-evenly gap-5">
        {results.map((value) => <Card data={value} key={value.id}></Card>)}
        </div>
    )
}

export default SearchResults