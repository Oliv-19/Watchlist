import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../hooks';
import { useEffect } from 'react';

const MediaContext = createContext(null)

export const MediaProvider = ({data, children }) => {
    const [isSaved, setIsSaved] = useState(false)
    
    useEffect(()=> setIsSaved(data?.userInfo?.saved),[data])
    return (
        <MediaContext value={{data, saved: isSaved, setIsSaved}}>
            {children}
        </MediaContext>
    )
}

export const useMediaData = () => {
    const context = useContext(MediaContext)
    return context
};