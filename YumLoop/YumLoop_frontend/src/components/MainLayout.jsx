import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - 25% of screen width, fixed height, non-scrollable */}
      <div className="w-1/4 h-screen overflow-hidden">
        <Sidebar />
      </div>
      
      {/* Main Content Area - 75% of screen width with proper background */}
      <div className="w-3/4 bg-gray-100 dark:bg-gray-900 h-screen overflow-y-auto">
        <main className="min-h-full">
          <Outlet />
        </main>
        
        {/* Footer - only show on pages that need it */}
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout 