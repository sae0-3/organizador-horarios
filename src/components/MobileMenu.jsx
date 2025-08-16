import { Menu, X } from 'lucide-react'

export const MobileMenu = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className='fixed top-3 right-3 z-50 bg-[#e2cfa3] text-black/70 p-3 rounded-lg shadow-lg border border-gray-200'
      aria-label={isSidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
    >
      {isSidebarOpen ? (
        <X className='w-6 h-6' />
      ) : (
        <Menu className='w-6 h-6' />
      )}
    </button>
  )
}
