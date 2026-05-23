import { useState } from "react"
import Card from "./Card"
import { useSearch } from "./hooks"
import { useEffect } from "react"
function Home() {
  const [onAir, setOnAir] = useState(() => {
    const saved = localStorage.getItem('onAir')
    return saved ? JSON.parse(saved) : null
  })
  const fetchedData =  useSearch(onAir? null : 'onAir')
  useEffect(() => {
    if(typeof fetchedData == 'object'){
      setOnAir(fetchedData)
      localStorage.setItem('onAir', JSON.stringify(fetchedData))
    }
  }, [fetchedData])
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