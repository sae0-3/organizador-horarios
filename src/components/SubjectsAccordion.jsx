import { useState } from 'react'
import { AccordionItem } from './AccordionItem'
import { GroupsList } from './GroupList'

export const SubjectsAccordion = ({ subjects }) => {
  const [openSubject, setOpenSubject] = useState(null)

  return (
    <div>
      {subjects.map((subject, idx) => (
        <AccordionItem
          key={subject.code}
          title={`${subject.name} (${subject.code})`}
          isOpen={openSubject === idx}
          onClick={() => setOpenSubject(openSubject === idx ? null : idx)}
          level={3}
        >
          <GroupsList
            groups={subject.groups}
            subjectCode={subject.code}
            subjectName={subject.name}
          />
        </AccordionItem>
      ))}
    </div>
  )
}
