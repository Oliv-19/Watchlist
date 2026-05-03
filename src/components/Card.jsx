import './Card.css'
function Card({data}) {
  
  return (
    <div className="card">
        <p>{data.title}</p>
    </div>
  )
}

export default Card