import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
import { FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';
=======
import { FaChalkboardTeacher, FaBookOpen, FaCertificate, FaPrint } from 'react-icons/fa';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
>>>>>>> a7d0186b018259056b9c2ba3efc8141f0725728f

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    // Simulate API fetch
    setTimeout(() => {
      setCourse({
        id: courseId,
        title: 'Advanced Web Development',
        image: 'https://source.unsplash.com/800x400/?coding,technology',
        teacher: 'John Doe',
        type: 'Coding',
        description: 'Master advanced concepts in front-end and back-end web development.',
      });
    }, 1000);

    // Check if already joined
    const joinedCourses = JSON.parse(localStorage.getItem('joinedCourses') || '[]');
    setJoined(joinedCourses.includes(courseId));
=======
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/getcourse/${courseId}`, {
          withCredentials: true,
        });

        setCourse(res.data.course);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    console.log("hi", courseId);
    if(courseId)fetchCourse();

>>>>>>> a7d0186b018259056b9c2ba3efc8141f0725728f
  }, [courseId]);

  const handleJoin = () => {
    const joinedCourses = JSON.parse(localStorage.getItem('joinedCourses') || '[]');
    const updated = [...new Set([...joinedCourses, courseId])];
    localStorage.setItem('joinedCourses', JSON.stringify(updated));
    setJoined(true);
  };

  const handleLeave = () => {
    const joinedCourses = JSON.parse(localStorage.getItem('joinedCourses') || '[]');
    const updated = joinedCourses.filter((id: string) => id !== courseId);
    localStorage.setItem('joinedCourses', JSON.stringify(updated));
    setJoined(false);
  };

  if (!course) return <div className="text-center mt-10">Loading course details...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <img src={course.image} alt={course.title} className="w-full rounded-lg shadow-lg" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
      <div className="flex items-center gap-6 text-gray-600 mb-4">
        <p className="flex items-center gap-2"><FaBookOpen /> {course.type}</p>
        <p className="flex items-center gap-2"><FaChalkboardTeacher /> {course.instructorName}</p>
      </div>

      <p className="text-lg text-gray-700 mb-6">{course.description}</p>

      {joined ? (
        <button onClick={handleLeave} className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700">
          Leave Course
        </button>
      ) : (
        <button onClick={handleJoin} className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Join Course
        </button>
      )}
    </div>
  );
};

export default CourseDetails;
