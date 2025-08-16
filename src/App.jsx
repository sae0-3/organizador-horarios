import { useState } from 'react'
import { MobileMenu } from './components/MobileMenu'
import { ScheduleGrid } from './components/ScheduleGrid'
import { Sidebar } from './components/Sidebar'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='lg:flex'>
      <div className='lg:hidden'>
        <MobileMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className={`
        absolute inset-y-0 left-0 z-30 w-full min-w-80 max-w-md
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:transform-none
      `}>
        <Sidebar />
      </div>

      <main className='w-full'>
        <div className='w-full p-4 max-w-4xl mx-auto mt-4'>
          <ScheduleGrid />
        </div>
      </main>
    </div>
  )
}
