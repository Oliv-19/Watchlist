import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"
import { useDataInfo } from "../DataContext"

export const Filter = ()=> {
    const {filtersStatus, setFiltersStatus, filtersGenre, setFiltersGenre, filtersCountry, 
        setFiltersCountry, filtersOrder, setFiltersOrder, changeOrder, order} = useProfileData()
    const {genres, countries}= useDataInfo()
    const options = ['watchlist', 'finished', 'dropped']
    const orderOptions = ['a-z', 'release date', 'most audience rating', 'least audience rating']
    return (
        <>
            <div className="w-full md:w-[85%] flex items-center justify-center lg:justify-end gap-8 lg:py-2">
                <Dropdown options={countries} type="countries" title={'Countries'} filters={filtersCountry}
                    setFilters={setFiltersCountry}/>
                <Dropdown options={genres} type="genre" title={'Genres'} filters={filtersGenre}
                    setFilters={setFiltersGenre}/>
                <Dropdown options={options} title={'Status'}
                    filters={filtersStatus} setFilters={setFiltersStatus}
                    />
                <Dropdown options={orderOptions} title={'Order'}
                    filters={filtersOrder} setFilters={setFiltersOrder}
                    />
                <button className="first-letter:uppercase text-white"
                    onClick={changeOrder}>
                    {order}
                </button>
            </div>

        </>
    )
}
