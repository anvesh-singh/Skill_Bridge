import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="text-gray-800">

      {/* Hero Header */}
      <div className="relative w-full h-[280px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581093588401-3a26f4efccd3?auto=format&fit=crop&w=1400&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Get in Touch</h1>
        </div>
      </div>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Form */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea rows={5} placeholder="Your Message" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-indigo-600 text-xl" />
            <span>123 Skill Bridge Lane, Tech City, India</span>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-indigo-600 text-xl" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-indigo-600 text-xl" />
            <span>contact@skillbridge.com</span>
          </div>
        </div>
      </section>

      {/* Optional Map */}
      {/* <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto rounded overflow-hidden shadow-lg">
          <iframe
            className="w-full h-72"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.876350096265!2d90.406096!3d23.750903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7d604273fa57b7df!2sSkill%20Bridge!5e0!3m2!1sen!2sin!4v1617681454589!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section> */}

    </div>
  )
}

export default Contact
