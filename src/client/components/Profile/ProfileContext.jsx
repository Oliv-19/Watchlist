import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { getUserMedia } from '../../services/user';
import { getAllGenres } from '../../services/genre';

const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const [userMedia, setUserMedia] = useState(null)
    const [genres, setGenres] = useState(null)
    const [filtersGenre, setFiltersGenre] = useState([])
    const [filtersStatus, setFiltersStatus] = useState([])
    useEffect(()=> {
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
    }, [])
    let filteredMedia = userMedia
    if(filtersStatus.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersStatus.includes(media.status))
    }
    if(filtersGenre.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersGenre.every((g => media.media.genres.includes(g)) )) 
    }
    return (
        <ProfileContext value={{
            userMedia,
            genres,
            media: filteredMedia, 
            filtersGenre,
            filtersStatus,
            setFiltersGenre,
            setFiltersStatus,
            }}>
            {children}
        </ProfileContext>
    )
}

export const useProfileData = () => {
    const context = useContext(ProfileContext)
    return context
};