import axios from "axios";

const key= import.meta.env.VITE_API_KEY
const baseUrl = '/api/people'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${key}`
      }
};

export const addPeople = async(cast, castMedia) => {
  try{
    const response = await axios.post(baseUrl, {cast, castMedia})
    return response.data
  } catch {
    return null
  }
}