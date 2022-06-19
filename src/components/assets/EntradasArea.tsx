interface EntradasProps {
  placeholder?: string
  name?: string
  value?: any
  target?: string
  readonly?: boolean
  onChange?: (value: any) => void
  className?: string
  rows?: number
}

export default function Entradas(props: EntradasProps) {
  return (
    <div className='flex flex-col w-full'>
      <textarea
        rows={props.rows}
        name={props.name}
        value={props.value}
        readOnly={props.readonly}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`
        border border-purple-700 bg-gray-100 rounded-lg
        focus:border-teal-400 focus:outline-none 
        ${props.readonly ? '' : 'focus:bg-teal-50'}
        ${props.className}
      `}
      />
    </div>
  )
}
