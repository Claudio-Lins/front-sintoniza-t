import { useState } from 'react'
import configAxios from '../../data/configAxios'
import { toastSucess, toastFail } from '../../utils/toast/index'

export default function ImprensaPost(props) {
  const [upload, setUpload] = useState('')
  const [dataForm, setDataForm] = useState({
    title: '',
    linkYoutube: '',
    datePublished: '',
    fileUrl: '',
  })

  const resetForm = () => {
    setDataForm({
      title: '',
      linkYoutube: '',
      datePublished: '',
      fileUrl: '',
    })
  }
  const refreshPage = () => {
    window.location.reload()
  }

  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })

  const sendForm = async (e) => {
    e.preventDefault()

    const uploadFile = new FormData()
    uploadFile.append('pressPost', upload)
    uploadFile.append('title', dataForm.title)
    uploadFile.append('linkYoutube', dataForm.linkYoutube)
    uploadFile.append('datePublished', dataForm.datePublished)

    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await configAxios
      .post('/imprensa', uploadFile, headers)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
        } else {
          toastFail()
        }
      })
    resetForm()
    refreshPage()
  }

  return (
    <div className='w-full p-2 rounded-lg shadow-lg bg-green-700 mx-auto my-4'>
      <div className='flex flex-col justify-center items-center my-4'>
        <p className='text-white text-xl font-semibold tracking-wide'>
          Disponibilizar PDFs para leitura e download!
        </p>
        <hr className='border-1 border-green-300 w-full mt-2' />
        <div className='flex justify-center items-center w-full'>
          <form
            onSubmit={sendForm}
            encType='multipart/form-data'
            className='w-full px-20 2xl:w-1/2'
          >
            <div className=' w-full mt-4'>
              <input
                type='text'
                name='title'
                onChange={onChangeInput}
                value={dataForm.title}
                placeholder='Título'
                className='px-2 rounded-md h-8 text-center text-purple-800 outline-none shadow w-full mb-4'
              />
              <input
                type='text'
                name='linkYoutube'
                onChange={onChangeInput}
                value={dataForm.linkYoutube}
                placeholder='Link Youtube'
                className='px-2 rounded-md h-8 text-center text-purple-800 outline-none shadow w-full mb-4'
              />
              <div className='flex space-x-4'>
                <div className='w-1/2 flex flex-col'>
                  <spa className='text-white'>Data de Piblicação</spa>
                  <input
                    type='date'
                    name='datePublished'
                    onChange={onChangeInput}
                    value={dataForm.datePublished}
                    placeholder='Data de Piblicação'
                    className='px-2 rounded-md h-8 text-center text-purple-800 outline-none shadow w-full mb-4'
                  />
                </div>
                <div className='w-1/2 flex flex-col'>
                  <spa className='text-white'>Arquivo</spa>
                  <input
                    type='file'
                    accept='*'
                    name='fileUpload'
                    onChange={(e) => setUpload(e.target.files[0])}
                    className={
                      'text-white mb-2  border rounded-md outline-none shadow w-full'
                    }
                  />
                </div>
              </div>
            </div>
            <div className='mt-6 flex justify-center space-x-4'>
              <button
                type='submit'
                className='bg-purple-600 text-white px-12 py-1 rounded-lg shadow shadow-purple-600/50'
              >
                Enviar
              </button>
              <button
                type='button'
                onClick={props.cancel}
                className='bg-purple-600 text-white px-12 py-1 rounded-lg shadow shadow-purple-600/50'
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
