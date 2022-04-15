import React from 'react'

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
      className={`flex min-h-[50vh] flex-col items-center px-4 pt-10 pb-20 shadow-xl
      ${sectioColor ? 'bg-green-50' : 'bg-white'}
  `}
    >
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
