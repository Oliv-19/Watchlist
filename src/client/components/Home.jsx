import { useState } from "react"
import Card from "./Card"
import {  useData } from "./hooks"
import { useEffect } from "react"
import { getOnAir } from "../services/media"
function Home() {
  const onAir = useData({type:'onAir'})
  if(onAir == null){
      return <div>Loading...</div>
  }
  return (
    <>
      <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
        {onAir && Object.entries(onAir.results).map(([key, value]) => <Card key={key} data={value}/>)}
      </div>
    </>
  )
}

export default Home