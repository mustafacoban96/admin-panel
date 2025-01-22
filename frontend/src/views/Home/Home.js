import React, { useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  Package,
  Calendar,
  MessageSquare
} from 'lucide-react';
import logo from "../../assets/SANKOLogo-02.png";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
    {/* Sidebar */}
    {
      sidebarOpen && (
        <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <img src={logo} alt="Sanko Logo" className="w-32 mx-auto" />
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button className="flex items-center space-x-3 w-full p-3 bg-blue-600 text-white rounded-lg">
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Users className="h-5 w-5" />
              <span>Users</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Package className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
              <span>Orders</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>
      </div>
      )
    }

    {/* Main Content */}
    <div className="flex-1">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <button className="text-gray-500">
              <Menu onClick={toggleSidebar} className="h-6 w-6 bg-red-700" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            
            <button className="relative p-2 text-gray-600 hover:text-gray-700">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">8,249</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">12,423</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+8.2%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">1,829</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-red-500 text-sm font-medium">-2.3%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">4,123</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+4.5%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + item}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">User Activity {item}</p>
                    <p className="text-sm text-gray-500">Completed action #{item} • 2 hours ago</p>
                  </div>
                  <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  )
}

export default Home
