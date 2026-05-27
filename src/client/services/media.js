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

export const getOnAir = async() => {
  
  try{
    const saved = localStorage.getItem('onAir')
    if(saved){
      return JSON.parse(saved)
    }else{
      const onAir = await axios.get(`/api/onAir`)
      localStorage.setItem('onAir', JSON.stringify(onAir.data))
      return onAir.data
    }
  } catch {
    return null
  }
}

export const search = async(query, page) => {
  try{
    const search = await axios.get(`/api/search/${query}/${page}`)
    return search.data
  } catch {
    return null
  }
}