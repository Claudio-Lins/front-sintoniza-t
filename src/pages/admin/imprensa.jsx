import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { TableImprensa } from '../../components/imprensa/TableImprensa'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllImprensa } from '../api/sintonizat-api/imprensa/getAllImprensa'
import { IconTrash } from '../../components/icons'

export default function Imprensa({ imprensa }) {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
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
                <td className="p-4 text-center">{
                  new Intl.DateTimeFormat('pt-BR').format(imprensa.date)
                }</td>
                <td className="p-4 text-center">
                  <button onClick={() => deleteImprensa(imprensa.id)}>
                    {IconTrash}
                  </button>
                  <button onClick={() => deleteImprensa(imprensa.id)}>
                    {IconTrash}
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
