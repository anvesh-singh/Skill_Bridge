import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-500">Skill Bridge</h2>
            <p className="mt-2 text-sm text-gray-400">
              Empowering learners with quality education and skill development.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-gray-400">Email: support@skillbridge.com</p>
            <p className="text-sm text-gray-400 mt-1">Phone: +1 (123) 456-7890</p>
            <p className="text-sm text-gray-400 mt-1">Location: San Francisco, CA</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Skill Bridge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
