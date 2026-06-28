import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { useMediaData } from "./MediaContext"
import { ErrorMessage } from "../ErrorPage"
import { Icon } from "../Icons"
import { updateUserMedia } from "../../services/user"
import { MediaReviewProvider, useMediaReviewData } from "./MediaReviewContext"
import { Dropdown } from "../Dropdown"

const Stars = () => {
    const {isEdit, setRating, rating} = useMediaReviewData()
    const stars = Array(5).fill(0)
    return (
    <div className="flex items-center " title={`${rating? rating: 0} Stars`}>
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
        <p className="ml-2 text-(--color-focus)" >{rating? rating: 0} Stars</p>
    </div>
    )
}

const Buttons = () => {
    const {isEdit, setIsEdit, reset}= useMediaReviewData()
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
            <div className="w-43 flex justify-end">
                <button type='button' className={`py-2 w-20 
                text-(--color-bg) font-medium rounded-4xl bg-(--color-bg-light) 
                cursor-pointer`}
                onClick={() => {setIsEdit(true)}}>
                    Edit
                </button>
            </div>
        )}
        </>
    )
}

const TextArea = () => {
    const {isEdit, review, setReview, userReview} = useMediaReviewData()
    const changeReview = (e)=> {
        setReview(e.target.value)
    }
    return (
    <textarea readOnly={!isEdit} draggable='false' name="review" id="review" 
        cols={70} placeholder="What do you think?" value={review? review: undefined} 
        onChange={changeReview} rows={5} 
        className={`bg-(--color-input-bg) p-10 rounded-2xl resize-none 
        text-(--color-text) ${isEdit ? 'focus:outline-2 focus:outline-(--color-bg-light)' 
        : 'focus:outline-none'}`}/>
        
    )
}
const Status = () => {
    const {isEdit, status, setStatus} = useMediaReviewData()
    const [selected, setSelected] = useState('saved')
    const changeStatus = (option)=> {
        setStatus(option) 
    }
    return(
        <Dropdown disabled={!isEdit} selected={selected} setSelected={setSelected}
        options={['saved', 'finished', 'dropped']} 
        onClick={changeStatus}/>
    )
}

export const MediaReview = () => {
    const {user} = useAuth()
    const {data} = useMediaData()
    const reviewData = useMediaReviewData()
    
    if(!reviewData || !user || !data.userInfo.saved) return null
    return (
        <div className="w-full h-fit flex items-center 
                justify-center bg-(--color-bg) pt-2">
            <form onSubmit={reviewData.sendReview} className={` w-fit p-10 flex flex-col items-center 
                justify-center rounded-xl gap-6 
                ${reviewData.isEdit && ' outline-2 outline-(--color-bg-light)'}`}>
                <div className={`w-198.75 flex justify-between `}>
                    <Status/>
                    <Stars />
                    <Buttons />
                </div>
                <TextArea />
            </form>
            
        </div>
    )
}