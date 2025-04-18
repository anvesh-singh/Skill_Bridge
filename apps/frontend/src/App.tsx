import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeacherNavbar from './components/TeacherNavbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import CourseDetails from './pages/SingleCourse';
import TeacherHome from './pages/TeacherHome';
import MyCourses from './pages/MyCourses.tsx';
import AddCourse from './pages/AddCourse.tsx';
import CourseDetailsPage from './pages/CourseDetailsPage';

import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/Context.tsx';  // Make sure this path is correct
import ProfileTeacher from './pages/ProfileTeacher.tsx';
import { Lobby } from './pages/VCLobby.tsx';

const App: React.FC = () => {
  const location = useLocation();
  const { role } = useAuth(); // Get role from context
  const hideNavbarOnRoutes = ['/login'];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" />

      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && (
        role === 'teacher' ? <TeacherNavbar /> : <Navbar />
      )}

      <div className={shouldHideNavbar ? '' : 'pt-16'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course/:courseid" element={<CourseDetails />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/myCourses" element={<MyCourses/>} />
          <Route path="/myCourses/:courseId" element={<CourseDetailsPage />} />
          <Route path="/profile-teacher" element={<ProfileTeacher/>} />
<<<<<<< HEAD


          <Route path="/lobby" element={<Lobby/>} />
=======
          <Route path="/teacherhome" element={<TeacherHome/>} />
>>>>>>> 8d67a106475de4e42d5ebd2e2b41a8292e8afee6
        </Routes>
      </div>

      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default App;
