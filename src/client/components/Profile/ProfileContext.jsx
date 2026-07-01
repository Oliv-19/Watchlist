import { useState } from 'react';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { getUserMedia } from '../../services/user';
import { getAllGenres } from '../../services/genre';

const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const [userMedia, setUserMedia] = useState(null)
    const [filteredMedia, setFilteredMedia] = useState(null)
    const [filterBy, setFilterBy] = useState('all')
    useEffect(()=> {
        const fetchUserMedia = async() => {    
            const media= await getUserMedia()
            setUserMedia(media)
            setFilteredMedia(media)
        }
        fetchUserMedia()
    }, [])
    const filterMedia = (filter)=> {
        setFilteredMedia(() => (filter == 'all' ? userMedia :
            userMedia.filter((media)=> media.status == filter)))
    }
    return (
        <ProfileContext value={{
            userMedia,
            media: filteredMedia, 
            selected: filterBy, 
            setSelected:setFilterBy,
            filterMedia,
            setFilteredMedia
            }}>
            {children}
        </ProfileContext>
    )
}

export const useProfileData = () => {
    const context = useContext(ProfileContext)
    return context
};