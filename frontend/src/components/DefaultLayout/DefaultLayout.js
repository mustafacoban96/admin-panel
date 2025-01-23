import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

const DefaultLayout = () => {
  const {token,user} = useAuthContext();
  const [darkMode, setDarkMode] = useState(false);

  // if (token === null) {
  //   Token kontrolü için null durumunda yükleme beklenebilir
  //   return (
  //     setTimeout(() =>{
  //       <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
  //     </div>
  //     },1500)
  //   );
  // }

  if (!(token && user)) {
    return <Navigate to="login" />;
  }
  return (
    <div className={darkMode ? 'dark' : ''}>
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
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed bottom-6 right-6 p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg z-50"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  )
}

export default DefaultLayout
