import React from 'react'
import {Navigate, Outlet} from 'react-router'
import { useAuthContext } from '../../context/AuthContext'

const GuestLayout = () => {

  const{token,user} = useAuthContext();

  // if (token === null) {
  //   // Token kontrolü için null durumunda yükleme beklenebilir
  //   return (
  //     setTimeout(() =>{
  //       <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
  //     </div>
  //     },1500)
  //   );
  //}
  if(token && user){
    return <Navigate to='home'/>
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default GuestLayout
