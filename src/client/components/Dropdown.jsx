import { useState } from "react"
import { Icon } from "./Icons"

const Option = ({type, option, closeDropdown, filters, setFilters})=> {
    const [checked, setChecked]= useState(filters.includes(option == 'watchlist'? 'saved': (type == 'countries' ? option.code : option)) ? true : false )
    const clickHandler= (e)=> {
        let f = filters
        if(e.target.checked){
            f= [...filters ,e.target.value]
        }else{
            f=  filters.length > 0 ? filters.filter(f => f !== e.target.value) : []
        }
        setFilters(f) 
        setChecked(prev => !prev) 
    }
    return (
        <>
        <div className="h-fit py-1 w-full cursor-pointer px-5 hover:bg-(--color-focus)">
            <label className="flex w-full h-full justify-start gap-2 items-center
                cursor-pointer relative">
                <input  type="checkbox" name={option} id={option} checked={checked} onChange={clickHandler}
                    value={option == 'watchlist'? 'saved': (type == 'countries' ? option.code : option)}
                    className={`appearance-none w-4 h-4 border-2 border-(--color-bg-light) cursor-pointer 
                        peer checked:bg-(--color-bg-light) shrink-0 
                        hover:bg-(--color-bg-light)/50 `}
                    />
                <Icon title={'check'} style={` w-4 peer-checked:fill-(--color-bg) fill-transparent peer-hover:fill-white absolute z-2`}/>
                <p className="first-letter:uppercase lowercase font-medium ">
                    {type == 'countries' ? option.name : option}
                </p>
            </label>
        </div>
        </>
    )
}
const Options = ({options, setOpenDropdown, filters, setFilters, type}) =>{
    return (
        <>
            <div 
                onMouseEnter={()=>{setOpenDropdown(true)}}  
                onMouseLeave={()=>{setOpenDropdown(false)}}
                className="text-(--color-text) py-2 bg-(--color-bg-2) h-fit max-h-100 absolute z-3 flex 
                flex-col w-fit min-w-40 max-w-50 rounded   
                overflow-y-auto overflow-x-hidden
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                {options.map((opt)=> <Option type={type} key={type == 'countries' ? opt.code : opt} option={opt} filters={filters}
                    setFilters={setFilters}/>)}
            </div>
        </>
    )
}
export const Dropdown = ({type= 'status',disabled, title, options, filters, setFilters})=> {
    const [openDropdown, setOpenDropdown] = useState(false)
    
    return (
        <>
            <div className="">
                <div onClick={()=>{setOpenDropdown(false)}} 
                    className={`${openDropdown? 'block md:hidden': 'hidden'} z-2  fixed inset-0 bg-black/50 transition-opacity` }/>
                <button 
                    disabled={disabled}
                    onMouseOver={()=>{setOpenDropdown(true)}}
                    onClick={()=>{setOpenDropdown(prev =>!prev)}}
                    onMouseLeave={()=>{setOpenDropdown(false)}}
                    className="w-30 h-10 text-(--color-text) hover:text-purple-500 flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <Icon title={type == 'status'? 'filter': type} style={'w-4 fill-(--color-text)'}/>
                    {title}
                    <Icon title={'dropdown'} style={`w-4 fill-(--color-text) `}/> 
                </button>
                {openDropdown && <Options type={type} filters={filters} setFilters={setFilters} options={options} 
                    setOpenDropdown={setOpenDropdown}/>}
            </div>
        </>
    )
}