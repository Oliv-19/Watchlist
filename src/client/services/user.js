const baseUrl = `/api/auth`

export const register = async(userData) => {
  const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json()
}

export const login = async(userData)=> {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
  }
export const checkLoggedIn = async()=> {
  const response = await fetch(`${baseUrl}/check`)
  const data = await response.json()
  return data
}

export const logout = async()=> {
  const response = await fetch(`${baseUrl}/logout`)
  const data = await response.json()
  return data
}