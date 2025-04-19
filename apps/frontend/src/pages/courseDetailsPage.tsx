import React from 'react';
import { useParams } from 'react-router-dom';

const mockCourseDetails = {
  course1: {
    title: 'React Fundamentals',
    students: [
      { id: 'stu1', name: 'Alice', progress: 100 },
      { id: 'stu2', name: 'Bob', progress: 75 },
    ],
  },
  course2: {
    title: 'Intro to Python',
    students: [
      { id: 'stu3', name: 'Charlie', progress: 85 },
      { id: 'stu4', name: 'David', progress: 100 },
    ],
  },
};

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourseDetails[courseId];

  const generateCertificate = (studentName: string) => {
    alert(`Certificate generated for ${studentName}!`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">{course?.title} - Students</h2>
      <ul className="space-y-4">
        {course?.students.map((student) => (
          <li key={student.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">Progress: {student.progress}%</p>
            </div>
            {student.progress === 100 && (
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                onClick={() => generateCertificate(student.name)}
              >
                Generate Certificate
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetailsPage;
