import Home from './components/Home'
import Media from './components/Media/Media'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import SearchResults from './components/Search/SearchResults'
import './App.css'
import Person from './components/Person'
import { AuthProvider } from './components/AuthContext'
import { Profile } from './components/Profile/Profile'
import { useEffect } from 'react'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname])
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
