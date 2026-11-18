import { useEffect, useState } from "react"
import { MediaCard } from "./MediaCard"
import { Filter } from "./Filter"
import { ProfileProvider, useProfileData } from "./ProfileContext"
import { LoadingWatchList } from "../Loading"
import { useDataInfo } from "../DataContext"

const UserMedia = () => {
    const {media}= useProfileData()
    return(
        <>
        <div className="w-full md:w-[90%] flex flex-row flex-wrap items-center justify-center
        lg:justify-start lg:gap-8 lg:py-4">
            {media.map((serie) => 
                <MediaCard serie={serie}
                key={serie.media.id} />
            )}
        </div>
        </>
    )
}

const Content = () => {
    const {media}= useProfileData()
    if(!media) return <LoadingWatchList />
    return (
        <>
            <div className="bg-(--color-bg) w-full min-h-fit h-full p-2 sm:p-10 flex flex-col items-center">
                <Filter/>
                <UserMedia />
            </div>
        </>
    )
}


export const Profile = () => {
    const {fetchUserMedia} = useDataInfo()
    useEffect(() => {
        fetchUserMedia()
        console.log('media fetched');
        
    }, [])
    return (
        <>
        <ProfileProvider>
            <Content/>
        </ProfileProvider>
        </>
    )
}