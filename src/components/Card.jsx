import { Link } from 'react-router-dom';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w342"; // Options: w92, w154, w185, w342, w500, w780, original
function Card({data}) {
  const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`

  return (
    <Link to={`/${data.id}`} state={data}>
      <div className="h-87.5 flex justify-between flex-col hover:scale-[1.1] transition-transform duration-300">
          <img src={fullImageUrl} alt="" className='h-75'/>
          <p>{data.name}</p>
      </div>
    </Link>
  )
}

export default Card