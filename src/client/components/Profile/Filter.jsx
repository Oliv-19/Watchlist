import { useState } from "react"
import { Icon } from "../Icons"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"

export const Filter = ()=> {
    const {selected, setSelected, filterMedia} = useProfileData()
    const options = ['all', 'saved', 'finished', 'dropped']
    const onClick = (option) => {
        filterMedia(option)
    }
    return (
        <>
        <div className="">
            <Dropdown options={options} selected={selected} setSelected={setSelected}
                onClick={onClick}
                />
        </div>

        </>
    )
}