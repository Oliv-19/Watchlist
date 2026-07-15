import { useState } from "react"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"
import { GenreFilter } from "./GenreFilter"

export const Filter = ()=> {
    const {filtersStatus, setFiltersStatus} = useProfileData()
    const options = ['watchlist', 'finished', 'dropped']
    return (
        <>
        <div className="flex w-full justify-evenly lg:justify-end md:px-15">
            <div className="flex flex-col justify-center h-18 gap-1 items-center">
                <GenreFilter/>
            </div>
            <div className="flex flex-col justify-center h-18 gap-1 items-center">
                <Dropdown options={options} title={'Ordenar'}
                    filters={filtersStatus} setFilters={setFiltersStatus}
                    />
            </div>
        </div>

        </>
    )
}