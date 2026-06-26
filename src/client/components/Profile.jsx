import { useEffect, useState } from "react"
import { getUserMedia } from "../services/user"
import Card from "./Card"
import image from '../assets/image.png'
import { Link, useNavigate } from "react-router-dom"
import { Icon } from "./Icons"
import { useAuth } from "./AuthContext"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"


const UserMedia = ({serie})=> {
    const {media, userRating, userReview, status}= serie
    
    if(!media) return null
    const fullImageUrl = media.posterPath? 
      `${IMAGE_BASE_URL}${POSTER_SIZE}${media.posterPath}`
      : image
      
    const stars = Array(5).fill(0)
    return (
    <>
    <Link to={`/media/${media.id}`} className="w-40 h-65 sm:w-55 sm:h-75">
    <div title={media.title} className=" w-full h-full
        relative flex hover:scale-[1.1] transition-transform duration-300 p-2 ">
        <div className={`${status == 'saved' && 'hidden'} absolute bg-(--color-input-bg) 
        flex items-center justify-center w-10 sm:w-13 h-10 sm:h-13 rounded-4xl`}>
            <Icon title={status} 
                style={'w-6 sm:w-8 fill-(--color-bg-light)'}/>

        </div>
        <div className={`bg-(--color-input-bg) flex flex-col h-55 sm:h-full w-45
            ${userRating > 0 && 'sm:rounded-tr-none'} justify-around items-center 
             rounded-xl`}>
            <img src={fullImageUrl} alt="" className={`h-40 sm:h-55 rounded-xl`}/>
            <p className='truncate w-30 sm:w-full sm:px-3 text-center font-medium text-white'>
                {media.title}
            </p>
        </div>
        <div className={`${userRating ? 'flex' : 'hidden'} absolute right-2 sm:flex-col 
            py-2 h-fit bg-(--color-input-bg) w-20 sm:w-8 rounded-xl sm:rounded-r-xl`} 
            title={`${userRating} Stars`}>
            {stars.map((star, i) => 
                <Icon title={'rating'} key={i} style={`${userRating > i ? 
                    'fill-(--color-bg-light)' :
                    'fill-(--color-bg-light)/20' } w-6 sm:w-8`}/>
            )}
        </div>
        
    </div>
    </Link>
    </>
    )
}

export const Profile = () => {
    const [userMedia, setUserMedia] = useState(null)
    const {user} = useAuth()
    useEffect(()=> {
        const fetchUserMedia = async() => {    
            const media= await getUserMedia()
            setUserMedia(media)
        }
        fetchUserMedia()
    }, [])
    if(!userMedia || !user) return null
    
    return (
        <>
        <div className="bg-(--color-bg) w-full min-h-136 h-fit p-2 sm:p-10">
            <div className="w-full flex flex-row flex-wrap items-center justify-center
            sm:justify-start sm:gap-5 sm:p-2.5">
                {userMedia.map((serie) => 
                    <UserMedia serie={serie}
                        key={serie.media.id} />
                )}
            </div>
        </div>
        </>
    )
}