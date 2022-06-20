import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ImLink } from 'react-icons/im'
import { VscFilePdf } from 'react-icons/vsc'
import { useToast } from '../../../hooks/useToast'
import { Botao } from '../../components/assets/Botao'
import { Entradas } from '../../components/assets/Entradas'
import { ModalContent } from '../../components/assets/ModalContent'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllImprensa } from '../api/sintonizat-api/imprensa/getAllImprensa'
// import { AiOutlineEye } from 'react-icons/ai'
// import { FaRegEdit } from 'react-icons/fa'
// import { BsTrash } from 'react-icons/bs'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { CardImprensa } from '../../components/imprensa/CardImprensa'

export default function Imprensa({ imprensa }) {
  const { windowWidth, windowHeight } = useWindowSize()
  let today = new Date().toISOString().slice(0, 10)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLink, setIsLink] = useState(true)
  const [isPdf, setIsPdf] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [toggleField, setToggleField] = useState(true)
  const router = useRouter()
  const [dataForm, setDataForm] = useState({
    id: '',
    title: '',
    linkYoutube: '',
    datePublished: today,
    fileUrl: '',
  })

  const { toastSucess, toastFail } = useToast()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  function resetForm() {
    setDataForm({
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

  async function update(id) {
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

  // async function handleDelete(id) {
  //   try {
  //     await fetch(`/api/sintonizat-api/imprensa/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }).then(() => {
  //       toastSucess('Imprensa deletado com sucesso!')
  //       refreshData()
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleSubmit = async (data) => {
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

  const toggleLinkOrPdf = () => {
    setToggleField(!toggleField)
    setIsLink(!isLink)
    setIsPdf(!isPdf)
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
    setIsUpdate(false)
    resetForm()
  }

  return (
    <div className="flex flex-col">
      <HeaderContent
        title={'Imprensa'}
        subtitle="Materias relacionadas com a Sitoniza-t"
      />
      {/* <Toaster /> */}

      <div className="mb-2 flex w-auto justify-center sm:mr-4 sm:justify-end">
        <Botao onClick={handleOpenModal}>Nova Imprensa</Botao>
      </div>
      <CardImprensa imprensa={imprensa} />

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
                                ? 'bg-gradient-to-r from-green-700 to-green-100'
                                : 'bg-gradient-to-r from-green-100 to-green-700'
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
