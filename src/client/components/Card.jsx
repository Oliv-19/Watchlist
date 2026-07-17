import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import { useDataInfo } from './DataContext'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"

function Card({data}) {
  const poster = data.posterPath || data.poster_path
  const fullImageUrl =  poster &&
  `${IMAGE_BASE_URL}${POSTER_SIZE}${poster}`
  const {searchUserMedia}= useDataInfo()
  
  const saved = searchUserMedia(data.id)
  
  return (
    <Link to={`/media/${data.id}`}>
      <div title={data.name} className="h-65 sm:h-87.5 relative w-40 sm:w-50 flex justify-between items-center flex-col hover:scale-[1.1] transition-transform duration-300">
          {saved && 
            <div className={`absolute left-0 bg-(--color-bg-2)/80 flex items-center justify-center w-10 sm:w-13 
              h-10 sm:h-13 rounded-4xl`}>
              <Icon title={'add'} 
                style={'w-6 sm:w-8 fill-(--color-bg-light)'}/>
            </div>
          }
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