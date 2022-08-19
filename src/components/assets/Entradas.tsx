interface EntradasProps {
  type?: 'text' | 'date' | 'file' | 'time' | 'datetime' | 'number' | 'email' | 'password' | 'phone'
  placeholder?: string
  name?: string
  value?: any
  target?: string
  readonly?: boolean
  onChange?: (value: any) => void
  className?: string
}

export function Entradas(props: EntradasProps) {
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
        border bg-gray-100 rounded-lg border-teal-400
        focus:border-teal-400 focus:outline-none 
        ${props.type === 'file' ? 'py-[5px] appearance-none text-gray-400' : ''}
        ${props.readonly ? '' : 'focus:bg-teal-50'}
        ${props.className}
      `}
      />
    </div>
  )
}
