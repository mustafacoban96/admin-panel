import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'
import Dashboard from '../Dashboard/Dashboard';
import SideBar from '../SideBar/SideBar';

const DefaultLayout = () => {
  const {token,user} = useAuthContext();


  // if(!token){
  //   return <Navigate to='login'/>
  // }
  return (
    <div className='flex flex-row bg-gray-100 h-screen w-screen overflow-hidden'>
      <SideBar/>
      <div className='p-4'>
        <div className='bg-teal-200'>Header</div>
        <div><Dashboard/></div>
        <div><Outlet/></div>
      </div>
      <div className='bg-red-400'>footer</div>
      
    </div>
  )
}

export default DefaultLayout
