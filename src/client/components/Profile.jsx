import { useEffect, useState } from "react"
import { getUserMedia } from "../services/user"
import Card from "./Card"
import image from '../assets/image.png'
import { Link } from "react-router-dom"
import { Icon } from "./Icons"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"


const UserMedia = ({serie})=> {
    const {media, userRating, userReview, status}= serie
    console.log(serie);
    
    if(!media) return null
    const fullImageUrl = media.posterPath? 
      `${IMAGE_BASE_URL}${POSTER_SIZE}${media.posterPath}`
      : image
      
    const stars = Array(5).fill(0)
    return (
    <>
    <Link to={`/media/${media.id}`}>
    <div title={media.title} className="
        relative flex hover:scale-[1.1] transition-transform duration-300 p-2 ">
        <div className={`${status == 'saved' && 'hidden'} absolute bg-(--color-input-bg) flex items-center 
        justify-center w-13 h-13 rounded-4xl`}>
            <Icon title={status} 
                style={'w-8 fill-(--color-bg-light)'}/>

        </div>
        <div className={`bg-(--color-input-bg) flex flex-col 
            ${userRating > 0 && 'rounded-tr-none'} justify-around items-center 
            h-65 sm:h-75 w-40 sm:w-50 rounded-xl`}>
            <img src={fullImageUrl} alt="" className={`h-60  rounded-xl 
                justify-self-center`}/>
            <p className='truncate w-full text-center font-medium text-white'>
                {media.title}
            </p>
        </div>
        {userRating && 
            <div className="flex flex-col py-2 h-fit bg-(--color-input-bg) 
            rounded-r-xl" title={`${userRating} Stars`}>
                {stars.map((star, i) => 
                    <Icon title={'rating'} key={i} style={`${userRating > i ? 
                        'fill-(--color-bg-light)' :
                        'fill-(--color-bg-light)/20' } w-8`}/>
                )}
            </div>
        }
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
                    <UserMedia serie={serie}
                        key={serie.media.id} />
                )}
            </div>
        </div>
        </>
    )
}