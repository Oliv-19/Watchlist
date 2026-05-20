import axios from "axios";

const key= import.meta.env.VITE_API_KEY
const baseUrl = 'http://localhost:8787/api/media'

export const addMedia = async(id) => {
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
    };
  try{
    const fetchedData = await axios.get(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,recommendations&language=en-US`, options)
    
    console.log('fetched', fetchedData.data.name);
    const response = await axios.post(baseUrl, fetchedData.data)
    console.log('db', response.data.title);
    return response.data
  } catch {
    return null
  }
}
export const getMedia = async(id) => {
  try{
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log('get', response.data.title);
    
    return response.data?  response.data: null
  } catch {
    return null
  }
}