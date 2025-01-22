import React from 'react';
import logo from "../../assets/SANKOLogo-02.png";
import useAuthService from '../../services/auth-service';
import { ToastContainer } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../validations/LoginScheme'; 


const Login = () => {
  const { loginApi } = useAuthService();

  // react-hook-form setup
  const {
    register:login,// it connects inputs to form
    handleSubmit, // if all validations are successful , run callback
    formState: { errors }, // formState includes form errors
  } = useForm({
    resolver: yupResolver(loginSchema),// validation rules
  });

  // Handle form submission
  const onSubmit = (data) => {
    //console.log("Form Data:", data);
    // API call
    loginApi(data); 
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center">
            <img src={logo} className="w-48" alt="sanko-logo" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Sanko Panel
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...login("username")}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
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
                {...login("password")}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center py-5">
              <button
                type="submit"
                className="w-72 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
