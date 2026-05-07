import { useEffect, useReducer, useState } from "react";
import { urlReducer } from "../reducers/urlReducer";
const key= import.meta.env.VITE_API_KEY

export const useSearch = (type, query, id= null)=>{
  const [media, setMedia] = useState(null) 
  const [url, dispatch] = useReducer(urlReducer, '')
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
    };
    useEffect(() => {
        if(type){
            dispatch({type, payload: {query, id }});
            async function fetchData () {
                try{
                    const response = await fetch((url), options)
                    const data = await response?.json()
                    setMedia(data?.results)
                }catch{
                    console.error('no data found');
                    
                }
            }
            fetchData()
        }
    }, [query, url])
  
  return media
}