import React from 'react'

interface SectionProps {
  sectionColor: boolean
  id?: string
  children: React.ReactNode
}

const sectionColor = false

export function Section({ sectionColor, children, id }: SectionProps) {
  return (
    <div
      id={id}
      className={`flex min-h-[50vh] flex-col items-center px-4 pt-10 pb-20 shadow-xl
      ${sectionColor ? 'bg-gradient-to-b from-green-200 to-green-50 shadow-xl shadow-green-50' : 'bg-white'}
  `}
    >
      <div className="flex w-full max-w-7xl 2xl:max-w-[1480px] flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
