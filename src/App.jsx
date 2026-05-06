import { useEffect, useRef, useState } from 'react'
import Home from './components/Home'
import Media from './components/Media'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import SearchResults from './components/SearchResults'
import './App.css'
const key= import.meta.env.VITE_API_KEY

const usePopular = ()=>{
  const [media, setMedia] = useState(null) 
  const url = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${key}`
    }
  };
  useEffect(() => async()=>{
    let popular = null
    if(localStorage.getItem('popular')){
      popular= JSON.parse(localStorage.getItem('popular'))
    }else{
      popular = await fetch(url, options)
      popular= await popular.json()
      localStorage.setItem('popular', JSON.stringify(popular))
    }
    setMedia(popular)
  }, [])
  
  return media
}

function App() {
  const popular = usePopular()
   return (
    <div className="w-full h-full text-base m-0 p-0">
      <Nav />
      <Routes>
        <Route path="/" element={<Home data={popular} />} />
        <Route path="/:id" element={<Media />} />
        <Route path="/search/:query" element={<SearchResults />}/>
      </Routes>
    </div>
  );
}

export default App
