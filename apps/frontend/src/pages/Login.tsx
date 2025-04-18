import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')

  const onSubmitHandler = async(e) => {
     e.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-20 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState==='Login' ? "" : <input type="text" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Name" required />}
      <input type="email" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Email" required />
      <input type="password" className="w-full px-3 py-2 border border-gray-800 rounded" placeholder="Password" required />
      {/* <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
        Submit
      </button> */}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {
          currentState==='Login' ?
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> :
          <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Instead</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login


// import React, { useState } from 'react'

// const Login = () => {
//   const [currentState] = useState('Sign Up')

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
//       <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-800">{currentState}</h2>
//           <div className="mt-1 w-16 h-1 bg-indigo-500 mx-auto rounded"></div>
//         </div>

//         <input
//           type="text"
//           placeholder="Name"
//           required
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//         />

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Login

