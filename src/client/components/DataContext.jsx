import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { getUserMedia } from "../services/user"
import { getAllGenres } from "../services/genre"
import { useContext } from "react"
import { useAuth } from "./AuthContext"

const DataContext = createContext(null)

export const DataProvider = ({children}) => {
    const [userMedia, setUserMedia] = useState(null)
    
    const [genres, setGenres] = useState(null)
    const [countries, setCountries] = useState(null)
    const {user} = useAuth()
    useEffect(()=> {
        if(user){
            const fetchUserMedia = async() => {    
                const media= await getUserMedia()
                setUserMedia(media)
            }
            fetchUserMedia()
            const getGenres = async() => {
                const genresObj = await getAllGenres()
                const genresName = genresObj.map((g) => g.name)
                setGenres(genresName)  
            }
            getGenres()
            setCountries([
                {code: 'US', name: 'United States'},
                {code: 'JP', name: 'Japan'},
                {code: 'CN', name: 'China'},
                {code: 'KR', name: 'South Korea'},
                {code: 'GB', name: 'United Kingdom'},
                {code: 'FR', name: 'France'},
                {code: 'CA', name: 'Canada'},
                {code: 'TR', name: 'Turkey'},
                {code: 'IN', name: 'India'},
            ])
        }
    }, [user])
    const searchUserMedia= (id)=>{
        let saved = false
        if(userMedia){
            saved = userMedia.some(m => m.mediaId == id)
        }
        return saved
    }
    
    return (
        <DataContext value={{
            userMedia,
            genres,
            countries,
            searchUserMedia
            }}>
            {children}
        </DataContext>
    )
}

export const useDataInfo = () => {
    const context = useContext(DataContext)
    return context
};