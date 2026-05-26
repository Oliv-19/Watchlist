import axios from "axios";

const baseUrl = '/api/genre'

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