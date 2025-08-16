import React, { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { generateGroupColors } from '../utils/generateGroupColors'
import { ScheduleItem } from './ScheduleItem'

export const ScheduleGrid = () => {
  const { selectedGroups } = useStore()
  const colors = useMemo(() => generateGroupColors(selectedGroups), [selectedGroups])

  const timeSlots = Array.from({ length: 21 }, (_, i) => {
    const totalMinutes = 6 * 60 + 45 + i * 45
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  })

  const fullDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const dayMap = { 'LU': 0, 'MA': 1, 'MI': 2, 'JU': 3, 'VI': 4, 'SA': 5 }

  const timeToSlotIndex = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes
    const startMinutes = 6 * 60 + 45
    return Math.floor((totalMinutes - startMinutes) / 45)
  }

  const scheduleItems = []
  Object.entries(selectedGroups).forEach(([key, group]) => {
    if (group.schedule && Array.isArray(group.schedule)) {
      group.schedule.forEach((scheduleItem, idx) => {
        const dayIndex = dayMap[scheduleItem.day]
        const startSlot = timeToSlotIndex(scheduleItem.start)
        const endSlot = timeToSlotIndex(scheduleItem.end)

        if (dayIndex !== undefined && startSlot >= 0 && startSlot < timeSlots.length) {
          scheduleItems.push({
            id: `${key}-${group.code}-${scheduleItem.day}-${idx}`,
            name: group.name,
            code: group.code,
            room: scheduleItem.room,
            start: scheduleItem.start,
            end: scheduleItem.end,
            type: scheduleItem.type,
            dayIndex,
            startSlot,
            duration: Math.max(1, endSlot - startSlot),
            color: colors[key],
            hasConflicts: scheduleItem.conflicts && Object.keys(scheduleItem.conflicts).length > 0
          })
        }
      })
    }
  })

  const getItemsForCell = (dayIndex, slotIndex) => {
    return scheduleItems.filter(item =>
      item.dayIndex === dayIndex &&
      slotIndex >= item.startSlot &&
      slotIndex < item.startSlot + item.duration
    )
  }

  const activeDays = fullDays.filter((day, dayIndex) =>
    scheduleItems.some(item => item.dayIndex === dayIndex)
  )

  const usedSlots = scheduleItems.flatMap(item =>
    Array.from({ length: item.duration }, (_, i) => item.startSlot + i)
  )

  const minUsedSlot = usedSlots.length > 0 ? Math.min(...usedSlots) : 0
  const maxUsedSlot = usedSlots.length > 0 ? Math.max(...usedSlots) : timeSlots.length - 1
  const visibleTimeSlots = timeSlots.slice(minUsedSlot, maxUsedSlot + 1)

  if (activeDays.length === 0 || visibleTimeSlots.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500'>
        No hay horarios para mostrar
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
      <div className='overflow-auto max-h-[80vh] lg:max-h-none'>
        <div className='grid gap-0 min-w-[400px] max-w-full' style={{ gridTemplateColumns: `3rem repeat(${activeDays.length}, minmax(100px, 1fr))` }}>
          <div className='sticky top-0 z-25 bg-gradient-to-b from-slate-700 to-slate-800 text-white font-bold text-center border-b border-r border-slate-300 py-1.5 text-[11px] sm:text-sm flex items-center justify-center'>
            Hora
          </div>

          {activeDays.map((day) => (
            <div
              key={day}
              className='sticky top-0 z-25 bg-gradient-to-b from-slate-700 to-slate-800 text-white font-bold text-center border-b border-slate-300 py-1.5 text-[11px] sm:text-sm flex items-center justify-center'
              title={day}
            >
              <span className='truncate'>{day}</span>
            </div>
          ))}

          {visibleTimeSlots.map((time, index) => {
            const originalSlotIndex = timeSlots.indexOf(time)

            return (
              <React.Fragment key={time}>
                <div
                  className={`
                    sticky left-0 z-20 text-[10px] sm:text-xs font-mono text-center border-r border-slate-200 flex justify-center w-12 pt-1 font-semibold min-h-5
                    ${index % 2 === 0
                      ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800'
                      : 'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700'}
                  `}
                >
                  <div className='leading-none'>{time}</div>
                </div>

                {activeDays.map((day) => {
                  const originalDayIndex = fullDays.indexOf(day)
                  const cellItems = getItemsForCell(originalDayIndex, originalSlotIndex)

                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`
                        border-b border-r border-slate-200 relative hover:bg-blue-50 transition-colors duration-150 min-h-5
                        ${index % 2 === 0
                          ? 'bg-gradient-to-br from-amber-25 to-amber-50'
                          : 'bg-gradient-to-br from-slate-25 to-slate-50'}
                      `}
                    >
                      <div className='p-0.5 flex flex-col gap-0.5'>
                        {cellItems.map((item, itemIndex) => (
                          <ScheduleItem
                            key={`${item.id}-${itemIndex}`}
                            item={item}
                            isMultiple={cellItems.length > 1}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
