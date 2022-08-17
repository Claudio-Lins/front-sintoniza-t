import React, { useRouter } from 'react'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Admin() {
  const { data: session } = useSession()
  

  return (
    <div className="flex min-h-screen items-center justify-center">
      {session ? (
        <div>
          <h1>You are signed in as {session.user.email}</h1>
          <pre>
            {JSON.stringify(session.user, null, 2)}
          </pre>
          <button
            onClick={() => signOut()}
            className="bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <h1>You are not signed in</h1>
          <button
            onClick={() => signIn()}
            className="bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  )
}
