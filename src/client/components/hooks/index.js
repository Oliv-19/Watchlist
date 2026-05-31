import { useEffect, useState } from "react";
import { getMedia, getOnAir, search } from "../../services/media";
import { getPerson } from "../../services/people";

export const useData = (payload)=>{
    const type = payload.type
    const query = payload.query
    const page = payload.page
    const id = payload.id
    const [data, setData] = useState(null) 
    useEffect(()=>{ 
            async function fetchData(){
                try{
                    let response
                    switch(type ){
                        case 'onAir':
                            response = await getOnAir()
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
        },[type, id, query, page])
    return data
}