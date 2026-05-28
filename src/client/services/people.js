const baseUrl = '/api/people'

export const getPerson = async(id) => {
  try{
    const response = await fetch(`${baseUrl}/${id}`)
    const data = response.ok && await response.json()
    return data
  } catch {
    return null
  }
}
