import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineEye } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'
import { useWindowSize } from '../../../hooks/useWindowSize'
import toast, { Toaster } from 'react-hot-toast'
import { useToast } from '../../../hooks/useToast'



export function CardImprensa({imprensa}) {
  const { windowWidth, windowHeight } = useWindowSize()
  let today = new Date().toISOString().slice(0, 10)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
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
          </div>
        )
      })}</>
  )
}
