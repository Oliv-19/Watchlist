import { Link, useParams } from "react-router-dom"
import { Icon } from "./Icons"
import { format, parseISO } from "date-fns"
import { useState } from "react"
import Card from "./Card"
import { getMedia } from "../services/media"
import { useEffect } from "react"
import { useData } from "./hooks"
import { saveUserMedia, updateUserMedia } from "../services/user"
import { useAuth } from "./AuthContext"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"

const LeftInfo = ({data}) => {
    return(
        <div className="md:w-90 text-center flex flex-col gap-4 text-[18px] mt-5 justify-center">
            <h1 className="text-4xl ">{data.title}</h1>
            {data.originalTitle != data.title && (<h5>{data.originalTitle}</h5>)  }
            <div className="max-h-80 md:px-5 w-full overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                <p className={`p-3 md:p-0 w-full text-[1rem] font-medium `}>
                    {data.overview}
                </p>
                    
            </div>
            
        </div>
    )
}
const Details = ({title, info}) => {
    return(
        <div className="md:ml-20 flex gap-1.5 items-center ">
            <Icon title={title}/>
            {info}
        </div>
    )
}

const UserReview = ({data}) => {
    const {user, userLogout} = useAuth()
    const [rating, setRating] = useState(data.userRating ? data.userRating: 0)
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState(null)
    if(!data) return null
    const stars = Array(5).fill(0)

    useEffect(()=> {
        const saveReview = async () => {
            if(formData){
                console.log('front');
                await updateUserMedia(formData)
            }
            
        }
        saveReview()
    }, [formData])
    
    const sendReview = async(e)=> {
        e.preventDefault()
        const form = new FormData(e.target)
        setFormData({rating: rating, review: form.get('review'), id: data.id})
        setIsEdit(false)
    }
    return (
    <div className="w-full h-fit mt-2 flex items-center 
            justify-center">
        {user && 
        <form onSubmit={sendReview} className={` w-fit p-10 flex flex-col items-center 
            justify-center rounded-xl gap-6 bg-(--color-text-bg) 
            ${isEdit && ' outline-2 outline-(--color-bg-light)'}`}>
            <div className={`w-198.75 flex justify-between `}>
                <div className="flex items-center " title={`${rating} Stars`}>
                    {stars.map((star, i) => {
                        return isEdit ? (
                            <label className="cursor-pointer" key={i} onClick={()=> setRating(i+1)}>
                                <Icon title={'rating'}  style={`${rating > i ? 
                                'fill-(--color-bg-light)' :
                                'fill-(--color-bg-light)/50' } w-10
                                hover:stroke-(--color-bg-light) hover:stroke-2`}/>
                                <input type="radio"  className="hidden" name={`star${i+1}`} 
                                    id={`star${i+1}`} />
                            </label>

                        ):(
                            <Icon key={i} title={'rating'}  style={`${rating > i ? 
                            'fill-(--color-bg-light)' :
                            'fill-(--color-bg-light)/50' } w-10`}/>
                        )}
                    )}
                    <p className="ml-2 text-(--color-focus)" >{rating} Stars</p>
                </div>
                <button type="submit" className={`${!isEdit && 'hidden'} py-2 w-20 text-(--color-bg) 
                font-medium rounded-4xl bg-(--color-bg-light) cursor-pointer`}>
                    Save
                </button>
                <button type='button' className={`${isEdit && 'hidden'} py-2 w-20 text-(--color-bg) 
                font-medium rounded-4xl bg-(--color-bg-light) cursor-pointer`}
                onClick={()=> {setIsEdit(true)}}>
                    Edit
                </button>
                
            </div>
            <textarea readOnly={!isEdit} draggable='false' name="review" id="review" cols={70} placeholder="What do you think? "
                rows={5} className={`bg-(--color-input-bg) p-10 rounded-2xl resize-none 
                text-white ${isEdit ? 'focus:outline-2 focus:outline-(--color-bg-light)' 
                : 'focus:outline-none'}`}/>
        </form>
        }
    </div>
    )
}
const RightInfo = ({data}) => {
    const times = data?.episodeRunTime;
    const min = times ?  Math.min(...times) : null
    const max =times ? Math.max(...times) : null
    const release = data.releaseDate? format(parseISO(data.releaseDate), 'PP'): '?'
    const finished = data.finishedDate? format(parseISO(data.finishedDate), 'PP'): '?'
    const add = async() => {
        await saveUserMedia(data.id)
    }   
    return(
        <div className="w-full md:w-80 flex flex-col justify-center">
            <div className="w-full h-20 flex items-center justify-center">
                <button className="h-full cursor-pointer" onClick={add}>
                    <Icon title={'add'} style={'w-8 fill-white hover:stroke-white'} />
                </button>
            </div>
            <div className="p-8 md:p-0 w-full text-center flex flex-row flex-wrap md:flex-col gap-4 text-[1rem] justify-center md:items-start">
                <Details title='rating' info={`${data.rating.toFixed(1)}`}/>
                <Details title='episodes' info={`${data.seasons} Seasons`}/>
                <Details title='episodes' info={`${data.episodes} Episodes`}/>

                {data.episodeRunTime.length >0 && <Details title='episodes' info={`${data.episodeRunTime.length >1 ?  `${min}-${max} min` : `${data.episodeRunTime[0]} min`}`}/>}
                
                {data.genres.map((g) => <Details key={g} title='genre' info={g}/>)}
                <Details title='calendar' info={`${release} - ${finished}`}/>
                {data.creators?.length >=1  &&
                    <div className="flex justify-evenly w-full flex-wrap">
                        <h1 className="w-full font-bold">{data.creators && (data.creators.length > 1? 'Creators': 'Creator')}</h1>
                        {data.creators.map((creator)=> <Link title="Creator" className="underline underline-offset-5" key={creator.id} to={`/author/${creator.id}`} state={creator.id}>{creator.name}</Link>)}
                    </div>
                }
            </div>
        </div>
    )
}

