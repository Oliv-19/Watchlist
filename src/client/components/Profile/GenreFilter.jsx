import { useState, useEffect} from "react"
import { getAllGenres } from "../../services/genre"
import { Dropdown } from "../Dropdown"
import { useProfileData } from "./ProfileContext"

export const GenreFilter = ()=> {
    const [genres, setGenres] = useState(null)
    const { setFiltersGenre, filtersGenre} = useProfileData()
    useEffect(()=>{
        const getGenres = async() => {
            const genresObj = await getAllGenres()
            const genresName = genresObj.map((g) => g.name)
            
            setGenres(genresName)
            
        }
        getGenres()
    }, [])
    
    if(!genres ) return null
    return (
        <>
        <div className="flex justify-center md:justify-end md:px-15">
            <Dropdown options={genres} type="genre" title={'Genres'} filters={filtersGenre}
                setFilters={setFiltersGenre}/>
        </div>

        </>
    )
}