import { useState, useEffect } from "react"
import { useAuth } from "../AuthContext"
import { useMediaData } from "./MediaContext"
import { ErrorMessage } from "../ErrorPage"
import { Icon } from "../Icons"
import { updateUserMedia } from "../../services/user"
import { MediaReviewProvider, useMediaReviewData } from "./MediaReviewContext"

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
        text-white ${isEdit ? 'focus:outline-2 focus:outline-(--color-bg-light)' 
        : 'focus:outline-none'}`}/>
        
    )
}
const Option = ({option, closeDropdown})=> {
    const {setStatus, status} = useMediaReviewData()
    const changeStatus = ()=> {
        setStatus(option) 
        closeDropdown()  
    }
    return (
        <>
        <div onClick={changeStatus} className="p-2 hover:bg-(--color-focus) font-medium rounded-xl">
            {option}
        </div>
        </>
    )
}
const Status = () => {
    const {isEdit, status} = useMediaReviewData()
    const [openDropdown, setOpenDropdown] = useState(false)
    return(
        <div className="flex items-center gap-2">
            <p className="font-medium text-white cursor-default">Status: </p>
            <div className={`flex items-center gap-2 text-white cursor-pointer 
            relative w-35`}>
                <button id="dropdownDefaultButton" onClick={()=> {isEdit && setOpenDropdown(prev=> !prev)}}
                className={`flex items-center justify-between z-3 w-full border-2 
                font-medium border-(--color-bg-light) pl-3 p-2 rounded-4xl 
                ${isEdit && 'cursor-pointer'} `} 
                type="button">
                    <p className="first-letter:uppercase lowercase">
                        {status}
                    </p>
                    {isEdit &&
                        <Icon title={'dropdown'} /> 
                    }
                </button>
                
                <div id="dropdown" className={`z-2 ${openDropdown ? 'flex': 'hidden'}
                bg-(--color-bg) flex-col absolute top-6 pt-5 left-0 w-full rounded-b-2xl
                border-2 border-(--color-bg-light) border-t-0`}>
                    <Option option={'Saved'} closeDropdown={()=> {setOpenDropdown(false)}} />
                    <Option option={'Finished'} closeDropdown={()=> {setOpenDropdown(false)}}/>
                    <Option option={'Abandoned'} closeDropdown={()=> {setOpenDropdown(false)}}/>
                </div>

            
            </div>

        </div>
    )
}

export const MediaReview = () => {
    const {user} = useAuth()
    const {data, saved} = useMediaData()
    const reviewData = useMediaReviewData()
    
    if(!reviewData || !user || !saved) return null
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