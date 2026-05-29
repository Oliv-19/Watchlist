const baseUrl = '/api/media'

export const getMedia = async(id) => {
  try{
    const dbData = await fetch(`${baseUrl}/${id}`)
    const data = await dbData.json()

    return data
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
      const onAir = await fetch(`/api/onAir`)
      const data = await onAir.json()
      localStorage.setItem('onAir', JSON.stringify(data))
      return data
    }
  } catch {
    return null
  }
}

export const search = async(query, page) => {
  try{
    const search = await fetch(`/api/search/${query}/${page}`)
    const data = await search.json()
    console.log(data);
    
    return data
  } catch {
    return null
  }
}