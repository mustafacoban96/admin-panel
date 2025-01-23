import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
const BoxWrapper = ({children}) =>{
    return(
        <div className='bg-lightBack dark:bg-darkBack rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>
    )
}
const DashboardStartGrid = () => {
  return (
    <div className='flex gap-4 w-full'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
            <IoBagHandle className="text-2xl text-white"/>
        </div>
        
        <div className='pl-4'>
        <span className='text-sm text-lText dark:text-darkTxtTitle'>Total Sales</span>
        <div className='flex items-center'>
            <strong className='text-xl text-lText dark:text-darkTxtTitle font-semibold'>$3425.60</strong>
            <span className='text-sm text-green-500 pl-2'>+234</span>
        </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12  flex items-center justify-center bg-orange-600'>
            <IoPieChart className='text-2xl text-white'/>
        </div>
        <div className='pl-4'>
            <span className='text-sm text-lText dark:text-darkTxtTitle font-light'>Total Expenses</span>
            <div className="flex items-center">
                <strong className="text-xl text-lText dark:text-darkTxtTitle font-semibold">$3423</strong>
                <span className="text-sm text-green-500 pl-2">-343</span>
            </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
            <span className="text-sm text-lText dark:text-darkTxtTitle font-light">Total Customers</span>
            <div className="flex items-center">
                <strong className="text-xl text-lText dark:text-darkTxtTitle font-semibold">12313</strong>
                <span className="text-sm text-red-500 pl-2">-30</span>
            </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
            <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
            <span className="text-sm text-lText dark:text-darkTxtTitle font-light">Total Orders</span>
            <div className="flex items-center">
                <strong className="text-xl text-lText dark:text-darkTxtTitle font-semibold">16432</strong>
                <span className="text-sm text-red-500 pl-2">-43</span>
            </div>
        </div>
      </BoxWrapper>
    </div>
  )
}

export default DashboardStartGrid



