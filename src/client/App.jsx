import { useEffect, useState } from 'react'
import Home from './components/Home'
import Media from './components/Media'
import { Link, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import SearchResults from './components/SearchResults'
import './App.css'
import Person from './components/Person'
import { AuthProvider } from './components/AuthContext'
import { Profile } from './components/Profile'

function App() {
   return (
    <div className="w-full h-screen text-base m-0 p-0">
      <AuthProvider>

      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/media/:id" element={<Media />} />
        <Route path="/search/:query" element={<SearchResults />}/>
        <Route path="/actor/:id" element={<Person />}/>
        <Route path="/author/:id" element={<Person />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App
