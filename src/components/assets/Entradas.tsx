interface EntradasProps {
  type?: 'text' | 'date' | 'file' | 'time' | 'datetime' | 'number' 
  placeholder?: string
  name?: string
  value?: any
  target?: string
  readonly?: boolean
  onChange?: (value: any) => void
  className?: string
}

export default function Entradas(props: EntradasProps) {
  return (
    <div className='flex flex-col w-full'>
      <input
        type={props.type ?? 'text'}
        name={props.name}
        value={props.value}
        readOnly={props.readonly}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`
        border border-purple-700 bg-gray-100 rounded-lg dark:border-teal-400
        focus:border-teal-400 focus:outline-none 
        ${props.type === 'file' ? 'py-[6px] appearance-none' : ''}
        ${props.readonly ? '' : 'focus:bg-teal-50'}
        ${props.className}
      `}
      />
    </div>
  )
}
