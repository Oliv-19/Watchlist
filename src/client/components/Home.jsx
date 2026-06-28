import { useState } from "react"
import Card from "./Card"
import {  useData } from "./hooks"
import { useEffect } from "react"
import { getOnAir } from "../services/media"
import { Icon } from "./Icons"
import { Link } from "react-router-dom"
import { useMemo } from "react"
import { LoadingHome } from "./Loading"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const BG_SIZE = "original"
function Slider({airingToday}){
  
  const data = useMemo(()=> airingToday.filter(item => item.backdropPath))

  const [index, setIndex] = useState(0)
  const info = data[index]
  if(!info) return null
  
  const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${info.backdropPath}`
  const style = 'w-10 cursor-pointer fill-[#f7f5f0] hover:hover:scale-[1.1] transition-transform duration-300 '
  const changeInfo = (dir)=> {
    setIndex(prev=> dir == 'L' ? (prev == 0? data.length-1 : prev-1):(prev == data.length-1 ? 0 : prev+1))
  }
  useEffect(()=> {
    const timer= setTimeout(()=>{ changeInfo('R') }, 5000)
    
    return () => clearTimeout(timer);
  }, [index])
  return (
    <>
      <div className="w-full h-50 sm:h-100 bg-gray-950 overflow-x-hidden">
        <div className="flex">
          {data.map((item, i) => 
            <img 
            key={item.id}
            src={`${IMAGE_BASE_URL}${BG_SIZE}${item.backdropPath}`}
            className={` w-full object-cover absolute z-0 h-50 sm:h-100 transition-opacity duration-700 ease-in-out
              ${i === index ? 'opacity-50' : 'opacity-0'}` }
              />
           
            )}
        </div>
           
        <div className="flex justify-between text-(--color-text) h-full sm:h-100 px-2 sm:px-15">
          <button className="relative" onClick={() => {changeInfo('L')}}>
            <Icon style={style} title={'prev'}/>
          </button>
          <Link to={`/media/${info.id}`} className="relative z-1 w-200 ">
            <div className="h-full flex items-center justify-center m-auto ">
              <h1 className="text-center text-2xl sm:text-5xl font-medium">{info.name}</h1>
            </div>
          </Link>
          <button className="relative" onClick={() => {changeInfo('R')}}>
            <Icon style={style} title={'next'}/>
          </button>
        </div>
      </div>
    </>
  )
}

function Home() {
  const data = useData({type:'onAir'})
  const {onAir, airingToday} = {...data}
  if(onAir == null){
      return <div>
        <LoadingHome/>
      </div>
  }
  return (
    <>
    <Slider airingToday={airingToday}/>
      <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5 pt-10
        bg-(--color-bg-2)">
        {Object.entries(onAir).map(([key, value]) => <Card key={key} data={value}/>)}
      </div>
    </>
  )
}

export default Home