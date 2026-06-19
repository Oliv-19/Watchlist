import { useEffect, useState } from "react";
import { getAiringToday, getMedia, getOnAir, search } from "../../services/media";
import { getPerson } from "../../services/people";

export const useData = (payload)=>{
    const type = payload.type
    const query = payload.query
    const page = payload.page
    const id = payload.id
    const saved = payload.saved
    const [data, setData] = useState(null) 
    useEffect(()=>{ 
            async function fetchData(){
                try{
                    let response
                    switch(type ){
                        case 'onAir':
                            let onAir = await getOnAir()
                            let airingToday = await getAiringToday()
                            response = {onAir, airingToday}
                            break
                        case 'media':
                            response = await getMedia(id)
                            break
                        case 'person':
                            response = await getPerson(id)
                            break
                        case 'search':
                            response = await search(query, page)
                            break
                    }
                    setData(response)
                }catch (error){
                    console.error('error', error.message);  
                }
            }
            fetchData()
        },[type, id, query, page, saved])
    return data
}