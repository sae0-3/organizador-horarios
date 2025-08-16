import { create } from 'zustand'
import { removeConflicts } from '../utils/manageConflicts'
import { normalizeSchedule } from '../utils/normilizeSchedule'

export const useStore = create((set) => ({
  selectedGroups: {},
  totalConflicts: 0,
  totalMinutes: 0,

  toggleSelectGroup: (groupId, groupData) => set((state) => {
    if (state.selectedGroups[groupId]) {
      const { [groupId]: _, ...rest } = state.selectedGroups

      let conflictsEliminated = 0
      state.selectedGroups[groupId].schedule.forEach(item => {
        if (Object.keys(item.conflicts)) {
          conflictsEliminated += Object.keys(item.conflicts).length
        }
      })

      return {
        selectedGroups: removeConflicts(groupId, rest),
        totalMinutes: state.totalMinutes - state.selectedGroups[groupId].total_minutes,
        totalConflicts: state.totalConflicts - conflictsEliminated,
      }
    }

    const [newGroup, newConflicts] = normalizeSchedule(
      groupId,
      groupData,
      state.selectedGroups,
    )

    return {
      selectedGroups: {
        ...state.selectedGroups,
        [groupId]: newGroup,
      },
      totalMinutes: state.totalMinutes + groupData.total_minutes,
      totalConflicts: state.totalConflicts + newConflicts,
    }
  }),
}))
