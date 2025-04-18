import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Context.tsx';  // Importing useAuth

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [isStudent, setIsStudent] = useState(true);
  const navigate = useNavigate();
  
  const { setRole } = useAuth();  // Accessing setRole from context API

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate successful login
    toast.success('Login successful!');

    // Set the role based on the checkbox selection
    setRole(isStudent ? 'student' : 'teacher');

    // Navigate based on user type
    if (isStudent) {
      navigate('/');  // Student → home
    } else {
      navigate('/teacherhome');  // Teacher → teacher home page
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-20 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? null : (
        <input type="text" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Name" required />
      )}

      <input type="email" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Email" required />
      <input type="password" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Password" required />

      {/* Checkbox for user role */}
      <div className="w-full flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isStudent}
          onChange={() => setIsStudent(!isStudent)}
          id="role"
          className="form-checkbox"
        />
        <label htmlFor="role">{isStudent ? 'Logging in as Student' : 'Logging in as Teacher'}</label>
      </div>

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Instead</p>
        )}
      </div>

      <button type="submit" className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
