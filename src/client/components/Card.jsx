import { Link } from 'react-router-dom'
import { Icon } from './Icons'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"

function Card({data}) {
  const poster = data.posterPath || data.poster_path
  const fullImageUrl =  poster &&
  `${IMAGE_BASE_URL}${POSTER_SIZE}${poster}`
  
  return (
    <Link to={`/media/${data.id}`}>
      <div title={data.name} className="h-65 sm:h-87.5 relative w-40 sm:w-50 flex justify-between items-center flex-col hover:scale-[1.1] transition-transform duration-300">
          {fullImageUrl ? 
          (
            <>
            <img src={fullImageUrl} alt={data.name}
            className='w-full h-80 rounded border border-(--color-bg-light)/30'/>
            </>
          ): (
            <>
            <div className='w-full h-80 rounded border-3 border-(--color-bg-light)/30 
              relative flex justify-center items-center bg-(--color-bg)'>
              <Icon title={'brokenImage'} style={'w-40 fill-(--color-bg-light)/50'}/>
            </div>
            </>
          )
          }
          <p  className='truncate w-full text-(--color-text) font-medium'>{data.name}</p>
      </div>
    </Link>
  )
}

export default Card