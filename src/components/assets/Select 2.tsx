import { ReactNode } from "react"

interface SelectProps {
  children: ReactNode
  value?: any
  name?: string
  target?: string
  onChange?: (value: any) => void
  className?: string
}

export default function Select(props: SelectProps) {
  return (
    <div className='flex flex-col w-full'>
      <select
        onChange={props.onChange}
        name={props.name}
        className={`
        border border-purple-700 bg-gray-100 bg-clip-padding transition ease-in-out rounded-lg dark:border-teal-400
        focus:border-teal-400 focus:outline-none
        ${props.className}
      `}
      >
        {props.children}
      </select>
    </div>
  )
}
