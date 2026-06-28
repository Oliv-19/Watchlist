import { useState } from "react"
import { Icon } from "./Icons"

const Option = ({option, icon, setSelected, closeDropdown, onClick})=> {
    const clickHandler= ()=> {
        setSelected(option)
        onClick(option)
        closeDropdown()  
    }
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

export const Dropdown = ({disabled, initValue = 'saved', options, onClick})=> {
    const [selected, setSelected] = useState(initValue)
    const [openDropdown, setOpenDropdown] = useState(false)
    return (
        <>
        <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-(--color-text) cursor-pointer 
            relative w-35`}>
                <button id="dropdownDefaultButton" 
                onClick={()=> {!disabled && setOpenDropdown(prev=> !prev)}}
                className={`flex items-center gap-2  z-3 w-full border-2 
                font-medium border-(--color-bg-light) pl-3 p-2 rounded-4xl
                ${!disabled && 'cursor-pointer'}`} 
                type="button">
                    <Icon title={selected == 'saved'? 'add': selected} 
                        style={'w-5 fill-white'}/>
                    <p className="first-letter:uppercase lowercase">
                        {selected}
                    </p>
                    <Icon title={'dropdown'} style={`w-4 fill-white`}/> 
                </button>
                
                <div id="dropdown" className={`z-2 ${openDropdown ? 'flex': 'hidden'}
                bg-(--color-bg) flex-col absolute top-6 pt-5 left-0 w-full rounded-b-2xl
                border-2 border-(--color-bg-light) border-t-0`}>
                    {options.map((opt)=> 
                        <Option key={opt} 
                            icon={opt == 'saved'? 'add': opt} 
                            option={opt} 
                            closeDropdown={()=> {setOpenDropdown(false)}} 
                            onClick={onClick}
                            setSelected={setSelected}
                        />
                 
                    )}
                </div>

            
            </div>

        </div>
        </>
    )
}