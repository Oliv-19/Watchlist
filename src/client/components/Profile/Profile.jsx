import { useEffect, useState } from "react"
import { getUserMedia } from "../../services/user"
import image from '../../assets/image.png'
import { useAuth } from "../AuthContext"
import { MediaCard } from "./MediaCard"
import { Filter } from "./Filter"
import { ProfileProvider, useProfileData } from "./ProfileContext"
import { LoadingWatchList } from "../Loading"

const UserMedia = () => {
    const {media}= useProfileData()
    if(!media) return <LoadingWatchList />
    return(
        <>
        <div className="w-full flex flex-row flex-wrap items-center justify-center
        lg:justify-start lg:gap-5 lg:p-2.5">
            {media.map((serie) => 
                <MediaCard serie={serie}
                key={serie.media.id} />
            )}
        </div>
        </>
    )
}


export const Profile = () => {
    return (
        <>
        <ProfileProvider>
            <div className="bg-(--color-bg) w-full min-h-136 h-fit p-2 sm:p-10">
                <Filter/>
                <UserMedia />
            </div>
        </ProfileProvider>
        </>
    )
}