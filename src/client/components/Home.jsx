import { useState } from "react"
import Card from "./Card"
import {  useData } from "./hooks"
import { useEffect } from "react"
import { getOnAir } from "../services/media"
import { Icon } from "./Icons"
import { Link } from "react-router-dom"
import { useMemo } from "react"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const BG_SIZE = "original"
function Carousel({airingToday}){
  
  const data = useMemo(()=> airingToday.filter(item => item.backdropPath))

  const [index, setIndex] = useState(0)
  const info = data[index]
  if(!info) return null
  
  const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${info.backdropPath}`
  const style = 'w-10 cursor-pointer fill-[#f7f5f0] hover:hover:scale-[1.1] transition-transform duration-300 '
  const changeInfo = (dir)=> {
    setIndex(prev=> {
      if(dir == 'L' ){
        return prev == 0? data.length-1 : prev-1
      }
      return prev == data.length-1 ? 0 : prev+1
    })
  }
  useEffect(()=> {
    const timer= setTimeout(()=>{ changeInfo('R') }, 5000)
    
    return () => clearTimeout(timer);
  }, [index])
  return (
    <>
      <div className="w-full h-50 md:h-100">
        <img className="w-full  object-cover absolute z-0 opacity-50 h-50 md:h-100" src={fullBGImageUrl}></img>
        <div className="bg-gray-950 flex justify-between text-white h-full md:h-100 px-2 md:px-15">
          <div className="text-center font-medium absolute md:left-5 md:mt-2 z-1 bg-(--color-input-bg) p-1 md:p-5 rounded-4xl">Airing Today</div>
          <button className="relative" onClick={() => {changeInfo('L')}}>
            <Icon style={style} title={'prev'}/>
          </button>
          <Link to={`/media/${info.id}`} className="relative z-1 w-200 ">
            <div className="h-full flex items-center justify-center m-auto ">
              <h1 className="text-center text-2xl md:text-5xl font-medium">{info.name}</h1>
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
      return <div>Loading...</div>
  }
  return (
    <>
    <Carousel airingToday={airingToday}/>
      <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
        {Object.entries(onAir).map(([key, value]) => <Card key={key} data={value}/>)}
      </div>
    </>
  )
}

export default Home