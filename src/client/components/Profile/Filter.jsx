import { useState } from "react"
import { Icon } from "../Icons"
import { Dropdown } from "../Dropdown"

export const Filter = ()=> {
    const options = ['saved', 'finished', 'dropped']
    return (
        <>
        <div className="">
            <Dropdown options={options}/>
        </div>

        </>
    )
}