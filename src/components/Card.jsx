import { Link } from 'react-router-dom'
import image from '../assets/image.png'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"

function Card({data}) {
  const fullImageUrl = data.poster_path? 
  `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`
  : image
  return (
    <Link to={`/${data.id}`} state={data}>
      <div className="h-87.5 w-50 flex justify-between items-center flex-col hover:scale-[1.1] transition-transform duration-300">
          <img src={fullImageUrl} alt="" className='w-50'/>
          <p>{data.name}</p>
      </div>
    </Link>
  )
}

export default Card