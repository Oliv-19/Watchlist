import { useState, useEffect} from "react"
import { getAllGenres } from "../services/genre"
import { Dropdown } from "./Dropdown"

export const GenreFilter = ({media, setFilteredMedia})=> {
    const [genres, setGenres] = useState(null)
    const [genreFilter, setGenreFilter] = useState('all')
    useEffect(()=>{
        const getGenres = async() => {
            const genresObj = await getAllGenres()
            const genresName = genresObj.map((g) => g.name)
            genresName.unshift('all')
            setGenres(genresName)
            
        }
        getGenres()
    }, [])
    const filterByGenre = (genre) => {
        setFilteredMedia(() => (genre == 'all' ? media :
            media.filter((m)=> m.media.genres.includes(genre))))
    }
    const onClick = (option) => {
        setGenreFilter(option)
        filterByGenre(option)
    }
    
    if(!genres || !media) return null
    return (
        <>
        <div className="flex justify-center md:justify-end md:px-15">
            <Dropdown options={genres} selected={genreFilter} setSelected={setGenreFilter}
                onClick={onClick} type="genre"
                />
        </div>

        </>
    )
}