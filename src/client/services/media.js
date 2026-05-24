import axios from "axios";

const key= import.meta.env.VITE_API_KEY
const baseUrl = '/api/media'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${key}`
      }
  };

export const addMedia = async(id) => {
  try{
    const fetchedData = await axios.get(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US`, options)
    const response = await axios.post(baseUrl, fetchedData.data)
    return response.data
  } catch {
    return null
  }
}
export const getMedia = async(id) => {
  try{
    const dbData = await axios.get(`${baseUrl}/${id}`)
    if( dbData.data){
      const fetchedData = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)
      const response= {
        ...dbData.data,
        similar: fetchedData.data.results
      }
      return response
    }
  } catch {
    return null
  }
}