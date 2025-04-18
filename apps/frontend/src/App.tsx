import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Courses from './pages/Courses'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Login from './pages/Login'
import StudentProfile from './pages/StudentProfile'

const App = () => {
  return (
    <>
      <Navbar />

      <div className="pt-16"> {/* To push content below fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentprofile" element={<StudentProfile/>} />
        </Routes>
      </div>

      <Footer/>
    </>
  )
}

export default App
