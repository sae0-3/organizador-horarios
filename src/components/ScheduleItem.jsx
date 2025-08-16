export const ScheduleItem = ({ item, isMultiple = false }) => {
  const typeConfig = { 'L': 'LAB', 'A': 'AUX' }
  const currentType = typeConfig[item.type]

  const getBadgeColor = (type) => {
    switch (type) {
      case 'LAB': return 'bg-emerald-500 text-white'
      case 'AUX': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <div
      className={`
        h-full rounded-sm text-xs border-l-3 relative overflow-visible shadow-sm hover:shadow-md transition-shadow duration-200
        ${isMultiple ? 'flex-1 min-w-0' : 'w-full'}
        ${item.hasConflicts
          ? 'bg-gradient-to-br from-red-100 to-red-200 border-red-500 text-red-900'
          : item.color}
      `}
    >
      {item.hasConflicts && (
        <div className='absolute -top-1 -left-1 z-10'>
          <div className='w-3 h-3 bg-red-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-[8px] font-bold'>!</span>
          </div>
        </div>
      )}

      {currentType && (
        <div className='absolute -top-1 -right-0.5 z-10'>
          <span className={`
            inline-block px-1 py-0.5 rounded-full text-[6px] font-bold shadow-md border border-white/50
            ${getBadgeColor(currentType)}
          `}>
            {currentType}
          </span>
        </div>
      )}

      <div className='p-1 h-full flex flex-col justify-center'>
        <p className='font-bold leading-tight sm:text-[12px] text-center mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis'>
          {item.name}
        </p>

        <div className='text-[10px] opacity-90 space-y-0.5'>
          <div className='flex justify-between items-center font-medium'>
            <span className='truncate'>G:{item.code}</span>
            <span className='truncate text-right'>{item.room}</span>
          </div>
        </div>
      </div>
    </div>
  )
}