import React from 'react'
import { Title } from '../Titles'

interface SectioProps {
  sectioColor: boolean
  id?: string
  children: React.ReactNode
}

const sectioColor = false

export function Section({ sectioColor, children, id }: SectioProps) {
  return (
    <div
      id={id}
      className={`
      max-w-7xl min-h-[100vh] px-4 pt-10 pb-20
      ${sectioColor ? 'bg-green-50' : 'bg-white'}
      `}>
      {children}
    </div>
  )
}
