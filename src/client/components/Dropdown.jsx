import { useState } from "react"
import { Icon } from "./Icons"

const Option = ({type, option, closeDropdown, onClick})=> {
    const clickHandler= ()=> {
        onClick(option)
        closeDropdown()  
    }
    let icon = 'filter'
    if(type == 'status'){
        icon = option == 'saved'? 'add': (option== 'all' ? 'filter': option)
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
        initIcon = selected == 'saved'? 'add': (selected== 'all' ? 'filter': selected)

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
            relative w-35`}>
                <button id="dropdownDefaultButton" 
                onClick={()=> {!disabled && setOpenDropdown(prev=> !prev)}}
                className={`flex items-center gap-2  z-3 w-full border-2 
                font-medium border-(--color-bg-light) pl-3 p-2 rounded-4xl
                ${!disabled && 'cursor-pointer'}`} 
                type="button" title={`Filter by: ${selected}`}>
                    
                    <Icon title={initIcon} 
                        style={'w-5 fill-white'}/>
                    <p className="first-letter:uppercase lowercase w-13 truncate">
                        {selected}
                    </p>
                    <Icon title={'dropdown'} style={`w-4 fill-white `}/> 
                </button>
                
                <div id="dropdown" className={`z-2 ${openDropdown ? 'flex': 'hidden'}
                bg-(--color-bg) flex-col absolute top-12 left-0 
                outline-2 outline-(--color-bg-light) rounded-2xl 
                ${options.length > 10 ? 'flex-wrap w-85 h-94': 'w-full '}`}>
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