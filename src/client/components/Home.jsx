import Card from "./Card"
function Home({data}) {
  
  return (
    <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
      {data && Object.entries(data.results).map(([key, value]) => <Card key={key} data={value}/>)}
    </div>
  )
}

export default Home