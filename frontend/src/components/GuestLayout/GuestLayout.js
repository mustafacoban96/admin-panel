import React from 'react'
import {Navigate, Outlet} from 'react-router'
import { useAuthContext } from '../../context/AuthContext'

const GuestLayout = () => {

  const{access_token} = useAuthContext();

  if(access_token){
    return <Navigate to='home'/>
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default GuestLayout
