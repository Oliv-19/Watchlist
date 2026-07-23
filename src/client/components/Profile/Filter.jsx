import { useState } from "react"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"
import { useDataInfo } from "../DataContext"

export const Filter = ()=> {
    const {filtersStatus, setFiltersStatus, filtersGenre, setFiltersGenre, filtersCountry, setFiltersCountry} = useProfileData()
    const {genres, countries}= useDataInfo()
    const options = ['watchlist', 'finished', 'dropped']
    return (
        <>
            <div className="w-full md:w-[85%] flex items-center justify-center lg:justify-end gap-8 lg:py-2">
                <Dropdown options={countries} type="countries" title={'Countries'} filters={filtersCountry}
                    setFilters={setFiltersCountry}/>
                <Dropdown options={genres} type="genre" title={'Genres'} filters={filtersGenre}
                    setFilters={setFiltersGenre}/>
                <Dropdown options={options} title={'Order'}
                    filters={filtersStatus} setFilters={setFiltersStatus}
                    />
            </div>

        </>
    )
}