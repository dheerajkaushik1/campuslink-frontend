import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Admin from './admin/Admin'
import MeetTheAdmin from './admin/MeetTheAdmin'
import ControlRequests from './admin/controlRequests'
import NotFound from './pages/404'
import Profile from './pages/Profile'
import NoteRequest from './pages/NoteRequest'
import Favorites from './pages/Favorites'
import Syllabus from './pages/Others/Syllabus'
import PyP from './pages/Others/PyP'
import QuizHome from './pages/quiz/QuizHome'
import QuizPlay from './pages/quiz/QuizPlay'
import QuizResult from './pages/quiz/QuizResult'
import QuizLeaderboard from './pages/quiz/QuizLeaderboard'

function App() {
  const location = useLocation()
  const hideLayout = location.pathname === '/quiz/play'

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/syllabus' element={<Syllabus />} />
        <Route path='/papers' element={<PyP />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/quiz' element={<QuizHome />} />
        <Route path='/quiz/play' element={<QuizPlay />} />
        <Route path='/quiz/result' element={<QuizResult />} />
        <Route path='/quiz/leaderboard' element={<QuizLeaderboard />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/meet-the-admin' element={<MeetTheAdmin />} />
        <Route path='/admin/requests' element={<ControlRequests />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/note-request' element={<NoteRequest />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}

export default App
