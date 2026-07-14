import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { getUserMedia } from '../../services/user';
import { getAllGenres } from '../../services/genre';

const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const [userMedia, setUserMedia] = useState(null)
    const [filters, setFilters] = useState([])
    const [filteredMedia, setFilteredMedia] = useState(null)
    useEffect(()=> {
        const fetchUserMedia = async() => {    
            const media= await getUserMedia()
            setUserMedia(media)
            setFilteredMedia(media)
        }
        fetchUserMedia()
    }, [])
    const filterMedia = (filter, filterBy)=> {
        const filtered = userMedia.filter((media)=>{
            const matchedStatus = filter.includes(media.status) 
            const matchedGenres = media.media.genres.some(g => filter.includes(g))
            return matchedStatus || matchedGenres
        })
        console.log(filter, filtered)
        
        setFilteredMedia(() => (filter.length > 0 ? filtered : userMedia )
        )
    }
    return (
        <ProfileContext value={{
            userMedia,
            media: filteredMedia, 
            filters,
            setFilters,
            filterMedia,
            setFilteredMedia,
            }}>
            {children}
        </ProfileContext>
    )
}

export const useProfileData = () => {
    const context = useContext(ProfileContext)
    return context
};