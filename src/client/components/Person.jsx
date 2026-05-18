import { useLocation } from "react-router-dom"
import { useSearch } from "./hooks"
import { format } from "date-fns"
import Card from "./Card"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"

function Detail({title, info}){
    return (
        <div className="bg-[#544874bf] p-2 rounded-xl">
            <h1 className="font-bold border-b-2 border-b-indigo-300">{title}</h1>
            <p>{info}</p>
        </div>
    )
}

function Biography({bio}){
    return (
        <div className=" w-200 h-88 mt-25 bg-[#544874bf] p-8 rounded-xl text-[1.1rem] 
        overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:rounded-full
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
                <p>{bio}</p>
        </div>
    )
}
function BasicInfo({data}){
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.profile_path}`
    return (
        <div className="w-100 h-full flex flex-col items-center  justify-evenly py-4 text-center"> 
            <img className="h-70 rounded-2xl" src={fullImageUrl} alt={data.name} />
            <h1 className="text-2xl">{data.name}</h1>
            <div className="w-80 flex justify-center px-5 gap-3">
                <Detail title='Known for' info={data.known_for_department} />
                <Detail title='Birthday' info={format(new Date(data.birthday), 'MMM d, y')} />
            </div>
            <div className="w-53 ">
                <Detail title='Birthplace' info={data.place_of_birth} />

            </div>
        </div>
    )
}

function Filmography({data}){
    return (
        <div className="w-full flex flex-row flex-wrap justify-evenly gap-5 p-2.5">
            {data.map((serie)=> {
                if(serie.media_type == 'tv'){
                   return <Card key={serie.credit_id} data={serie}/>

                }
            }
        )}
        </div>
    )
}

function Person() {
    const location = useLocation()
    const id = location.state
    
    const data = useSearch('person', null, null, id)
    if(data == null){
        return <div>Loading...</div>
    }
    console.log(data)
    
    return (
        <>
            {data && (
                <div className="w-full h-full bg-[#0f0c2f] text-white">
                    <div className=" h-140 flex  gap-5 ">
                        <BasicInfo data={data}/>
                        <Biography bio={data.biography}/>
                    </div>
                    <Filmography data={data.combined_credits.cast}/>
                </div>
            )
            }
        </>
        
    )
}

export default Person