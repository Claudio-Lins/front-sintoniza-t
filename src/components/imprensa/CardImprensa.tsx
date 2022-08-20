import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'
import { useWindowSize } from '../../../hooks/useWindowSize'
import toast, { Toaster } from 'react-hot-toast'
import { useToast } from '../../../hooks/useToast'
import { ModalContent } from '../assets/ModalContent'
import { Botao } from '../assets/Botao'
import { Entradas } from '../assets/Entradas'
import { VscFilePdf } from 'react-icons/vsc'
import { ImLink } from 'react-icons/im'



export function CardImprensa({imprensa}) {
  const { windowWidth, windowHeight } = useWindowSize()
  let today = new Date().toISOString().slice(0, 10)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [toggleField, setToggleField] = useState(true)
  const [isLink, setIsLink] = useState(true)
  const [isPdf, setIsPdf] = useState(false)
  const [dataForm, setDataForm] = useState({
    id: '',
    title: '',
    linkYoutube: '',
    datePublished: today,
    fileUrl: '',
  })
  // @ts-ignore
  const { toastSucess, toastFail } = useToast()
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }


  function resetForm() {
    setDataForm({
      id: '',
      title: '',
      linkYoutube: '',
      datePublished: today,
      fileUrl: '',
    })
  }

  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })

  async function create(data) {
    try {
      await fetch(`/api/sintonizat-api/imprensa/`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        console.log('Create')
        resetForm()
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function update(id: any) {
    console.log('update: ', id)
    try {
      await fetch(`/api/sintonizat-api/imprensa/${id}`, {
        body: JSON.stringify(dataForm),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then(() => {
        console.log('update')
        resetForm()
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (data: { id: string; title: string; linkYoutube: string; datePublished: string; fileUrl: string }) => {
    try {
      toast
        .promise(
          create(data),
          {
            loading: 'Trabalhando nisso....',
            success: 'Imprensa criado com secesso!',
            error: 'Ooops! Algo deu errado.',
          },
          {
            duration: 3000,
          }
        )
        .then(() => {
          refreshData()
          resetForm()
        })
    } catch (error) {
      toast.error(error)
    }
  }
  
  const handleUpdateSubmit = async (id) => {
    console.log('handleUpdateSubmit: ', id)
    try {
      toast
        .promise(
          update(id),
          {
            loading: 'Trabalhando nisso....',
            success: 'Imprensa alterada com secesso!',
            error: 'Ooops! Algo deu errado.',
          },
          {
            duration: 3000,
          }
        )
        .then(() => {
          refreshData()
          resetForm()
        })
    } catch (error) {
      toast.error(error)
    }
  }

  const toggleLinkOrPdf = () => {
    setToggleField(!toggleField)
    setIsLink(!isLink)
    setIsPdf(!isPdf)
  }

  async function handleDelete(id) {
    try {
      await fetch(`/api/sintonizat-api/imprensa/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        toastSucess('Imprensa deletado com sucesso!')
        refreshData()
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
     <Toaster />
    {imprensa?.map((imprensa, i) => {
        return (
          <div className="mb-2 flex flex-col sm:px-4" key={i}>
            <div
              className={`
          flex justify-between divide-x-2 rounded-md border p-2 sm:p-4 shadow-sm sm:max-w-full
          ${
            i % 2 === 0
              ? 'bg-teal-300 text-green-900'
              : 'bg-teal-100 text-green-900'
          }
        `}
            >
              <div className="flex flex-col">
                <div className="text-[8px] font-bold text-green-700 sm:text-xs">
                  {new Date(imprensa.datePublished).toLocaleDateString()}
                </div>
                <div className="flex flex-grow items-center justify-center text-xs font-bold sm:text-xl">
                  {imprensa.title}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center pl-2 sm:gap-2">
                <button
                  onClick={() => {
                    setDataForm({
                      id: imprensa.id,
                      title: imprensa.title,
                      linkYoutube: imprensa.linkYoutube,
                      datePublished: new Date(imprensa.datePublished)
                        .toISOString()
                        .slice(0, 10),
                      fileUrl: imprensa.fileUrl,
                    })
                    setIsOpenModal(true)
                    setIsUpdate(true)
                  }}
                  className="rounded-full  shadow-sm hover:text-white"
                >
                  <FaRegEdit size={windowWidth < 768 ? 10 : 20} />
                </button>
                <button className="rounded-full  shadow-sm hover:text-white">
                  {imprensa.linkYoutube ? (
                    <a
                      target={'_blank'}
                      href={`https://${imprensa.linkYoutube}`}
                    >
                      <AiOutlineEye size={windowWidth < 768 ? 15 : 20} />
                    </a>
                  ) : null}
                </button>
                <button
                  onClick={() => handleDelete(imprensa.id)}
                  className="rounded-full  shadow-sm hover:text-white"
                >
                  <BsTrash size={windowWidth < 768 ? 12 : 20} />
                </button>
              </div>
            </div>
            <ModalContent
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
      >
        <div className="max-w-sm p-4 sm:min-w-[650px]">
          <div className="mt-2 rounded-md border p-4 shadow-inner ">
            <h3 className=" px-2 text-lg text-teal-900 sm:text-2xl">
              {isUpdate
                ? 'Editar Imprensa'
                : 'Criar PDFs e/ou links para leitura e download!'}
            </h3>
            <div className="flex w-full flex-col items-center justify-center">
              <form
                className="flex w-full flex-col items-center justify-center"
                onSubmit={(e) => {
                  e.preventDefault()
                  isUpdate
                    ? handleUpdateSubmit(dataForm.id)
                    : handleSubmit(dataForm)
                  refreshData()
                  setIsOpenModal(false)
                  resetForm()
                }}
              >
                <div className="mt-4 w-full space-y-2 p-2">
                  <div className="space-y-2">
                    <Entradas
                      name="title"
                      type="text"
                      onChange={onChangeInput}
                      value={dataForm.title}
                      placeholder="Titulo"
                      className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                    />
                    <div className=" flex">
                      <div
                        className={`
                          mr-4 rounded-lg border border-teal-400 p-2 py-2
                            px-4 shadow-sm shadow-green-500 focus:border-teal-400 focus:outline-none
                            ${
                              isLink
                                ? 'bg-gradient-to-r from-teal-700 to-teal-400'
                                : 'bg-gradient-to-r from-teal-400 to-teal-700'
                            }
                          `}
                      >
                        <div
                          className="flex cursor-pointer items-center justify-center gap-4"
                          onClick={toggleLinkOrPdf}
                        >
                          <VscFilePdf
                            size={20}
                            color={isPdf ? '#107970' : '#FFF'}
                          />
                          <ImLink
                            size={20}
                            color={isLink ? '#107970' : '#FFF'}
                          />
                        </div>
                      </div>
                      {toggleField ? (
                        <Entradas
                          name="linkYoutube"
                          type="text"
                          onChange={onChangeInput}
                          value={dataForm.linkYoutube}
                          placeholder="Link Youtube"
                          className="w-[150px] rounded-lg border border-teal-400
                            bg-gray-100 p-2 focus:border-teal-400 focus:outline-none sm:w-auto"
                        />
                      ) : (
                        <Entradas
                          className="w-[150px] rounded-lg border border-teal-400 bg-gray-100 p-2
                          focus:border-teal-400 focus:outline-none sm:w-auto "
                          name="file"
                          type="file"
                          placeholder='PDF'
                          // onChange={(e) => setUpload(e.target.files[0])}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Entradas
                      name="datePublished"
                      type="date"
                      onChange={onChangeInput}
                      value={dataForm.datePublished}
                      className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 text-gray-900 focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="my-8 flex gap-4">
                  <Botao type="submit">
                    {isUpdate ? 'Atualizar' : 'Salvar'}
                  </Botao>
                  <Botao onClick={() => setIsOpenModal(false)}>Cancelar</Botao>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ModalContent>
          </div>
        )
      })}</>
  )
}
