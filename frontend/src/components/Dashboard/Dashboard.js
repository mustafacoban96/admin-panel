import React from 'react'
import { Link } from 'react-router'

const Dashboard = () => {
  return (
    <>
    <div>
        <Link to='/product'>Product</Link>
    </div>
    <div>
        <Link to='/home'>home</Link>
    </div>
    </>
  )
}

export default Dashboard
