import { useStore } from '../store/useStore'

export const GroupsList = ({ groups, subjectCode, subjectName }) => {
  const { selectedGroups, toggleSelectGroup } = useStore()

  return (
    <div className='pl-3 pr-2 py-2 space-y-2'>
      {groups.map((group) => (
        <label
          key={group.code}
          className='flex items-start gap-3 px-2 py-1 md:py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer'
        >
          <input
            type='checkbox'
            className='mt-1 h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500'
            onChange={() => toggleSelectGroup(
              `${subjectCode}-${group.code}`,
              { subjectName: subjectName, ...group }
            )}
            checked={Object.keys(selectedGroups).includes(`${subjectCode}-${group.code}`)}
          />

          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-800 flex gap-2'>
              <span>G:{group.code}</span>
              <span>{group.teacher} {group.is_lab && '(LAB)'}</span>
            </p>

            {group.assistants.map((assistant) => (
              <div className='text-xs text-gray-500 mt-1' key={`${assistant.name}-${group.code}-${group.name}`}>
                <span className='font-medium'>Aux.</span> {assistant.name}
              </div>
            ))}
          </div>
        </label>
      ))}
    </div>
  )
}
