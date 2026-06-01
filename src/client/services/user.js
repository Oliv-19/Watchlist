const baseUrl = `/api/auth`

export const register = async(userData) => {
  console.log('service')
  console.log(userData);
  
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
    console.log(data);
    return data
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
    console.log(data);
    
  }
export const perfil = async()=> {
    const response = await fetch(`${baseUrl}/perfil`)
    const data = await response.json()
    console.log(data);
    return data
  }