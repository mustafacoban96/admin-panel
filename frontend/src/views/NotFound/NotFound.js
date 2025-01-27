import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr dark:from-darkBack dark:via-dMainBack dark:to-gray-800 from-lightBack via-lMainBack to-gray-200"
    >
      <h1 className="text-6xl font-bold text-center dark:text-darkTxtTitle text-ltxtTitle">
        404
      </h1>
      <p className="mt-4 text-lg text-center dark:text-dText text-lText">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-gradient-to-r dark:from-dMainBack dark:to-darkBack from-lMainBack to-lightBack hover:opacity-90 text-dText dark:text-dIcon rounded-lg shadow-lg transition"
        onClick={() => (window.location.href = "/")}
      >
        Ana Sayfaya Dön
      </button>
    </div>
  )
}

export default NotFound
