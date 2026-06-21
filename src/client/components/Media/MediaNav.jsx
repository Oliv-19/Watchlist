import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { updateUserMedia } from "../../services/user"
import { Icon } from "../Icons"
import { Link } from "react-router-dom"
import { ErrorMessage } from "../ErrorPage"
import { useMediaData } from "./MediaContext"
import { MediaReview } from "./MediaReview"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"


const Cast = ({data}) => { 
    if(data.length == 0) return <ErrorMessage message='No data found'/>
    return (
        <>
        {data.sort((a,b)=> a.order - b.order).map((cast)=> 
            <Link to={`/actor/${cast.id}`} title={cast.name} key={cast.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-35 sm:w-45 h-55 sm:h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[75%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profilePath}`} alt="" />
                <p className="text-[0.8rem] sm:text-[1rem]  sm:font-bold">{cast.name} </p>
                <p className="text-[0.6rem] sm:text-[0.9rem] text-gray-700">{cast.character} </p>
                
            </Link>
        )}
        </>
    )
}

const Similar = ({data}) => {
    return (
        <>
        {data.map((similar)=> 
            <Link to={`/media/${similar.id}`} state={similar.id} title={similar.title} key={similar.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-35 sm:w-45 h-55 sm:h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[80%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${similar.posterPath}`} alt="" />
                <p className="font-bold text-[0.8rem] sm:text-[1rem]">{similar.title} </p>
                
            </Link>
        )}
        </>
    )
}

export const MediaNav = () => {
    const {user} = useAuth()
    const [block, setBlock] = useState('Cast')
    const {data} = useMediaData()
    if(data == null){
        return <div>Loading...</div>
    }
    const blocks = {
        Cast: <Cast data={data.cast} />,
        Similar: <Similar data={data.similar} />
    }
    const changeBlock = (e)=> {
        block != e.target.name && setBlock(e.target.name)
    }
    return (
        <div className="bg-(--color-bg) h-fit w-full ">
            <nav className="text-center flex justify-evenly gap-5 pt-10">
                {Object.entries(blocks).map(([key,val])=> 
                    <button key={key} name={key} onClick={changeBlock}  
                        className={`${block == key && 'underline'} text-white 
                            cursor-pointer hover:text-gray-400 font-bold text-center 
                            text-[1rem] sm:text-3xl`}>
                        {key}
                    </button>
                )}
            </nav>
            <div className="mx-5 sm:mx-20 ">
                <div className="flex h-fit w-full overflow-x-auto gap-2 sm:gap-5 
                py-5 overflow-y-hidden
                [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                    
                    {blocks[block]}
                </div>
            </div>
        </div>
    )
}