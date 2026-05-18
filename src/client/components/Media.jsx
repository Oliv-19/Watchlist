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
        <div className="w-90 text-center flex flex-col gap-4 text-[18px] mt-5 justify-center">
            <h1 className="text-4xl ">{data.name}</h1>
            {data.original_name != data.name && (<h5>{data.original_name}</h5>)  }
            <p className={`w-full text-[1rem] font-medium `}>
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
        <div className="w-80 flex flex-col justify-center">
            <div className="w-full h-20 flex items-center justify-center">
                <button className="h-full cursor-pointer">
                    <Icon title={'add'} style={'w-8 fill-white hover:stroke-white'}></Icon>
                </button>
            </div>
            <div className="w-full text-center flex flex-col gap-4 text-[1rem] items-start">
                <Details title='rating' info={`${data.vote_average.toFixed(1)}`}/>
                <Details title='episodes' info={`${data.number_of_seasons} Seasons`}/>
                <Details title='episodes' info={`${data.number_of_episodes} Episodes`}/>

                {data.episode_run_time.length >0 && <Details title='episodes' info={`${data.episode_run_time.length >1 ?  `${min}-${max} min` : `${data.episode_run_time[0]} min`}`}/>}
                
                {data.genres.map((g) => <Details key={g.id} title='genre' info={g.name}/>)}
                <Details title='calendar' info={`${format(new Date(data.first_air_date), 'MMM d, y')} - ${format(new Date(data.last_air_date), 'MMM d, y')}`}/>
                {data.created_by?.length >=1  &&
                    <div className="flex justify-evenly w-full flex-wrap">
                        <h1 className="w-full font-bold">{data.created_by && (data.created_by.length > 1? 'Creators': 'Creator')}</h1>
                        {data.created_by.map((creator)=> <Link title="Creator" className="underline underline-offset-5" key={creator.id} to={`/author/${creator.id}`} state={creator.id}>{creator.name}</Link>)}
                    </div>
                }
            </div>
        </div>
    )
}

const Cast = ({data}) => {
    return (
        <>
        {data.map((cast)=> 
            <Link to={`/actor/${cast.id}`} state={cast.id} title={cast.name} key={cast.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-45 h-70 bg-neutral-50 p-1 rounded-xl text-center">
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
        <div className="bg-[#0f0c2f] h-100 w-full py-10">
            <nav className="text-center flex justify-evenly gap-5">
                {Object.entries(blocks).map(([key,val])=> 
                <button key={key} name={key} onClick={changeBlock}  className={`${block == key && 'underline'} text-white cursor-pointer hover:text-gray-400 font-bold text-center text-3xl`}>{key}</button>
                )}
            </nav>
            <div className="mx-20">
                <div className="flex h-full overflow-x-auto gap-5 py-5
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

function Media() {
    const location = useLocation()
    const id = location.state
    
    const data = useSearch('media', null, null, id)
    if(data == null){
        return <div>Loading...</div>
    }
    console.log(data)
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`
    const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${data.backdrop_path}`
    
    return (
        <>
            {data && (
                <div className="w-full h-full">
                    <div className="bg-gray-950 h-fit relative">
                        <img className={`w-full h-full object-cover absolute z-0 opacity-20`} src={fullBGImageUrl} alt="" />
                        <div className="pt-8 pb-2 w-full h-fit flex justify-evenly relative z-1 text-white">
                            <LeftInfo data={data}/>
                            <img className="h-fit" src={fullImageUrl} alt="" />
                            <RightInfo data={data} />

                        </div>
                        <div class="absolute -bottom-5 left-0 right-0 h-16 bg-linear-to-b from-transparent to-bg-[#0f0c2f]/30 backdrop-blur-md pointer-events-none"></div>

                    </div>
                    <InfoBlock data={data}></InfoBlock>
                </div>
            )
            }
        </>
        
    )
}

export default Media