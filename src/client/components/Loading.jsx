import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function LoadingMedia(){
    const baseClass = "bg-(--color-bg-light)/20 animate-pulse rounded"
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <>
        <div className={`w-full h-fit md:h-full overflow-hidden`}>
            <div className={`bg-(--color-bg) h-full py-4 relative items-center
                w-full flex flex-col sm:flex-row justify-evenly z-1 text-(--color-text)`}>
               {/* left info */}
               <div className={`lg:w-90 md:w-60 mt-5 flex flex-col justify-center items-center 
                    gap-4 px-3`}>
                    <div className={`${baseClass} w-50 h-10 lg:h-13`} />
                    <div className={`${baseClass} w-80 md:w-full h-40 md:h-50 lg:h-60`} />
               </div>
               {/* center pic */}
               <div className={`${baseClass} -order-1 sm:order-0 h-65 w-40 md:h-90 md:w-60
                lg:h-128.25 lg:w-85.5`}/>
                {/* right info */}
               <div className={`w-50 lg:w-80 md:w-50 mt-5 flex flex-col justify-center items-center
                gap-4 lg:pl-10`}>
                    <div className={`${baseClass} w-full h-8 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} w-full h-8 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} w-full h-8 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} hidden sm:flex w-full h-8 gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} hidden sm:flex w-full h-8 gap-1.5 
                    items-center`} />
               </div>
            </div>
            
        </div>
        </>
    )
}
function LoadingCard(){
    const baseClass = "bg-(--color-bg) animate-pulse rounded"
    return (
        <>
            <div className={`relative w-40 sm:w-50 ${baseClass} w-full h-80`}/>
        </>
    )
}
function LoadingSlider(){
    const baseClass = "bg-(--color-bg) animate-pulse rounded"
    return (
        <>
            <div className={`${baseClass} w-full h-50 sm:h-100 overflow-x-hidden`}/>
        </>
    )
}

export function LoadingHome(){
    return (
        <>
        <div className="bg-(--color-bg-2)">
            <LoadingSlider/>
            <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5 mt-5
                ">
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
            </div>
        </div>
        </>
    )
}

function LoadingUserMediaCard(){
    const baseClass = "bg-(--color-bg-light)/20 animate-pulse rounded-xl"
    return (
        <>
            <div className={`${baseClass} w-43 h-71`}>
            </div>
        </>
    )
}

export function LoadingWatchList(){
    const baseClass = "bg-(--color-bg-light)/20 animate-pulse rounded"
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <>
            <div className={`bg-(--color-bg) w-full min-h-136 h-fit p-2 sm:p-14
                flex justify-evenly flex-wrap`}>
                <LoadingUserMediaCard/>
                <LoadingUserMediaCard/>
                <LoadingUserMediaCard/>
                <LoadingUserMediaCard/>
                <LoadingUserMediaCard/>
            </div>
        </>
    )
}
