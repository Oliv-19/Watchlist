import { useState } from "react"
import { Icon } from "../Icons"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"
import { GenreFilter } from "./GenreFilter"

export const Filter = ()=> {
    const {selected, setSelected, filterMedia, userMedia, setFilteredMedia} = useProfileData()
    const options = ['all', 'watchlist', 'finished', 'dropped']
    const onClick = (option) => {
        setSelected(option)
        filterMedia(option)
    }
    return (
        <>
        <div className="flex w-full justify-evenly lg:justify-end md:px-15">
            <div className="flex flex-col justify-center h-18 gap-1 items-center">
                <p className="text-[0.9rem] 
                    text-(--color-text)/70 font-medium">
                    Filter by: Genres
                </p>
                <GenreFilter media={userMedia} setFilteredMedia={setFilteredMedia}/>
            </div>
            <div className="flex flex-col justify-center h-18 gap-1 items-center">
                <p className="text-[0.9rem] 
                    text-(--color-text)/70 font-medium">
                    Filter by: Status
                </p>
                <Dropdown options={options} selected={selected} setSelected={setSelected}
                    onClick={onClick}
                    />
            </div>
        </div>

        </>
    )
}