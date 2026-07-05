import { Link, useParams } from "react-router-dom"
import { Icon } from "../Icons"
import { useState } from "react"
import Card from "../Card"
import { getMedia } from "../../services/media"
import { useEffect } from "react"
import { useData } from "../hooks"
import { LeftInfo, RightInfo } from "./MediaInfo"
import { MediaNav } from "./MediaNav"
import { MediaProvider, useMediaData } from "./MediaContext"
import { MediaReviewProvider } from "./MediaReviewContext"
import { MediaReview } from "./MediaReview"
import {LoadingMedia} from "../Loading"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"

function Content(){
    const {data} = useMediaData()
    if(data == null){
        return <LoadingMedia />
    }
    const fullImageUrl = data?.posterPath && `${IMAGE_BASE_URL}${POSTER_SIZE}${data.posterPath}`
    const fullBGImageUrl = data?.backdropPath && `${IMAGE_BASE_URL}${BG_SIZE}${data.backdropPath}`
    return (
    <>
        <div className="w-full h-full">
            <div className="bg-(--color-bg) h-fit pb-4 sm:h-full relative ">
                {fullBGImageUrl && 
                    <img className={`mask-b-from-75% mask-b-to-transparent w-full h-full 
                        object-cover absolute z-0 opacity-35`} src={fullBGImageUrl} 
                        alt="" />
                }
                <div className="pt-8 pb-2 w-full h-fit flex flex-col sm:flex-row 
                justify-evenly relative z-1 text-(--color-text)">
                    <LeftInfo />
                    {fullImageUrl ? 
                    (
                    <>
                    <img className="-order-1 sm:order-0 h-65 w-40 
                    sm:h-fit sm:w-fit m-auto sm:m-0" src={fullImageUrl} alt="" />
                    </>
                    ) : (
                    <>
                    <div className='-order-1 sm:order-0 h-65 w-40 border 
                    border-(--color-bg-light) sm:h-128.25 sm:w-85.5 m-auto sm:m-0 
                    flex justify-center items-center bg-(--color-bg-2)'>
                    <Icon title={'brokenImage'} style={'w-50 fill-(--color-bg-light)/50'}/>
                    </div>
                    </>
                    ) 
                    }
                    <RightInfo/>

                </div>
            </div>
            <MediaReviewProvider data={{...data.userInfo, id: data.id}}>
                <MediaReview />
            </MediaReviewProvider>
            <MediaNav />
        </div>
    </>
    )
}

function Media() {
    const {id} = useParams()
    const data = useData({type: 'media', id})
    return (
        <MediaProvider data={data}>
            <Content/>
        </MediaProvider>
        
    )
}

export default Media