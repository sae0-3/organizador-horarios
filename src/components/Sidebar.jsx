import { BookOpen } from 'lucide-react'
import { FacultiesAccordion } from './FacultiesAccordion'

export const Sidebar = () => {
  return (
    <aside
      className='w-full bg-gradient-to-br from-[#f5ecd7] via-[#f8f4e6] to-[#e9dcc3] rounded-xl sm:rounded-2xl border border-[#e2cfa3] overflow-hidden transition-all duration-300 p-4 flex flex-col'
    >
      <h2 className='px-2 py-3 sm:px-4 sm:py-4 text-lg sm:text-2xl font-bold text-[#7c6a4a] bg-[#f5ecd7] flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl mb-2 shadow-sm'>
        <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-[#b89c6b] drop-shadow' />
        Programas Académicos
      </h2>

      <div className='divide-y divide-[#e2cfa3] flex-1'>
        <FacultiesAccordion />
      </div>
    </aside>
  )
}
