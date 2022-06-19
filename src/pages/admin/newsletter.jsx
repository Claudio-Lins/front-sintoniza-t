import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { IconTrash } from '../../components/icons'
import { getAllNewsletters } from '../api/sintonizat-api/newsletter/getAllNewsletters'
import { HeaderContent } from '../../components/template/HeaderContent'
import toast, { Toaster } from 'react-hot-toast'

export default function Newsletter({ newsletter }) {
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function deleteNewsletter(id) {
    try {
      fetch(`/api/sintonizat-api/newsletter/${id}`, {
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
    <div className="flex flex-col">
      <HeaderContent
        title={'Imprensa'}
        subtitle="Materias relacionadas com a Sitoniza-t"
      />
      <Toaster />
      <div className="flex w-full flex-wrap justify-center gap-2 sm:px-4">
        {newsletter?.map((newsletter, i) => {
          return (
            <div
              key={newsletter.id}
              className="relative mb-2 w-full max-w-md rounded-lg border bg-teal-100 p-2 shadow-md sm:p-4"
            >
              <button
                onClick={() => deleteNewsletter(newsletter.id)}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 p-1 font-bold shadow-sm hover:bg-teal-800 hover:text-white hover:shadow-inner"
              >
                x
              </button>
              <div className="flex flex-col">
                <div className="text-[10px] sm:text-sm">Nome</div>
                <div className="font-bold sm:text-xl">{newsletter.name}</div>
                <div className="text-[10px] sm:text-sm">Email</div>
                <div className="font-bold">{newsletter.email}</div>
              </div>
            </div>
          )
        })}
      </div>
      {/* <table className="overflow-hidden rounded-xl">
        <thead className="bg-gradient-to-r from-teal-700 to-teal-500 text-sm font-bold tracking-wider text-white">
          <tr className=" text-xl">
            <th className="p-4 text-left">Nome</th>
            <th className="p-4 text-center">Email</th>
            <th className="p-4 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {newsletter?.map((newsletter, i) => {
            return (
              <tr
                key={newsletter.id}
                className={`${
                  i % 2 === 0
                    ? 'bg-teal-200 text-green-900'
                    : 'bg-teal-100 text-green-900'
                }`}
              >
                <td className="p-4 text-left">{newsletter.name}</td>
                <td className="p-4 text-center">{newsletter.email}</td>
                <td className="p-4 text-center">
                  <button onClick={() => deleteNewsletter(newsletter.id)}>
                    {IconTrash}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const newsletter = await getAllNewsletters()

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
      newsletter: JSON.parse(JSON.stringify(newsletter)),
    },
  }
}
