import { useEffect, useState } from "react"
import { getUserMedia } from "../services/user"
import Card from "./Card"

export const Profile = () => {
    const [userMedia, setUserMedia] = useState(null)
    useEffect(()=> {
        const idk = async() => {
            const media= await getUserMedia()
            setUserMedia(media)
        }
        idk()
    }, [])
    if(!userMedia) return null
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
                {userMedia.map((serie) => <Card data={serie.media} key={serie.media.id}></Card>)}
            </div>
        </div>
        </>
    )
}