import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-blue-500 font-semibold text-lg">Loading...</p>
    </div>
</div>
  )
}

export default Spinner
