import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { IconTrash } from '../../components/icons'
import { getAllNewsletters } from '../api/sintonizat-api/newsletter/getAllNewsletters'

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
      <div className="mt-8 rounded bg-white p-4 shadow 2xl:p-8">
        <div className="p-4">
          <h2 className="rounded-t-xl bg-gradient-to-r from-purple-800 to-green-800 p-2 text-center text-2xl font-semibold text-white">
            Subscribers - Newsletter
          </h2>
          <table className="mt-2 w-full">
            <thead>
              <tr className="w-full rounded bg-green-300 text-green-900">
                <th className="p-4 text-left text-xs sm:text-lg">Nome</th>
                <th className="p-4 text-left text-xs sm:text-lg">Email</th>
                <th className="p-4 text-center text-xs sm:text-lg">Delete</th>
                <th className="p-4 text-center text-xs sm:text-lg">Data</th>
              </tr>
            </thead>
            <tbody>
              {newsletter.map((newsletter, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? 'bg-white' : 'bg-green-100'} `}
                >
                  <td className="p-4 text-left text-xs font-semibold sm:text-base">
                    {newsletter.name}
                  </td>
                  <td className="p-4 text-left text-xs sm:text-base">
                    {newsletter.email}
                  </td>
                  <td className="flex justify-center p-4 text-xs sm:text-base">
                    <button onClick={() => deleteNewsletter(newsletter.id)}>{IconTrash}</button>
                  </td>
                  <td className="p-4 text-center text-xs sm:text-base">
                    {new Intl.DateTimeFormat('pt-PT').format(
                      new Date(newsletter.createdAt)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
