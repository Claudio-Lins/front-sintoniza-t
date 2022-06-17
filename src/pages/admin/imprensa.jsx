import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from 'react-modal'
import { Botao } from '../../components/assets/Botao'
import { IconEdit, IconPDF, IconTrash, IconView } from '../../components/icons'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllImprensa } from '../api/sintonizat-api/imprensa/getAllImprensa'
import { Entradas } from '../../components/assets/Entradas'
import { ImLink } from 'react-icons/im'
import { VscFilePdf } from 'react-icons/vsc'
import toast, { Toaster } from 'react-hot-toast'
import { useToast } from '../../../hooks/useToast'

export default function Imprensa({ imprensa }) {
  const {toastSucess, toastFail} = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isLink, setIsLink] = useState(true)
  const [isPdf, setIsPdf] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [toggleField, setToggleField] = useState(true)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const [dataForm, setDataForm] = useState({
    title: '',
    linkYoutube: '',
    datePublished: new Date().toISOString(),
    fileUrl: '',
  })

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
        setDataForm({
          title: '',
          linkYoutube: '',
          datePublished: '',
          fileUrl: '',
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (data) => {
    try {
      toast.promise(
        create(data),
        {
          loading: 'Trabalhando nisso....',
          success: 'Imprensa criado com secesso!',
          error: 'Ooops! Algo deu errado.',
        },
        {
          duration: 3000,
        },
      ).then(() => {
        refreshData()
        handleCloseModal()
      }
      )
    } catch (error) {
      toast.error(error)
    }
  }

  const toggleLinkOrPdf = () => {
    setToggleField(!toggleField)
    setIsLink(!isLink)
    setIsPdf(!isPdf)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }


  const handleUpdate = async () => {
    // const id = imprensa.id
    const data = await fetch(`/api/sintonizat-api/imprensa/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      }).then(() => {
        alert(id)
        refreshData()
      }
    )
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
      }
    )
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="flex flex-col px-4">
      <HeaderContent
        title={'Imprensa'}
        subtitle="Materias relacionadas com a Sitoniza-t"
      />
      <Toaster />
      <div className="my-4 mr-4 flex justify-end">
        <Botao onClick={handleOpenModal}>Nova Imprensa</Botao>
      </div>
      <table className="w-full overflow-hidden rounded-t-xl shadow-md">
        <thead className="bg-gradient-to-r from-teal-700 to-teal-500 text-sm font-bold tracking-wider text-white">
          <tr className=" text-xl">
            <th className="p-4 text-left">Titúlo</th>
            <th className="p-4 text-center">Data publicação</th>
            <th className="p-4 pr-9 text-right">Ações</th>
          </tr>
        </thead>
      </table>
      <div className="max-h-[550px] w-full overflow-auto rounded-b-xl">
        <table className="w-full overflow-hidden rounded-b-xl">
          <tbody className="bg-white">
            {imprensa?.map((imprensa, i) => {
              return (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0
                      ? 'bg-teal-200 text-green-900'
                      : 'bg-teal-100 text-green-900'
                  }`}
                >
                  <td className="p-4 text-left">{imprensa.title}</td>
                  <td className="p-4 text-center">
                    {new Date(imprensa.datePublished).toLocaleDateString()}
                  </td>
                  <td className="mr-4 flex items-center justify-end gap-2 p-4">
                    <button
                      onClick={() => {
                        setDataForm(imprensa)
                        setIsOpen(true)
                        setIsUpdate(true)
                      }}
                    >
                      {IconEdit}
                    </button>
                    <button onClick={''}>{IconView}</button>
                    <button onClick={() => handleDelete(imprensa.id)}>
                      {IconTrash}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
      >
        <div className="relative flex">
          <Botao
            onClick={handleCloseModal}
            className="absolute -top-2 -right-2"
          >
            X
          </Botao>
          <div className="mx-auto my-10 w-full rounded-lg bg-green-50 p-2 shadow-lg">
            <div className="my-4 flex flex-col items-center justify-center">
              <p className="text-xl font-semibold tracking-wide text-teal-900">
                Disponibilizar PDFs para leitura e download!
              </p>
              <hr className="border-1 mt-2 w-full border-green-300" />
              <div className="flex w-full flex-col items-center justify-center">
                <form
                  className="flex w-full flex-col items-center justify-center"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(dataForm)
                    refreshData()
                    handleCloseModal
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
                        <div className="mr-4  rounded-xl border py-2 px-4">
                          <div
                            className="flex items-center justify-center gap-4"
                            onClick={toggleLinkOrPdf}
                          >
                            <VscFilePdf
                              size={20}
                              color={isPdf ? '#107970' : '#c1c1c1'}
                            />
                            <ImLink
                              size={20}
                              color={isLink ? '#107970' : '#c1c1c1'}
                            />
                          </div>
                        </div>
                        {toggleField ? (
                          <input
                            name="linkYoutube"
                            type="text"
                            onChange={onChangeInput}
                            value={dataForm.linkYoutube}
                            placeholder="Link Youtube"
                            className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                          />
                        ) : (
                          <input
                            className="w-full rounded-lg border border-teal-400 bg-gray-100
                          p-2 focus:border-teal-400 focus:outline-none"
                            name="file"
                            type="file"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <input
                        name="datePublished"
                        type="date"
                        onChange={onChangeInput}
                        value={dataForm.datePublished}
                        className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-evenly">
                    {!isUpdate ? (
                      <>
                        <Botao type="submit">Enviar</Botao>
                        <Botao>Cancelar</Botao>
                      </>
                    ) : null}
                  </div>
                  <div className="mt-8 flex items-center justify-evenly">
                    {isUpdate ? (
                      <>
                        <Botao onClick={handleUpdate} >Salvar</Botao>
                        <Botao>Cancelar</Botao>
                      </>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const imprensa = await getAllImprensa()

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
      imprensa: JSON.parse(JSON.stringify(imprensa)),
    },
  }
}
