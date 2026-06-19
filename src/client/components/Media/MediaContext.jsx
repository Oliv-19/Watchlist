import { createContext, useContext } from 'react';

const MediaContext = createContext(null)

export const MediaProvider = ({ data, children }) => {
    return (
        <MediaContext value={data}>
            {children}
        </MediaContext>
    )
}

export const useMediaData = () => {
    const context = useContext(MediaContext)
    return context
};