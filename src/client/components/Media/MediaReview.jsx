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
    <div className="flex items-center flex-col md:flex-row" title={`${rating? rating: 0} Stars`}>
        <div className="flex items-center">
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

        </div>
        <p className="ml-2 text-(--color-focus)" >{rating? rating: 0} Stars</p>
    </div>
    )
}

const Buttons = () => {
    const {isEdit, setIsEdit, reset}= useMediaReviewData()
    return (
        <div className="-order-1 md:order-0">
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
            <div className="w-43 flex justify-center md:justify-end">
                <button type='button' className={`py-2 w-20 
                text-(--color-bg) font-medium rounded-4xl bg-(--color-bg-light) 
                cursor-pointer`}
                onClick={() => {setIsEdit(true)}}>
                    Edit
                </button>
            </div>
        )}
        </div>
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
        className={`bg-(--color-input-bg) w-full p-10 rounded-2xl resize-none 
        text-(--color-text) ${isEdit ? 'focus:outline-2 focus:outline-(--color-bg-light)' 
        : 'focus:outline-none'}`}/>
        
    )
}

const Option = ({type, option, closeDropdown, onClick})=> {
    const clickHandler= ()=> {
        onClick(option)
        closeDropdown()  
    }
    let icon = 'filter'
    if(type == 'status'){
        icon = option == 'watchlist'? 'add': (option== 'all' ? 'filter': option)
    }else if(type == 'genre'){
        icon = option == 'all' ? 'filter': 'genre'
    }
    return (
        <>
        <div onClick={clickHandler} className="p-2 flex gap-1 hover:bg-(--color-focus) 
            font-medium rounded-xl items-center">
            <Icon title={icon} style={'w-5 fill-(--color-text)'}/>
            <p className="first-letter:uppercase lowercase border-b border-(--color-focus)">
                {option}
            </p>
        </div>
        </>
    )
}

export const Dropdown = ({type= 'status',disabled, selected, options, onClick})=> {
    const [openDropdown, setOpenDropdown] = useState(false)
    let initIcon = 'filter'
    if(type == 'status'){
        initIcon = selected == 'watchlist'? 'add': (selected== 'all' ? 'filter': selected)

    }else if(type == 'genre'){
        initIcon = selected == 'all' ? 'filter': 'genre'
    }
    return (
        <>
        <div className="flex items-center gap-2">
            <div onClick={()=>{setOpenDropdown(false)}}  
                className={`${openDropdown? 'block': 'hidden'} h-full w-full fixed 
                inset-0 z-2`} />

            <div className={`flex items-center gap-2 text-(--color-text) cursor-pointer 
            relative w-40 `}>
                <button id="dropdownDefaultButton" 
                onClick={()=> {!disabled && setOpenDropdown(prev=> !prev)}}
                onMouseEnter={()=>{!disabled && setOpenDropdown(true)}}  
                onMouseLeave={()=>{setOpenDropdown(false)}}  
                className={`flex items-center gap-2  z-3 w-full border-2 
                font-medium border-(--color-bg-light) pl-3 p-2 rounded-4xl
                ${!disabled && 'cursor-pointer'}`} 
                type="button" title={`Filter by: ${selected}`}>
                    
                    <Icon title={initIcon} 
                        style={'w-5 fill-white'}/>
                    <p className="first-letter:uppercase lowercase  w-18 truncate">
                        {selected}
                    </p>
                    <Icon title={'dropdown'} style={`w-4 fill-white `}/> 
                </button>
                
                <div id="dropdown" onMouseEnter={()=>{openDropdown && setOpenDropdown(true)}}  
                onMouseLeave={()=>{setOpenDropdown(false)}}   
                className={`z-2 ${openDropdown ? 'flex': 'hidden'}
                bg-(--color-bg) flex-col absolute top-12 left-0
                outline-2 outline-(--color-bg-light) rounded-2xl 
                ${options.length > 10 ? 'flex-wrap w-85 h-94 ': 'w-full '}`}>
                    {options.map((opt)=> 
                        <Option key={opt} 
                        type={type}
                        option={opt} 
                        closeDropdown={()=> {setOpenDropdown(false)}} 
                        onClick={onClick}
                        /> 
                 
                    )}
                </div>

            
            </div>

        </div>
        </>
    )
}


const Status = () => {
    const {isEdit, status, setStatus, setSelected, selected} = useMediaReviewData()
    const changeStatus = (option)=> {
        setStatus(option)
        setStatus(option) 
    }
    const selectedStatus = status? ( status== 'saved'? 'watchlist': status) : 'watchlist'
    return(
        <div className="">
            <Dropdown disabled={!isEdit} selected={selectedStatus} 
            options={['watchlist', 'finished', 'dropped']} 
            onClick={changeStatus}/>
        </div>
        
    )
}

export const MediaReview = () => {
    const {user} = useAuth()
    const {saved} = useMediaData()
    const reviewData = useMediaReviewData()
    
    if(!reviewData || !user || !saved) return null
    
    return (
        <div className="w-full h-fit flex items-center 
                justify-center bg-(--color-bg) p-2">
            <form onSubmit={reviewData.sendReview} className={` w-full lg:w-230 p-2 md:p-10  flex flex-col items-center 
                justify-center rounded-xl gap-6 
                ${reviewData.isEdit && ' outline-2 outline-(--color-bg-light)'}`}>
                <div className={`w-full flex flex-col md:flex-row gap-2 items-center justify-between `}>
                    <Status/>
                    <Stars />
                    <Buttons />
                </div>
                <TextArea />
            </form>
            
        </div>
    )
}