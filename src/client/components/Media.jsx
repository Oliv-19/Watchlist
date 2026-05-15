import { Link, useLocation } from "react-router-dom"
import { useSearch } from "./hooks"
import { Icon } from "./Icons"
import { format } from "date-fns"
import { useState } from "react"
import Card from "./Card"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"

const LeftInfo = ({data}) => {
    return(
        <div className="w-90 text-center flex flex-col gap-4 text-[18px] mt-5">
            <h1 className="text-4xl ">{data.name}</h1>
            {data.original_name != data.name && (<h5>{data.original_name}</h5>)  }
            <p className={`w-full text-[1rem] font-medium m-auto`}>
                {data.overview}
            </p>
        </div>
    )
}
const Details = ({title, info}) => {
    return(
        <div className="ml-20 flex gap-1.5 items-center ">
            <Icon title={title}/>
            {info}
        </div>
    )
}
const RightInfo = ({data}) => {
    const times = data?.episode_run_time;
    const min = times ?  Math.min(...times) : null
    const max =times ? Math.max(...times) : null

    return(
        <div className="w-80 self-center text-center flex flex-col gap-4 text-[1rem] items-start my-25">
            <div className="w-full h-10">
                <button className="h-full cursor-pointer">
                    add
                </button>
            </div>
            <Details title='rating' info={`${data.vote_average}`}/>
            <Details title='episodes' info={`${data.number_of_seasons} Seasons`}/>
            <Details title='episodes' info={`${data.number_of_episodes} Episodes`}/>

            {data.episode_run_time.length >0 && <Details title='episodes' info={`${data.episode_run_time.length >1 ?  `${min}-${max} min` : `${data.episode_run_time[0]} min`}`}/>}
            
            {data.genres.map((g) => <Details key={g.id} title='genre' info={g.name}/>)}
            <Details title='calendar' info={`${format(new Date(data.first_air_date), 'MMM d, y')} - ${format(new Date(data.last_air_date), 'MMM d, y')}`}/>
            <div className="pl-20 flex justify-evenly w-full flex-wrap">
                <h1 className="w-full font-bold">{data.created_by && (data.created_by.length > 1? 'Creators': 'Creator')}</h1>
                {data.created_by.map((creator)=> <Link title="Creator" className="underline underline-offset-5" key={creator.id} to={`/author/${creator.id}`}>{creator.name}</Link>)}
            </div>
        </div>
    )
}

const Cast = ({data}) => {
    return (
        <>
        {data.map((cast)=> 
            <Link to={`/actor/${cast.id}`} title={cast.name} key={cast.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-45 h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[75%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profile_path}`} alt="" />
                <p className="font-bold">{cast.name} </p>
                <p className="text-[0.9rem] text-gray-700">{cast.character} </p>
                
            </Link>
        )}
        </>
    )
}

const Similar = ({data}) => {
    return (
        <>
        {data.map((similar)=> 
            <Link to={`/${similar.id}`} state={similar.id} title={similar.name} key={similar.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-45 h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[75%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${similar.poster_path}`} alt="" />
                <p className="font-bold">{similar.name} </p>
                
            </Link>
        )}
        </>
    )
}

const InfoBlock = ({data}) => {
    const [block, setBlock] = useState('Cast')
    if(data == null){
        return <div>Loading...</div>
    }
    const blocks = {
        Cast: <Cast data={data.credits.cast} />,
        Similar: <Similar data={data.recommendations.results}></Similar>
    }
    
    const changeBlock = (e)=> {
        block != e.target.name && setBlock(e.target.name)
    }
    return (
        <div className="h-100 w-full">
            <nav className="text-center flex justify-center gap-5">
                {Object.entries(blocks).map(([key,val])=> 
                <button key={key} name={key} onClick={changeBlock}  className={`${block == key && 'underline'} text-white cursor-pointer hover:text-gray-400 font-bold text-center text-3xl`}>{key}</button>
                )}
            </nav>
            <div className="mx-20">
                <div className="flex h-full overflow-x-auto gap-5 py-5
                [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                    
                    {blocks[block]}
                </div>
            </div>
        </div>
    )
}

function Media() {
    const location = useLocation()
    const id = location.state
    console.log(id);
    
    const data = useSearch('media', null, null, id)
    if(data == null){
        return <div>Loading...</div>
    }
    
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`
    const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${data.backdrop_path}`
    
    return (
        <>
            {data && (
                <div className="bg-gray-950 w-full h-full">
                    <div className="h-fit relative ">
                        <img className={`w-full h-full object-cover absolute z-0 opacity-20`} src={fullBGImageUrl} alt="" />
                        <div className="pt-8 pb-2 w-full h-fit flex justify-evenly relative z-1 text-white">
                            <LeftInfo data={data}/>
                            <img className="h-fit" src={fullImageUrl} alt="" />
                            <RightInfo data={data} />

                        </div>
                    </div>
                    <InfoBlock data={data}></InfoBlock>
                </div>
            )
            }
        </>
        
    )
}

export default Media