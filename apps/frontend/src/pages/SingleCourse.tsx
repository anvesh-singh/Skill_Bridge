import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChalkboardTeacher, FaBookOpen, FaCertificate, FaPrint } from 'react-icons/fa';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCourse({
        id: courseId,
        title: 'Advanced Web Development',
        image: 'https://source.unsplash.com/800x400/?coding,technology',
        teacher: 'John Doe',
        type: 'Coding',
        description: 'Master advanced concepts in front-end and back-end web development.'
      });
    }, 1000);
  }, [courseId]);

  const handleJoin = () => setJoined(true);
  const handleLeave = () => setJoined(false);
  const handleComplete = () => setCompleted(true);

  if (!course) return <div className="text-center mt-10">Loading course details...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <img src={course.image} alt={course.title} className="w-full rounded-lg shadow-lg" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
      <div className="flex items-center gap-6 text-gray-600 mb-4">
        <p className="flex items-center gap-2"><FaBookOpen /> {course.type}</p>
        <p className="flex items-center gap-2"><FaChalkboardTeacher /> {course.teacher}</p>
      </div>

      <p className="text-lg text-gray-700 mb-6">{course.description}</p>

      {!joined ? (
        <button onClick={handleJoin} className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">Join Course</button>
      ) : (
        <>
          <button onClick={handleLeave} className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 mr-4">Leave Course</button>
          {!completed ? (
            <button onClick={handleComplete} className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">Mark as Completed</button>
          ) : (
            <div className="mt-6 space-x-4">
              <button className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-2">
                <FaCertificate /> Get Certificate
              </button>
              <button onClick={() => window.print()} className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-800 flex items-center gap-2">
                <FaPrint /> Print Certificate
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseDetails;