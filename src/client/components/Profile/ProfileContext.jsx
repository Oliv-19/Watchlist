import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { getUserMedia } from '../../services/user';
import { getAllGenres } from '../../services/genre';
import { useDataInfo } from '../DataContext';

const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const {userMedia} = useDataInfo()
    const [filtersGenre, setFiltersGenre] = useState([])
    const [filtersStatus, setFiltersStatus] = useState([])
    let filteredMedia = userMedia
    if(filtersStatus.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersStatus.includes(media.status))
    }
    if(filtersGenre.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersGenre.every((g => media.media.genres.includes(g)) )) 
    }
    return (
        <ProfileContext value={{
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