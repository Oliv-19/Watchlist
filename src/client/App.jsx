import { useEffect, useState } from 'react'
import Home from './components/Home'
import Media from './components/Media'
import { Link, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import SearchResults from './components/SearchResults'
import './App.css'
import Person from './components/Person'

const Test = ()=> {
  const login = async()=> {
    const response = await fetch(`/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "test@test.com",
        password: "test"
      })
    })
    const data = await response.json()
    console.log(data);
    
  }
  const perfil = async()=> {
    const response = await fetch(`/auth/perfil`)
    const data = await response.json()
    console.log(data);
    
  }
  
  return (
    <>
    <button onClick={login}>login</button>
    <button onClick={perfil}>perfil</button>
    </>
  )
}

function App() {
   return (
    <div className="w-full h-full text-base m-0 p-0">
      <Link to='/test'>test</Link>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/media/:id" element={<Media />} />
        <Route path="/search/:query" element={<SearchResults />}/>
        <Route path="/actor/:id" element={<Person />}/>
        <Route path="/author/:id" element={<Person />}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
    </div>
  );
}

export default App
