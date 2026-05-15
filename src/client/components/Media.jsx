import { Link, useLocation } from "react-router-dom"
import { useSearch } from "./hooks"
import { Icon } from "./Icons"
import { format } from "date-fns"
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
            {data.genres.map((g) => <Details key={g.id} title='genre' info={g.name}/>)}
            <Details title='calendar' info={`${format(new Date(data.first_air_date), 'MMM d, y')} - ${format(new Date(data.last_air_date), 'MMM d, y')}`}/>
            <div className="pl-20 flex justify-evenly w-full flex-wrap">
                <h1 className="w-full font-bold">{data.created_by.length > 1? 'Creators': 'Creator'}</h1>
                {data.created_by.map((creator)=> <Link title="Creator" className="underline underline-offset-5" key={creator.id} to={`/author/${creator.id}`}>{creator.name}</Link>)}
            </div>
        </div>
    )
}

const Cast = ({data}) => {
    return (
        <div className="">
            
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
    
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`
    const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${data.backdrop_path}`
    
    return (
        <>
            {data && (
                <div className="bg-black w-full h-full">
                    <div className="h-fit relative">
                        <img className={`w-full h-full object-cover absolute z-0 opacity-20`} src={fullBGImageUrl} alt="" />
                        <div className="pt-8 pb-2 w-full h-fit flex justify-evenly relative z-1 text-white">
                            <LeftInfo data={data}/>
                            <img className="h-fit" src={fullImageUrl} alt="" />
                            <RightInfo data={data} />

                        </div>
                    </div>
                    <div className="h-100 w-full ">
                        <Cast data={data}></Cast>
                    </div>
                </div>
            )
            }
        </>
        
    )
}

export default Media