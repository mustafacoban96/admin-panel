import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from "../../assets/SANKOLogo-02.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSchema } from '../../validations/RegisterScheme';
import useAuthService from '../../services/auth-service';


const Register = () => {
  //api
  const {registerApi} = useAuthService();
  const {
    register:register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    // API call simulation
    console.log('Form Data:', data);
    registerApi(data);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center">
            <img src={logo} className="w-48" alt="sanko-logo" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Sanko Panel</h2>
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
                {...register('username')}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.username
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Enter your username"
              />
              <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Enter your email"
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
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
                {...register('password')}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Enter your password"
              />
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                {...register('confirm_password')}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.confirm_password
                    ? 'border-red-500'
                    : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder="Confirm your password"
              />
              <p className="text-red-500 text-sm mt-1">{errors.confirm_password?.message}</p>
            </div>
            <div className="flex justify-center py-5">
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
      <ToastContainer />
    </>
  );
};

export default Register;
