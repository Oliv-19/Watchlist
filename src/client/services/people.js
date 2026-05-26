import axios from "axios";

const baseUrl = '/api/people'

export const getPerson = async(id) => {
  try{
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch {
    return null
  }
}
