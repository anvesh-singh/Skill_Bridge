//@ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Context.tsx';
import axios from 'axios';
import { decodeToken } from "react-jwt";
import  Cookies  from 'js-cookie';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setRole } = useAuth(); // Accessing setRole from context API

  // Utility to get cookies
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    console.log("hi",document.cookie)
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const signInUser = async () => {
    try {
      // Step 1: Attempt login
      const loginResponse = await axios.post(
        `${BACKEND_URL}/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(loginResponse);

      // Step 2: Get the token from cookies using the custom function
      const token = Cookies.get('jwt')
      console.log("JWT Token:", token);

      if (!token) {
        toast.error("Login failed: no token received");
        return;
      }

      // Step 3: Decode the token to get role
      const decoded = decodeToken(token);
      console.log("Decoded Token:", decoded);

      if (!decoded || !decoded.role) {
        toast.error("Login failed: role missing in token");
        return;
      }

      const role = decoded.role;
      setRole(role); // Update the role in context
      toast.success("Login successful");

      // Step 4: Navigate based on role
      if (role === 'teacher') {
        navigate('/teacherhome');
      } else {
        navigate('/');
      }

    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("Invalid credentials");
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInUser();
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

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800 rounded"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Your Password</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Instead</p>
        )}
      </div>

      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
