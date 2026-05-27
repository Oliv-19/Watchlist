import { useParams } from "react-router-dom"
import { format, parseISO } from "date-fns"
import Card from "./Card"
import { getPerson } from "../services/people"
import { useState, useEffect } from "react"
import { useData } from "./hooks"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"

function Detail({title, info}){
    return (
        <div className="bg-(--color-text-bg) p-2 rounded-xl w-50">
            <h1 className="text-[1rem] font-medium border-b-2 border-b-indigo-300">{title}</h1>
            <p className="text-[0.9rem] ">{info}</p>
        </div>
    )
}

function Biography({data}){
    return (
        <div className=" flex flex-col justify-center gap-8 ">
            <div className="w-200 h-fit max-h-88 mt-10 bg-(--color-text-bg) p-8 rounded-xl">
                <div className="w-full h-full text-[1.1rem] overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                    <p>{data.biography}</p>
                </div>
            </div>
            <div className="w-full flex justify-center px-5 gap-3 ">
                <Detail title='Known for' info={data.knownFor} />
                <Detail title='Birthplace' info={data.birthplace} />
                <Detail title='Birthday' info={format(parseISO(data.birthday), 'PP')} />
            </div>
        </div>
    )
}
function BasicInfo({data}){
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.profilePath}`
    return (
        <div className="w-100 h-full flex flex-col items-center  justify-center gap-4 py-4 text-center"> 
            <img className="h-70 rounded-2xl" src={fullImageUrl} alt={data.name} />
            <h1 className="text-2xl underline underline-offset-5 decoration-indigo-300">{data.name}</h1>
            {data.alsoKnownAs && data.alsoKnownAs.length >= 1 && (
                <ul className="bg-(--color-text-bg) p-2 px-4 rounded-xl w-40 text-start">
                    <h1 className="text-[1rem] font-medium border-b-2 border-b-indigo-300">Also known as</h1>
                    {data.alsoKnownAs.map((name)=>
                        <li key={name} className="text-[0.8rem]">{name}</li>) 
                    }
                </ul>
            ) 
            }
        </div>
    )
}

function Filmography({data}){
    return (
        <div className="w-full flex justify-center">
            <div className="w-290 flex flex-row flex-wrap justify-start gap-8 px-2.5 py-10">
                {data.map((serie)=> {
                    const string = serie.character
                    if(!string.includes('Self'))
                     return <Card key={serie.credit_id} data={serie}/> 
                    }
                )}
            </div>
        </div>
    )
}

function Person() {
    const {id} = useParams()
    const data = useData('person', id)
    if(data == null){
        return <div>Loading...</div>
    }
    return (
        <>
            {data && (
                <div className="w-full h-full bg-[#0f0c2f] text-white ">
                    <div className=" h-140 flex  gap-5 ">
                        <BasicInfo data={data}/>
                        <Biography data={data}/>
                    </div>
                    <div className="bg-indigo-300 w-[93%] m-auto h-0.5"></div>
                    <Filmography data={data.media}/>
                </div>
            )
            }
        </>
        
    )
}

export default Person