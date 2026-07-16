import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "./Icons";

export function LoadingMedia(){
    const baseClass = "bg-(--color-bg-light)/20 animate-pulse rounded"
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

function LoadingDropdown(){
    return (
        <>
        <div className="w-full px-22 flex items-center justify-center lg:justify-end gap-8">
                 <button 
                    className="w-30 h-10 text-(--color-text) hover:text-purple-500 flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <Icon title={'genre'} style={'w-4 fill-(--color-text)'}/>
                    Genres
                    <Icon title={'dropdown'} style={`w-4 fill-(--color-text) `}/> 
                </button>
            
                <button 
                    className="w-30 h-10 text-(--color-text) hover:text-purple-500 flex flex-row items-center 
                    justify-evenly cursor-pointer font-medium">
                    <Icon title={'filter'} style={'w-4 fill-(--color-text)'}/>
                    Order
                    <Icon title={'dropdown'} style={`w-4 fill-(--color-text) `}/> 
                </button>
                  
            
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
            <div className={`bg-(--color-bg) w-full h-full p-2 sm:p-14 flex flex-col gap-5`}>
                <LoadingDropdown />
                <div className="flex justify-evenly flex-wrap">
                    <LoadingUserMediaCard/>
                    <LoadingUserMediaCard/>
                    <LoadingUserMediaCard/>
                    <LoadingUserMediaCard/>
                    <LoadingUserMediaCard/>
                </div>
            </div>
        </>
    )
}

export function LoadingSearchResults(){
    return (
        <>
        <div className="bg-(--color-bg-2) py-5">
            <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 px-2.5 mt-5
                ">
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
                <LoadingCard/>
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

export function PersonLoading() {
    const baseClass = "bg-(--color-bg-light)/20 animate-pulse rounded"
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return (
        <>
        <div className="w-full h-full bg-(--color-bg) text-(--color-text) ">
            <div className={`w-full flex gap-5 py-10`}>
                <div className={`w-100 flex flex-col items-center justify-center gap-4 py-4`}>
                    <div className={`h-70 w-[186.66px] rounded-2xl ${baseClass}`} />
                    <div className="border-b-3 border-indigo-300 w-30 h-8" />
                    <div className={`${baseClass} p-2 px-4 rounded-xl w-40 h-25 text-start`} />

                </div>
                <div className=" flex flex-col justify-center gap-8 ">
                    <div className={`${baseClass} sm:w-200 h-70  mx-5 sm:mt-10  sm:mx-0 p-4 sm:p-8 rounded-xl`} />
                    <div className="w-full flex flex-col sm:flex-row justify-center px-5 gap-3 ">
                        <div className={`${baseClass} p-2 rounded-xl w-full sm:w-50 h-26.5`}>
                            <div className="h-[25.5px] font-medium border-b-2 border-b-indigo-300" />
                            
                        </div>
                        <div className={`${baseClass} p-2 rounded-xl w-full sm:w-50 h-26.5`}>
                            <div className="h-[25.5px] font-medium border-b-2 border-b-indigo-300" />
                            
                        </div>
                        <div className={`${baseClass} p-2 rounded-xl w-full sm:w-50 h-26.5`}>
                            <div className="h-[25.5px] font-medium border-b-2 border-b-indigo-300" />
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-indigo-300 w-[93%] m-auto h-0.5" />
        </div>
        </>
        
    )
}
