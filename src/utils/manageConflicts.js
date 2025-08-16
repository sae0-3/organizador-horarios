export const hasScheduleConflict = (a, b) => {
  if (a.day !== b.day) return false

  const aStart = _timeToMinutes(a.start)
  const aEnd = _timeToMinutes(a.end)
  const bStart = _timeToMinutes(b.start)
  const bEnd = _timeToMinutes(b.end)

  return aStart < bEnd && bStart < aEnd
}

const _timeToMinutes = time => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const removeConflicts = (groupId, otherGroups) => {
  return Object.fromEntries(
    Object.entries(otherGroups).map(([groupKey, group]) => [
      groupKey,
      {
        ...group,
        schedule: group.schedule.map(scheduleItem => {
          const conflicts = { ...scheduleItem.conflicts }
          delete conflicts[groupId]

          return {
            ...scheduleItem,
            conflicts
          }
        })
      }
    ])
  )
}
