import React from 'react'
import logo from "../../assets/SANKOLogo-02.png";
const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className='flex justify-center'> 
                <img src={logo} className='w-48' alt='sanko-logo'/>
            </div>
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sanko Panel</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <div className='flex justify-center py-5'>
          <button
            type="submit"
            className="w-72 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
</div>

  )
}

export default Register
