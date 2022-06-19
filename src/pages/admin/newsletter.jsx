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
        title={'Newsletter'}
        subtitle="Materias relacionadas com a Sitoniza-t"
      />
      <Toaster />
      <div className="flex w-full flex-wrap justify-center gap-2 px-2">
        {newsletter?.map((newsletter, i) => {
          return (
            <div
              key={newsletter.id}
              className="relative mb-2 w-full max-w-md rounded-lg border bg-teal-300 p-4 shadow-md sm:p-4"
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
