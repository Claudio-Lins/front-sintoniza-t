import { useState } from 'react'
import Entradas from '../assets/Entradas'
import configAxios from '../../data/configAxios'
import { toastSucess, toastFail } from '../../utils/toast/index'
import Botao from '../assets/Botao'

interface FormularioProps {
  selectImprensa?: any
  id?: number
  title: string
  linkYoutube: string
  datePublished: string
  imprensa: any
  changeValue?: any
  onChangeInput?: any
  // changeValue?: (imprensa: any) => void
  savePressPost?: (imprensa: any) => void
  cancel?: () => void
}

export default function FormularioImprensa(props: FormularioProps) {

  const id = props.imprensa?.id
  const [dataImprensa, setDataImprensa] = useState({
    title: props.title,
    linkYoutube: props.linkYoutube,
    datePublished: props.datePublished,
  })

  function refreshPage() {
    window.location.reload()
  }

  const onChangeInput = (e) =>
  setDataImprensa({ ...dataImprensa, [e.target.name]: e.target.value })

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        `${process.env.API_SINTONIZA_T}/imprensa/${props.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(dataImprensa),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      console.log(res)
      refreshPage()
    } catch (error) {
      console.log('Error: Tente mais tarde!!!')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Entradas
        type='text'
        placeholder='Titulo'
        value={dataImprensa.title}
        onChange={onChangeInput}
      />
      <Entradas
        type='text'
        placeholder='Link do Youtube'
        value={dataImprensa.linkYoutube}
        onChange={onChangeInput}
      />
      <Entradas
        type='date'
        placeholder='Data de publicação'
        value={dataImprensa.datePublished}
        onChange={onChangeInput}
      />
      <div className='flex justify-end mt-4 space-x-2'>
        <Botao
          className='bg-gradient-to-r from-blue-400 to-blue-700'
          onClick={handleUpdate}
        >
          {id ? 'Atualizar' : 'Salvar'}
        </Botao>
        <Botao
          onClick={props.cancel}
          className='bg-gradient-to-r from-gray-400 to-gray-700'
        >
          Cancelar
        </Botao>
      </div>
    </div>
  )
}
