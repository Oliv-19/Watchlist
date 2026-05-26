import axios from "axios";
const baseUrl = '/api/media'

export const getMedia = async(id) => {
  try{
    const dbData = await axios.get(`${baseUrl}/${id}`)
    return dbData.data
  } catch {
    return null
  }
}