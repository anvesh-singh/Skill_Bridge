import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaScissors, FaChalkboardTeacher } from 'react-icons/fa';

const courses = [
  { id: 1, title: 'Web Development Bootcamp', type: 'coding', teacher: 'John Doe', image: 'https://source.unsplash.com/featured/?coding' },
  { id: 2, title: 'Tailoring for Beginners', type: 'tailoring', teacher: 'Jane Smith', image: 'https://source.unsplash.com/featured/?tailoring' },
  { id: 3, title: 'React Advanced Guide', type: 'coding', teacher: 'Anvesh Singh', image: 'https://source.unsplash.com/featured/?react' },
  { id: 4, title: 'Fashion Tailoring Pro', type: 'tailoring', teacher: 'Iqra Abbasi', image: 'https://source.unsplash.com/featured/?fashion' },
];

const uniqueTypes = [...new Set(courses.map(course => course.type))];
const uniqueTeachers = [...new Set(courses.map(course => course.teacher))];

const Courses = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleFilter = (value: string, type: 'type' | 'teacher') => {
    if (type === 'type') {
      setSelectedTypes(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else {
      setSelectedTeachers(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  const filteredCourses = courses.filter(course => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(course.type);
    const teacherMatch = selectedTeachers.length === 0 || selectedTeachers.includes(course.teacher);
    return typeMatch && teacherMatch;
  });

  const handleCourseClick = (id: number) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Filter by Type</h2>
        {uniqueTypes.map(type => (
          <div key={type} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleFilter(type, 'type')}
              />
              <span className="ml-2 capitalize">{type}</span>
            </label>
          </div>
        ))}

        <h2 className="text-xl font-bold mt-6 mb-4">Filter by Teacher</h2>
        {uniqueTeachers.map(teacher => (
          <div key={teacher} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedTeachers.includes(teacher)}
                onChange={() => toggleFilter(teacher, 'teacher')}
              />
              <span className="ml-2">{teacher}</span>
            </label>
          </div>
        ))}
      </aside>

      {/* Course Grid */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => handleCourseClick(course.id)}
            >
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 capitalize mb-1">Type: {course.type}</p>
                <p className="text-sm text-gray-500">Teacher: {course.teacher}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
