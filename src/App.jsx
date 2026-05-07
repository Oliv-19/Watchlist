import { useEffect, useRef, useState } from 'react'
import Home from './components/Home'
import Media from './components/Media'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import SearchResults from './components/SearchResults'
import './App.css'
import { useSearch } from './components/hooks'
const key= import.meta.env.VITE_API_KEY

function App() {
  const [popular, setPopular] = useState(() => {
    const saved = localStorage.getItem('popular')
    return saved ? JSON.parse(saved) : null
  })

  const fetchedData = useSearch(popular? null: 'popular')
  useEffect(() => {
    if(fetchedData){
      setPopular(fetchedData)
      localStorage.setItem('popular', JSON.stringify(fetchedData))
    }
  }, [fetchedData])
  
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
