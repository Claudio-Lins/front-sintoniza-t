import React, { useRouter } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import useRequireAuth from '../../../lib/useRequireAuth'

export async function getServerSideProps(context) {
  const session = await getSession(context)

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
    },
  }
}

export default function Newsletter() {
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1>You are in Newsletter as {session.user.email}</h1>
      </div>
    </div>
  )
}
