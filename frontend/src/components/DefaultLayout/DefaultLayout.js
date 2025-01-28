import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../features/theme/themeSlice';

const DefaultLayout = () => {
  const { token } = useAuthContext();
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);  // Get darkMode from Redux store

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };
  useEffect(() => {
    
  }, [darkMode]);
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Move the useEffect hook out of the conditional block
  

  return (
    <div className={darkMode ? 'dark' : ''}>
      <ToastContainer />
      <div className="flex h-screen w-screen overflow-hidden">
        {/* SideBar */}
        <SideBar />

        {/* Main Content */}
        <div className="ml-60 flex-1 flex flex-col">
          {/* Header */}
          <div className="fixed top-0 left-60 right-0 h-16 bg-lightBack dark:bg-darkBack shadow-md z-10">
            <Header />
          </div>

          {/* Content */}
          <div className="mt-16 flex-1 overflow-auto p-4 bg-lMainBack dark:bg-dMainBack">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg z-50"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};

export default DefaultLayout;
