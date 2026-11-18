import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useDataInfo } from '../DataContext';

const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const {userMedia} = useDataInfo()
    const [filtersGenre, setFiltersGenre] = useState([])
    const [filtersStatus, setFiltersStatus] = useState([])
    const [filtersCountry, setFiltersCountry] = useState([])
    const [filtersOrder, setFiltersOrder] = useState([])
    const [order, setOrder] = useState('descendant')
    let filteredMedia = userMedia
    const changeOrder = ()=>{
        if(order == 'ascendant'){
            setOrder('descendant')
        }else{
            setOrder('ascendant')
        }
    }

    if(filtersStatus.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersStatus.includes(media.status))
    }
    if(filtersGenre.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersGenre.every((g => media.media.genres.includes(g)) )) 
    }
    if(filtersCountry.length > 0){
        filteredMedia = filteredMedia.filter(media => filtersCountry.includes(media.media.originCountry)) 
        
    }
    if(filtersOrder.length > 0){
        filtersOrder.forEach((filter)=>{
            switch (filter){
                case 'a-z':
                    filteredMedia.sort((a,b)=> {
                        if(order == 'ascendant'){
                            return b.media.title.localeCompare(a.media.title)
                        }else {
                            return a.media.title.localeCompare(b.media.title)
                        } 
                    })
                    
                    break
                    
            }

        })
    }
    
    return (
        <ProfileContext value={{
            media: filteredMedia, 
            filtersGenre,
            filtersStatus,
            filtersCountry,
            filtersOrder,
            setFiltersGenre,
            setFiltersStatus,
            setFiltersCountry,
            setFiltersOrder,
            changeOrder,
            order
            }}>
            {children}
        </ProfileContext>
    )
}

export const useProfileData = () => {
    const context = useContext(ProfileContext)
    return context
};