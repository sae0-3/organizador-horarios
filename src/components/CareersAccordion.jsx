import { useState } from 'react'
import { AccordionItem } from './AccordionItem'
import { LevelsAccordion } from './LevelsAccordion'

export const CareersAccordion = ({ careers }) => {
  const [openCareer, setOpenCareer] = useState(null)

  return (
    <div>
      {careers.map((career, idx) => (
        <AccordionItem
          key={career.file}
          title={`${career.name} (${career.management})`}
          isOpen={openCareer === idx}
          onClick={() => setOpenCareer(openCareer === idx ? null : idx)}
          level={1}
        >
          <LevelsAccordion file={career.file} />
        </AccordionItem>
      ))}
    </div>
  )
}
