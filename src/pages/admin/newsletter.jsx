import axios from 'axios'
import { getSession } from 'next-auth/react'
import React from 'react'


export default function Newsletter({ newsletter }) {
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
                <th className="p-4 text-right text-xs sm:text-lg">Data</th>
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
                  <td className="p-4 text-right text-xs sm:text-base">
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
  const newsletter = await axios.get(
    `${process.env.API_URL_SINTONIZA_T}/newsletter`
  )

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
      newsletter: newsletter.data,
    },
  }
}
