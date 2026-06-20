import { Link } from 'react-router-dom'
import image from '../assets/image.png'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"

function Card({data}) {
  const fullImageUrl = data.posterPath? 
  `${IMAGE_BASE_URL}${POSTER_SIZE}${data.posterPath}`
  : image
  return (
    <Link to={`/media/${data.id}`}>
      <div title={data.name? data.name : data.title} className="h-65 sm:h-87.5 relative w-40 sm:w-50 flex justify-between items-center flex-col hover:scale-[1.1] transition-transform duration-300">
          <img src={fullImageUrl} alt="" className='w-full h-80'/>
          <p  className='truncate w-full'>{data.name? data.name : data.title}</p>
      </div>
    </Link>
  )
}

export default Card