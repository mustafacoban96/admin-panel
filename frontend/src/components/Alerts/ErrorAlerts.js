import React from 'react'

const ErrorAlerts = ({error}) => {
  return (
    <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md" role="alert">
                    <strong className="font-bold">Oops!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
    </div>
  )
}

export default ErrorAlerts
