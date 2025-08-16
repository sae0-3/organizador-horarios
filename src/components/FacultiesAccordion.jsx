import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchJson } from '../services/dataService'
import { AccordionItem } from './AccordionItem'
import { CareersAccordion } from './CareersAccordion'

export const FacultiesAccordion = () => {
  const { data: faculties, isLoading, error } = useQuery({
    queryKey: ['faculties'],
    queryFn: () => fetchJson(`${import.meta.env.BASE_URL}/data/index.json`),
  })

  const [openFaculty, setOpenFaculty] = useState(null)

  if (isLoading) return <div className='p-4 text-sm text-gray-500'>Cargando facultades...</div>
  if (error) return <div className='p-4 text-sm text-red-500'>Error cargando facultades</div>

  return (
    <div className='w-full'>
      {faculties.map((faculty, idx) => (
        <AccordionItem
          key={faculty.code}
          title={faculty.faculty}
          isOpen={openFaculty === idx}
          onClick={() => setOpenFaculty(openFaculty === idx ? null : idx)}
          level={0}
          withBorder={false}
        >
          <CareersAccordion careers={faculty.careers} />
        </AccordionItem>
      ))}
    </div>
  )
}
