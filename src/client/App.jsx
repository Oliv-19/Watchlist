import { useEffect, useState } from 'react'
import Home from './components/Home'
import Media from './components/Media'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import SearchResults from './components/SearchResults'
import './App.css'
import { useSearch } from './components/hooks'

function App() {
   return (
    <div className="w-full h-full text-base m-0 p-0">
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<Media />} />
        <Route path="/search/:query" element={<SearchResults />}/>
        <Route path="/author/:id" element={''}/>
      </Routes>
    </div>
  );
}

export default App
