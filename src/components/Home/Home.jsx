import Card from "../Card/Card"
import './Home.css'
function Home({data}) {

  return (
    <div className="home">
      {data && Object.entries(data.results).map(([key, value]) => <Card key={value.id} data={value}/>)}
    </div>
  )
}

export default Home