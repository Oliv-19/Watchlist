import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { updateUserMedia } from "../../services/user"
import { Icon } from "../Icons"
import { Link } from "react-router-dom"
import { ErrorMessage } from "../ErrorPage"
import { useMediaData } from "./MediaContext"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"

const Stars = ({isEdit, setRating, rating}) => {
    const stars = Array(5).fill(0)
    return (
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
    )
}

const Buttons = ({isEdit, setIsEdit, reset}) => {
    return (
        <>
        {isEdit ? (
            <div className={`flex gap-3`}>
                <button type="reset" className={` py-2 w-20 text-(--color-bg) 
                font-medium rounded-4xl bg-(--color-bg-light) cursor-pointer`}
                onClick={reset}>
                    Cancel
                </button>
                <button type="submit" className={` py-2 w-20 text-(--color-bg) 
                font-medium rounded-4xl bg-(--color-bg-light) cursor-pointer`}>
                    Save
                </button>
    
            </div>
        ) : (
            <button type='button' className={`py-2 w-20 
            text-(--color-bg) font-medium rounded-4xl bg-(--color-bg-light) 
            cursor-pointer`}
            onClick={() => {setIsEdit(true)}}>
                Edit
            </button>
        )}
        </>
    )
}

const TextArea = ({isEdit, review, setReview, userReview}) => {
    const changeReview = (e)=> {
        setReview(e.target.value)
    }
    return (
    <textarea readOnly={!isEdit} draggable='false' name="review" id="review" 
        cols={70} placeholder="What do you think?" value={review} 
        onChange={changeReview} rows={5} 
        className={`bg-(--color-input-bg) p-10 rounded-2xl resize-none 
        text-white ${isEdit ? 'focus:outline-2 focus:outline-(--color-bg-light)' 
        : 'focus:outline-none'}`}/>
        
    )
}

const UserReview = () => {
    const {user} = useAuth()
    const {data} = useMediaData()
    const userInfo= data?.userInfo
    const [rating, setRating] = useState(userInfo ? userInfo.userRating: 0)
    const [review, setReview] = useState(userInfo ? userInfo.userRating: '')
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState(null)
    useEffect(()=> {
        const saveReview = async () => {
            if(formData){
                await updateUserMedia(formData)
            }
            
        }
        saveReview()
    }, [formData])
    if(!user) return <ErrorMessage message='Login or Sign Up to add your review'/>
    if(!userInfo) return <ErrorMessage message='Add to watchlist to add your review'/>
    
    
    const sendReview = async(e)=> {
        e.preventDefault()
        setFormData({rating: rating, review: review, id: data.id})
        setIsEdit(false)
    }
    const reset = ()=> {
        setReview(userInfo.userReview ? userInfo.userReview: '')
        setRating(userInfo.userRating ? userInfo.userRating: 0)
        setIsEdit(false)
    }
    return (
    <div className="w-full h-fit mt-2 flex items-center 
            justify-center">
        <form onSubmit={sendReview} className={` w-fit p-10 flex flex-col items-center 
            justify-center rounded-xl gap-6 bg-(--color-text-bg) 
            ${isEdit && ' outline-2 outline-(--color-bg-light)'}`}>
            <div className={`w-198.75 flex justify-between `}>
                <Stars isEdit={isEdit} rating={rating} setRating={setRating} />
                <Buttons isEdit={isEdit} setIsEdit={setIsEdit} reset={reset}/>
            </div>
            <TextArea isEdit={isEdit} review={review} setReview={setReview} userReview={userInfo.userReview}/>
        </form>
        
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
            <Link to={`/media/${similar.id}`} state={similar.id} title={similar.title} key={similar.id} className="hover:scale-[1.1] transition-transform duration-300 shrink-0 w-35 md:w-45 h-55 md:h-70 bg-neutral-50 p-1 rounded-xl text-center">
                <img className="m-auto h-[80%] rounded-xl" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${similar.posterPath}`} alt="" />
                <p className="font-bold text-[0.8rem] md:text-[1rem]">{similar.title} </p>
                
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
        Review : <UserReview  data={data}/>,
        Cast: <Cast data={data.cast} />,
        Similar: <Similar data={data.similar} />
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
                            text-[1rem] md:text-3xl`}>
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