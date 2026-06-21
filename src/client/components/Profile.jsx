import { useEffect, useState } from "react"
import { getUserMedia } from "../services/user"
import Card from "./Card"
import image from '../assets/image.png'
import { Link } from "react-router-dom"
import { Icon } from "./Icons"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"


const UserMedia = ({media, rating, review})=> {
    if(!media) return null
    const fullImageUrl = media.posterPath? 
      `${IMAGE_BASE_URL}${POSTER_SIZE}${media.posterPath}`
      : image
      
    const stars = Array(5).fill(0)
    return (
    <>
    <Link to={`/media/${media.id}`}>
    <div title={media.title} className="h-65 sm:h-75 bg-(--color-input-bg)
        relative w-40 sm:w-50 rounded-xl grid grid-cols-[1fr 30px] grid-rows-[1fr 20px]
        hover:scale-[1.1] transition-transform duration-300 p-2 gap-1">
        <img src={fullImageUrl} alt="" className={`h-60 rounded-xl justify-self-center`}/>
        {rating && 
            <div className="flex flex-col [grid-area:1/2/2/3] " title={`${rating} Stars`}>
                {stars.map((star, i) => 
                    <Icon title={'rating'} key={i} style={`${rating > i ? 
                        'fill-(--color-bg-light)' :
                        'fill-(--color-bg-light)/20' } w-8`}/>
                )}
            </div>
        }
        <p  className='truncate [grid-area:2/1/3/2] w-full text-center font-medium text-white'>{media.title}</p>
    </div>
    </Link>
    </>
    )
}

export const Profile = () => {
    const [userMedia, setUserMedia] = useState(null)
    useEffect(()=> {
        const fetchUserMedia = async() => {
            const media= await getUserMedia()
            setUserMedia(media)
        }
        fetchUserMedia()
    }, [])
    if(!userMedia) return null
    
    return (
        <>
        <div className="bg-(--color-bg) w-full min-h-136 h-fit p-10">
            <div className="w-full flex flex-row flex-wrap justify-start gap-10 p-2.5">
                {userMedia.map((serie) => 
                    <UserMedia rating={serie.userRating} 
                        review={serie.userReview} 
                        media={serie.media} 
                        key={serie.media.id} />
                )}
            </div>
        </div>
        </>
    )
}