import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { IconTrash } from '../../components/icons'
import { getAllNewsletters } from '../api/sintonizat-api/newsletter/getAllNewsletters'
import { HeaderContent } from '../../components/template/HeaderContent'

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
    <div className="flex flex-col px-4">
      <HeaderContent
        title={'Newsletter'}
        subtitle="Contactos dos inscritos para receber a newsletter"
      />
      <table className="w-full overflow-hidden rounded-xl">
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
      </table>
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
