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
    const savedOnAir = localStorage.getItem('onAir')
    if(savedOnAir){
      const onAir = JSON.parse(savedOnAir)
      return onAir
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

export const getAiringToday = async () => {
  try{
    const savedAiringToday = localStorage.getItem('airingToday')
    if(!savedAiringToday){
      
      const airingToday = await fetch(`/api/today`)
      const airingTodayData = await airingToday.json()

      localStorage.setItem('airingToday', JSON.stringify(airingTodayData))

      return airingToday
    } else {
      const airingTodayData = JSON.parse(savedAiringToday)
      return airingTodayData
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