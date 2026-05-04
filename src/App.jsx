import { useEffect, useRef, useState } from 'react'
import Home from './components/Home'
const key= import.meta.env.VITE_API_KEY

const usePopular = ()=>{
  const [media, useMedia] = useState(null)
  const url = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=JP%7CCN%7CKR&without_genres=16"
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
