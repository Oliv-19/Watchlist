import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { updateUserMedia } from "../../services/user"
import { Icon } from "../Icons"
import { Link } from "react-router-dom"
import { ErrorMessage } from "../ErrorPage"
import { useMediaData } from "./MediaContext"
import { MediaReview } from "./MediaReview"
import Card from "../Card"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"


const Cast = ({data}) => { 
    
    if(data.length == 0) return <ErrorMessage message='No data found'/>
    return (
        <>
        {data.sort((a,b)=> a.order - b.order).map((cast)=> 
            <Link to={`/actor/${cast.id}`}>
                <div title={cast.name} className="h-fit relative  w-35 sm:w-45 flex justify-between 
                    items-center flex-col hover:scale-[1.1] transition-transform duration-300">
                    {
                        <>
                        <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profilePath}`} alt={cast.name}
                        className=' h-65 rounded border border-(--color-bg-light)/30'/>
                        </>
                    }
                    <p className="text-[0.8rem] sm:text-[1rem]  sm:font-bold text-(--color-text)">{cast.name} </p>
                    <p className="text-[0.6rem] sm:text-[0.9rem] text-gray-300">{cast.character} </p>
                </div>
            </Link>
        )}
        </>
    )
}

const Similar = ({data}) => {
    return (
        <>
        {data.map((similar)=> 
            <Card data={{...similar, name: similar.title}} key={similar.id}/>
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
                        className={`${block == key && 'underline'} text-(--color-text) 
                            cursor-pointer hover:text-gray-400 font-bold text-center 
                            text-[1rem] sm:text-3xl`}>
                        {key}
                    </button>
                )}
            </nav>
            <div className="mx-5 sm:mx-20 ">
                <div className="flex flex-wrap justify-center gap-8 py-5 w-full">
                    
                    {blocks[block]}
                </div>
            </div>
        </div>
    )
}