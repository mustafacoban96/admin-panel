import React from 'react'
import DashboardStartGrid from '../../components/Dashboard/DashboardStartGrid'
import TransactionChart from '../../components/Dashboard/TransactionChart'
import BuyerProfileChart from '../../components/Dashboard/BuyerProfileChart'
import RecentOrders from '../../components/Dashboard/RecentOrders'

const Dashboard = () => {
  return (
    <div className='flex gap-4 flex-col'>
        <DashboardStartGrid/>
        <div className='flex flex-row gap-4 w-full'>
          <TransactionChart/>
          <BuyerProfileChart/>
        </div>
        <div className="flex flex-row gap-4 w-full">
				<RecentOrders/>
				
			</div>
    </div>
  )
}

export default Dashboard
