import React from 'react'
import Select from '../assets/Select'

interface SelectProps {
  // dataForm: any
  defaultValue?: string
  value?: string
  name?: string
  target?: string
  onChange?: (value: any) => void
  className?: string
}

export function SelectFlag(props: SelectProps) {
  return (
    <Select
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      className={`
        border border-purple-700 bg-gray-100 bg-clip-padding transition ease-in-out rounded-lg dark:border-teal-400
        focus:border-teal-400 focus:outline-none mb-2
        ${props.className}
      `}
    >
      <option>Nacionalidade</option>
      <option value='UN-United Nation'>Não declarar</option>
      <option value='AF-Afghanistan'>Afghanistan</option>
      <option value='AL-Albania'>Albania</option>
      <option value='DZ-Algeria'>Algeria</option>
      <option value='AD-Andorra'>Andorra</option>
      <option value='AO-Angola'>Angola</option>
      <option value='AR-Argentina'>Argentina</option>
      <option value='AM-Armenia'>Armenia</option>
      <option value='AU-Australia'>Australia</option>
      <option value='PT-Portugal'>Portugal</option>
      <option value='BR-Brasil'>Brasil</option>
      <option value='VE-Venezuela'>Venezuela</option>
      <option value='US-Estados Unidos'>Estados Unidos</option>
    </Select>
  )
}
