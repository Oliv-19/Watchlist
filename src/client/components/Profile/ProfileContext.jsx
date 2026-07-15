import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { getUserMedia } from '../../services/user';
import { getAllGenres } from '../../services/genre';

const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const [userMedia, setUserMedia] = useState(null)
    const [filtersGenre, setFiltersGenre] = useState([])
    const [filtersStatus, setFiltersStatus] = useState([])
    useEffect(()=> {
        const fetchUserMedia = async() => {    
            const media= await getUserMedia()
            setUserMedia(media)
        }
        fetchUserMedia()
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