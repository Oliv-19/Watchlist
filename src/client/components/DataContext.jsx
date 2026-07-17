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