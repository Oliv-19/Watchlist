import { useState } from "react"
import { Icon } from "../Icons"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"
import { GenreFilter } from "./GenreFilter"

export const Filter = ()=> {
    const {filterMedia, userMedia, setFilteredMedia} = useProfileData()
    const options = ['watchlist', 'finished', 'dropped']
    const onClick = (filters) => {
        filterMedia(filters, 'status')
    }
    return (
        <>
        <div className="flex w-full justify-evenly lg:justify-end md:px-15">
            <div className="flex flex-col justify-center h-18 gap-1 items-center">
                <GenreFilter/>
            </div>
            <div className="flex flex-col justify-center h-18 gap-1 items-center">
                <Dropdown options={options} title={'Ordenar'}
                    onClick={onClick}
                    />
            </div>
        </div>

        </>
    )
}