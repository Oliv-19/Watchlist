import { Link, useParams } from "react-router-dom"
import { Icon } from "../Icons"
import { useState } from "react"
import Card from "../Card"
import { getMedia } from "../../services/media"
import { useEffect } from "react"
import { useData } from "../hooks"
import { LeftInfo, RightInfo } from "./MediaInfo"
import { MediaNav } from "./MediaNav"
import { MediaProvider } from "./MediaContext"
import { MediaReviewProvider } from "./MediaReviewContext"
import { MediaReview } from "./MediaReview"
import {LoadingMedia} from "../Loading"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"


function Media() {
    const {id} = useParams()
    const [refreshData, setRefreshData] = useState(false);
    const data = useData({type: 'media', id, saved: refreshData})
    if(data == null){
        return <LoadingMedia />
    }
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.posterPath}`
    const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${data.backdropPath}`
    const triggerRefresh = () => {setRefreshData(true)}
    return (
        <MediaProvider data={{data, triggerRefresh}}>
            <div className="w-full h-full">
                <div className="bg-(--color-bg) h-fit pb-4 sm:h-full relative ">
                    <img className={`mask-b-from-75% mask-b-to-transparent w-full h-full object-cover absolute z-0 opacity-35`} src={fullBGImageUrl} alt="" />
                    <div className="pt-8 pb-2 w-full h-fit flex flex-col sm:flex-row 
                    justify-evenly relative z-1 text-(--color-text)">
                        <LeftInfo/>
                        <img className="-order-1 sm:order-0 h-65 w-40 sm:h-fit sm:w-fit m-auto sm:m-0" src={fullImageUrl} alt="" />
                        <RightInfo />

                    </div>
                </div>
                <MediaReviewProvider data={{...data.userInfo, id: data.id}}>
                    <MediaReview />
                </MediaReviewProvider>
                <MediaNav />
            </div>
        </MediaProvider>
        
    )
}

export default Media