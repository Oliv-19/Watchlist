import { format, parseISO } from "date-fns"
import { Icon } from "../Icons"
import { Link } from "react-router-dom"
import { saveUserMedia } from "../../services/user"
import { useAuth } from "../AuthContext"
import { useState } from "react"
import { useMediaData } from "./MediaContext"
import { ErrorMessage } from "../ErrorPage"

const Details = ({title, info}) => {
    return(
        <div className="sm:ml-20 flex gap-1.5 items-center text-(--color-text)">
            <Icon title={title} style={'w-6 fill-(--color-text)'}/>
            {info}
        </div>
    )
}
export const LeftInfo = () => {
    const {data} = useMediaData()
    if(!data) return null
    return(
        <div className="text-(--color-text) sm:w-90 text-center flex flex-col gap-4 
            text-[18px] mt-5 justify-center">
            <h1 className="text-4xl ">{data.title}</h1>
            {data.originalTitle != data.title && (<h5>{data.originalTitle}</h5>)  }
            <div className="max-h-80 sm:px-5 w-full overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                <p className={`p-3 sm:p-0 w-full text-[1rem] font-medium `}>
                    {data.overview}
                </p>
                    
            </div>
            
        </div>
    )
}

export const RightInfo = () => {
    const {data, saved, setIsSaved} = useMediaData()
    
    const {user} = useAuth()
    if(!data) return null
    const times = data?.episodeRunTime;
    const min = times ?  Math.min(...times) : null
    const max =times ? Math.max(...times) : null
    const release = data.releaseDate? format(parseISO(data.releaseDate), 'PP'): '?'
    const finished = data.finishedDate? format(parseISO(data.finishedDate), 'PP'): '?'
    const add = async() => {
        try{
            await saveUserMedia(data.id)
            setIsSaved(true)
        }catch{
            console.error("Couldn't save media");
            
        }
    }
    return(
        <div className="w-full sm:w-80 flex flex-col justify-center text-(--color-text)">
            <div className="w-full h-20 flex items-center justify-center">
                {user && 
                    <button className="h-full cursor-pointer" onClick={add}>
                        <Icon title={'add'} style={`stroke-3 stroke-(--color-text)
                        hover:fill-(--color-text) focus:fill-(--color-text)
                        w-8 ${!saved ? 
                            'fill-transparent': 
                            'fill-(--color-text)'} `} />
                    </button>
                }
            </div>
            <div className="text-(--color-text) p-8 sm:p-0 w-full text-center flex flex-row flex-wrap sm:flex-col gap-4 text-[1rem] justify-center sm:items-start">
                <Details title='rating' info={`${data.rating.toFixed(1)}`}/>
                <Details title='episodes' info={`${data.seasons} Seasons`}/>
                <Details title='episodes' info={`${data.episodes} Episodes`}/>

                {data.episodeRunTime.length >0 && <Details title='episodes' info={`${data.episodeRunTime.length >1 ?  `${min}-${max} min` : `${data.episodeRunTime[0]} min`}`}/>}
                
                {data.genres.map((g) => <Details key={g} title='genre' info={g}/>)}
                <Details title='calendar' info={`${release} - ${finished}`}/>
                {data.creators?.length >=1  &&
                    <div className="text-(--color-text) flex justify-evenly w-full flex-wrap">
                        <h1 className="w-full font-bold">{data.creators && (data.creators.length > 1? 'Creators': 'Creator')}</h1>
                        {data.creators.map((creator)=> <Link title="Creator" className="underline underline-offset-5" key={creator.id} to={`/author/${creator.id}`} state={creator.id}>{creator.name}</Link>)}
                    </div>
                }
            </div>
        </div>
    )
}
