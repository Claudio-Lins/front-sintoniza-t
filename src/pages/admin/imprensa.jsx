import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from 'react-modal'
import { Botao } from '../../components/assets/Botao'
import { IconEdit, IconTrash, IconView } from '../../components/icons'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllImprensa } from '../api/sintonizat-api/imprensa/getAllImprensa'
import { Entradas } from '../../components/assets/Entradas'

export default function Imprensa({ imprensa }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  async function deleteImprensa(id) {
    try {
      fetch(`/api/sintonizat-api/imprensa/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData()
      })
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
      <div className="my-4 mr-4 flex justify-end">
        <Botao onClick={handleOpenModal}>Nova Imprensa</Botao>
      </div>
      <table className="w-full overflow-hidden rounded-xl">
        <thead className="bg-gradient-to-r from-teal-700 to-teal-500 text-sm font-bold tracking-wider text-white">
          <tr className=" text-xl">
            <th className="p-4 text-left">Titúlo</th>
            <th className="p-4 text-center">Data publicação</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>
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
                  {new Intl.DateTimeFormat('pt-BR').format(imprensa.date)}
                </td>
                <td className="flex items-center justify-center gap-2 p-4 text-center">
                  <button onClick={() => deleteImprensa(imprensa.id)}>
                    {IconEdit}
                  </button>
                  <button onClick={() => deleteImprensa(imprensa.id)}>
                    {IconView}
                  </button>
                  <button onClick={() => deleteImprensa(imprensa.id)}>
                    {IconTrash}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(20, 53, 45, 0.9)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto%',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fff',
          },
        }}
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
              <div className="flex w-full items-center justify-center">
                <form
                  onSubmit={''}
                  encType="multipart/form-data"
                  
                >
                  <div className="mt-4 w-full p-2 space-y-2">
                  <div className="space-y-2">
                  <Entradas
                    name="title"
                    type="text"
                    placeholder="Titulo"
                    className="w-full p-2 text-purple-800"
                  />
                  <Entradas
                    name="linkYoutube"
                    type="text"
                    placeholder="Link Youtube"
                    className="w-full p-2 text-purple-800"
                  />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Entradas
                      name="linkYoutube"
                      type="date"
                      placeholder="Link Youtube"
                      className="w-full p-2 text-purple-800"
                    />
                    <Entradas
                      name="linkYoutube"
                      type="file"
                      placeholder="Link Youtube"
                      className="w-full p-2 text-purple-800"
                    />
                  </div>
                  </div>
                  <div className="mt-8 flex items-center justify-evenly">
                    <Botao>Enviar</Botao>
                    <Botao>Cancelar</Botao>
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
