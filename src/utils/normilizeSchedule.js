import { hasScheduleConflict } from './manageConflicts'

export const normalizeSchedule = (id, currentGroup, otherGroups = {}) => {
  const scheduleEntries = currentGroup.schedule.map(scheduleItem => ({
    type: currentGroup.is_lab ? 'L' : 'T',
    ...formatSchedule(scheduleItem)
  }))

  currentGroup.assistants?.forEach(assistant => {
    assistant.schedule.forEach(assistantSchedule => {
      scheduleEntries.push({
        type: 'A',
        ...formatSchedule(assistantSchedule)
      })
    })
  })

  let newConflicts = 0
  scheduleEntries.forEach((newEntry, newIndex) => {
    Object.entries(otherGroups).forEach(([otherCode, otherGroup]) => {
      otherGroup.schedule.forEach((otherSchedule, otherIndex) => {
        if (hasScheduleConflict(newEntry, {
          day: otherSchedule.day,
          start: otherSchedule.start,
          end: otherSchedule.end
        })) {
          newEntry.conflicts[otherCode] = otherIndex
          newConflicts++

          if (!otherSchedule.conflicts) {
            otherSchedule.conflicts = {}
          }
          otherSchedule.conflicts[id] = newIndex
        }
      })
    })
  })

  return [{
    name: currentGroup.subjectName,
    code: currentGroup.code,
    schedule: scheduleEntries,
    total_minutes: currentGroup.total_minutes
  }, newConflicts]
}

const formatSchedule = (schedule) => {
  const [start, end] = schedule.time.split('-')
  return {
    day: schedule.day,
    start: `${start.slice(0, 2)}:${start.slice(2)}`,
    end: `${end.slice(0, 2)}:${end.slice(2)}`,
    room: schedule.room,
    conflicts: {}
  }
}
