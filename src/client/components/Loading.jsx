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
        <div className={`w-full h-full overflow-hidden`}>
            <div className={`bg-(--color-bg) h-full pb-4 sm:h-full relative items-center
                w-full flex flex-col sm:flex-row justify-evenly z-1 text-(--color-text)`}>
               <div className={`w-90 mt-5 flex flex-col justify-center items-center 
                    gap-4`}>
                    <div className={`${baseClass} w-50 h-13`} />
                    <div className={`${baseClass} w-100  h-60`} />
               </div>
               <div className={`${baseClass}  h-65 w-40 
                sm:h-128.25 sm:w-85.5`}/>
               <div className={`w-80 mt-5 flex flex-col justify-center items-center
                gap-4`}>
                    <div className={`${baseClass} w-60 h-8 sm:ml-20 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} w-60 h-8 sm:ml-20 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} w-60 h-8 sm:ml-20 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} w-60 h-8 sm:ml-20 flex gap-1.5 
                    items-center`} />
                     <div className={`${baseClass} w-60 h-8 sm:ml-20 flex gap-1.5 
                    items-center`} />
               </div>
            </div>
            
        </div>
        </>
    )
}
function LoadingCard(){
    const baseClass = "bg-(--color-bg)/5 animate-pulse rounded"
    return (
        <>
        <div className={`h-65 sm:h-87.5 relative w-40 sm:w-50 flex justify-between 
        items-center flex-col`}>
          <img src={null} alt="" className={`${baseClass} w-full h-80`}/>
          <p className='truncate w-full'></p>
        </div>
        </>
    )
}
function LoadingSlider(){
    const baseClass = "bg-(--color-bg)/5 animate-pulse rounded"
    return (
        <>
        <div className={`${baseClass} w-full h-50 sm:h-100 bg-gray-950
            overflow-x-hidden`}>
            <div className="flex">
                <img 
                src={null}
                className={` w-full object-cover absolute z-0 h-50 sm:h-100 
                    transition-opacity duration-700 ease-in-out` }
                    />
            </div>
                
            <div className="flex justify-between text-(--color-text) h-full sm:h-100 px-2 
                sm:px-15">
                
                <div className="h-full flex items-center justify-center m-auto ">
                    <h1 className="text-center text-2xl sm:text-5xl font-medium">
                    </h1>
                </div>
            </div>
        </div>
        </>
    )
}

export function LoadingHome(){
    const baseClass = "bg-(--color-bg)/10 animate-pulse rounded"
    return (
        <>
        <LoadingSlider/>
        <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5 mt-5">
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
            <LoadingCard/>
        </div>
        </>
    )
}

