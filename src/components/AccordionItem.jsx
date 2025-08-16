import { ChevronRight } from 'lucide-react'

export const AccordionItem = ({ title, children, isOpen, onClick, level = 0 }) => {
  const padding = level > 0 ? (level << 1) + 20 : 0

  return (
    <div style={{ paddingLeft: `${padding}px` }}>
      <button
        onClick={onClick}
        className='w-full flex items-center justify-between gap-2 py-2 text-left cursor-pointer'
      >
        <span className={`${level === 0 ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
          {title}
        </span>

        <ChevronRight className={`w-4 h-4 text-gray-500 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className='border-l border-[#b89c6b]'>{children}</div>
      )}
    </div>
  )
}
