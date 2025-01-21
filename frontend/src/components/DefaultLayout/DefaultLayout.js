import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'

const DefaultLayout = () => {
  const {access_token,user} = useAuthContext();


  if(!access_token){
    return <Navigate to='login'/>
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default DefaultLayout
