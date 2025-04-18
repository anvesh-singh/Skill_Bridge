import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 md:px-8">

          {/* Left: Brand */}
          <div className="text-2xl font-bold text-indigo-600">
            Skill Bridge
          </div>

          {/* Center: Menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">Home</Link>
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600 transition font-medium">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition font-medium">Contact</Link>
          </div>

          {/* Right: Profile & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="hidden md:block">
              <User className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition" />
            </Link>

            {/* Mobile Toggle */}
            <button className="md:hidden" onClick={toggleMenu}>
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          <Link to="/" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/courses" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Courses</Link>
          <Link to="/about" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">About</Link>
          <Link to="/contact" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Contact</Link>
          <Link to="/profile" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600">Profile</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
