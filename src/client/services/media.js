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
      const onAir = await fetch(`/api/onAir`)
      const data = await onAir.json()

      return data
  } catch {
    return null
  }
}

export const getAiringToday = async () => {
  try{
      const airingToday = await fetch(`/api/today`)
      const airingTodayData = await airingToday.json()

      return airingTodayData
  } catch {
    return null
  }
}

export const search = async(query, page) => {
  try{
    const search = await fetch(`/api/search/${query}/${page}`)
    const data = await search.json()
    
    return data
  } catch {
    return null
  }
}