import { useState } from "react"
import { Icon } from "../Icons"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"

export const Filter = ()=> {
    const {selected, setSelected, filterMedia} = useProfileData()
    const options = ['all', 'saved', 'finished', 'dropped']
    const onClick = (option) => {
        setSelected(option)
        filterMedia(option)
    }
    return (
        <>
        <div className="flex justify-center md:justify-end md:px-15">
            <Dropdown options={options} selected={selected} setSelected={setSelected}
                onClick={onClick}
                />
        </div>

        </>
    )
}