import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Admin from './admin/Admin'
import ControlRequests from './admin/controlRequests'
import NotFound from './pages/404'
import Profile from './pages/Profile'
import NoteRequest from './pages/NoteRequest'
import Favorites from './pages/Favorites'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/requests' element={<ControlRequests />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/note-request' element={<NoteRequest />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
