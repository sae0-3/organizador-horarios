import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchJson } from '../services/dataService'
import { AccordionItem } from './AccordionItem'
import { SubjectsAccordion } from './SubjectsAccordion'

export const LevelsAccordion = ({ file }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['career', file],
    queryFn: () => fetchJson(`${import.meta.env.BASE_URL}/data/${file}.json`),
  })

  const [openLevel, setOpenLevel] = useState(null)

  if (isLoading) return <p className='pl-4'>Cargando niveles...</p>
  if (error) return <p className='pl-4'>Error cargando niveles</p>

  return (
    <div>
      {data.levels.map((level, idx) => (
        <AccordionItem
          key={level.code}
          title={`Nivel ${level.code}`}
          isOpen={openLevel === idx}
          onClick={() => setOpenLevel(openLevel === idx ? null : idx)}
          level={2}
        >
          <SubjectsAccordion subjects={level.subjects} />
        </AccordionItem>
      ))}
    </div>
  )
}
