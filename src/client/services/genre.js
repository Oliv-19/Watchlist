const baseUrl = '/api/genre'

export const getGenre = async(id) => {
  try{
    const response = await fetch(`${baseUrl}/${id}`)
    const data = response.ok && await response.json()
    return data?  data: null
  } catch {
    return null
  }
}
export const getAllGenres = async(id) => {
  try{
    const response = await fetch(`${baseUrl}`)
    const data = response.ok && await response.json()
    return data ? (data.length >= 1?  data: null) : null
  } catch {
    return null
  }
}