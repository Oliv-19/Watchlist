import { useState } from "react"
import { Icon } from "./Icons"

const Option = ({option, closeDropdown, onClick})=> {
    const clickHandler= ()=> {
        onClick(option)
        closeDropdown()  
    }
    const icon = option == 'saved'? 'add': (option== 'all' ? 'filter': option)
    return (
        <>
        <div onClick={clickHandler} className="p-2 flex gap-1 hover:bg-(--color-focus) font-medium rounded-xl">
            <Icon title={icon} />
            <p className="first-letter:uppercase lowercase">
                {option}
            </p>
        </div>
        </>
    )
}

export const Dropdown = ({disabled, selected, options, onClick})=> {
    const [openDropdown, setOpenDropdown] = useState(false)
    const initIcon = selected == 'saved'? 'add': (selected== 'all' ? 'filter': selected)
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
                type="button">
                    <Icon title={initIcon} 
                        style={'w-5 fill-white'}/>
                    <p className="first-letter:uppercase lowercase w-13">
                        {selected}
                    </p>
                    <Icon title={'dropdown'} style={`w-4 fill-white `}/> 
                </button>
                
                <div id="dropdown" className={`z-2 ${openDropdown ? 'flex': 'hidden'}
                bg-(--color-bg) flex-col absolute top-6 pt-5 left-0 w-full rounded-b-2xl
                border-2 border-(--color-bg-light) border-t-0`}>
                    {options.map((opt)=> 
                        <Option key={opt} 
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