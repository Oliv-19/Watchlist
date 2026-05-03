import { useEffect, useRef, useState } from 'react'
import Home from './components/Home'
const key= import.meta.env.VITE_API_KEY

const usePopular = ()=>{
  const [media, useMedia] = useState(null)
  const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
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
    useMedia(popular)
  }, [])
  
  return media
}

function App() {
  const popular = usePopular()
  return (
    <>
      <Home data={popular}></Home>
    </>
  )
}

export default App