const Cast = ({data}) => { 
    return (
        <>
        {data.sort((a,b)=> a.order - b.order).map((cast)=> 
            <Link to={`/actor/${cast.id}`} title={cast.name} key={cast.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-35 md:w-45 h-55 md:h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[75%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profilePath}`} alt="" />
                <p className="text-[0.8rem] md:text-[1rem]  md:font-bold">{cast.name} </p>
                <p className="text-[0.6rem] md:text-[0.9rem] text-gray-700">{cast.character} </p>
                
            </Link>
        )}
        </>
    )
}

const Similar = ({data}) => {
    return (
        <>
        {data.map((similar)=> 
            <Link to={`/${similar.id}`} state={similar.id} title={similar.title} key={similar.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-35 md:w-45 h-55 md:h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[80%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${similar.posterPath}`} alt="" />
                <p className="font-bold text-[0.8rem] md:text-[1rem]">{similar.title} </p>
                
            </Link>
        )}
        </>
    )
}

const InfoBlock = ({data}) => {
    const {user, userLogout} = useAuth()
    const [block, setBlock] = useState(user? 'Review': 'Cast')
    if(data == null){
        return <div>Loading...</div>
    }
    const blocks = {
        Cast: <Cast data={data.cast} />,
        Similar: <Similar data={data.similar}></Similar>,
    }
    if (user){
        blocks.Review = <UserReview  data={data}/>
    }
    const changeBlock = (e)=> {
        block != e.target.name && setBlock(e.target.name)
    }
    return (
        <div className="bg-[#0f0c2f] h-120 w-full py-10">
            <nav className="text-center flex justify-evenly gap-5">
                {Object.entries(blocks).map(([key,val])=> 
                    <button key={key} name={key} onClick={changeBlock}  
                        className={`${block == key && 'underline'} text-white 
                            cursor-pointer hover:text-gray-400 font-bold text-center 
                            text-3xl`}>
                                {key}
                    </button>
                )}
            </nav>
            <div className="mx-5 md:mx-20 ">
                <div className="flex h-fit w-full overflow-x-auto gap-2 md:gap-5 
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

function Media() {
    const {id} = useParams()
    const data = useData({type: 'media', id})
    
    if(data == null){
        return <div>Loading...</div>
    }
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.posterPath}`
    const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${data.backdropPath}`
    
    return (
        <>
            {data && (
                <div className="w-full h-full">
                    <div className="bg-(--color-bg) h-fit pb-4 md:h-full relative ">
                        <img className={`mask-b-from-75% mask-b-to-transparent w-full h-full object-cover absolute z-0 opacity-35`} src={fullBGImageUrl} alt="" />
                        <div className="pt-8 pb-2 w-full h-fit flex flex-col md:flex-row justify-evenly relative z-1 text-white">
                            <LeftInfo data={data}/>
                            <img className="-order-1 md:order-0 h-65 w-40 md:h-fit md:w-fit m-auto md:m-0" src={fullImageUrl} alt="" />
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