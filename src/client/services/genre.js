import axios from "axios";

const key= import.meta.env.VITE_API_KEY
const baseUrl = '/api/genre'

export const populateGenres = async() => {
    const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${key}`
        }
    };
  try{
    const fetchedData = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?language=en`, options)
    await axios.post(baseUrl, fetchedData.data)
    return 
  } catch {
    return null
  }
}
export const getGenre = async(id) => {
  try{
    const response = await axios.get(`${baseUrl}/${id}`)
    
    return response.data?  response.data: null
  } catch {
    return null
  }
}
export const getAllGenres = async(id) => {
  try{
    const response = await axios.get(`${baseUrl}`)
    
    return response.data ? (response.data.length >= 1?  response.data: null) : null
  } catch {
    return null
  }
}