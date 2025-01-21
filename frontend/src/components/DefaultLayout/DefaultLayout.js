import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'

const DefaultLayout = () => {
  const {token,user} = useAuthContext();


  if(!token){
    return <Navigate to='login'/>
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default DefaultLayout
