import { useState } from "react"
import { Icon } from "./Icons"
import { useProfileData } from "./Profile/ProfileContext"

const Option = ({type, option, closeDropdown, onClick})=> {
    const {filters, setFilters} = useProfileData()
    const clickHandler= (e)=> {
        let f = filters
        if(e.target.checked){
            f= [...filters ,e.target.value]
        }else{
            f=  filters.length > 0 ? filters.filter(f => f !== e.target.value) : []
        }
        console.log(f);
        
        setFilters(f)
        onClick(f)
           
    }
    return (
        <>
        <div className="h-fit py-1 w-full cursor-pointer px-5 hover:bg-(--color-focus)">
            <label onChange={clickHandler} htmlFor="checkbox" className="flex w-full h-full justify-start gap-2 cursor-pointer">
                <input  type="checkbox" name="checkbox" id="checkbox" 
                    value={option == 'watchlist'? 'saved': option}/>
                <p className="first-letter:uppercase lowercase font-medium">
                    {option}
                </p>
            </label>
        </div>
        </>
    )
}
const Options = ({options, setOpenDropdown, onClick}) =>{
    return (
        <>
            <div 
                onMouseEnter={()=>{setOpenDropdown(true)}}  
                onMouseLeave={()=>{setOpenDropdown(false)}}
                className="text-(--color-text) py-2 bg-(--color-bg-2) h-fit max-h-100 absolute z-3 flex 
                flex-col w-40 rounded   
                overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                {options.map((opt)=> <Option key={opt} option={opt} onClick={onClick}/>)}
            </div>
        </>
    )
}
export const Dropdown = ({type= 'status',disabled, title, onClick, options})=> {
    const [openDropdown, setOpenDropdown] = useState(false)
    
    return (
        <>
            <div className="">
                <button 
                    disabled={disabled}
                    onMouseEnter={()=>{setOpenDropdown(true)}}
                    onMouseLeave={()=>{setOpenDropdown(false)}}
                    className="w-30 h-10 text-(--color-text) hover:text-purple-500 flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <Icon title={type == 'status'? 'filter': type} style={'w-4 fill-(--color-text)'}/>
                    {title}
                    <Icon title={'dropdown'} style={`w-4 fill-(--color-text) `}/> 
                </button>
                {openDropdown && <Options options={options} setOpenDropdown={setOpenDropdown} onClick={onClick}/>}
            </div>
        </>
    )
}