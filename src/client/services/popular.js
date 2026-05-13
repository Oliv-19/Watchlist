const baseUrl = '/api/popular'

export const populatePopular = async() => {
  const fetchedData = useSearch('popular')
  const response = await fetch("http://localhost:8787", {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(fetchedData.results)
  })
  return response
}