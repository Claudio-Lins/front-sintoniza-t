import { getSession, signIn, signOut, useSession } from 'next-auth/react'

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

export default function Admin() {
  const { data: session } = useSession()
  if (session) {
    console.log(session.user)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {session ? (
        <div className="flex flex-col gap-2 rounded-lg border p-8 shadow">
          <h2>You are signed in as {session.user.name}</h2>
          <div>
            <strong>Email:</strong> {session.user.email}
          </div>
          <div>
            <strong>Criado:</strong> {session.user.createdAt}
          </div>
          <div>
            <strong>Active:</strong> {String(session.user.active)}
          </div>
          <div>
            <strong>Cargo: </strong>
            {session.user.role}
          </div>
          {/* <pre>
            {JSON.stringify(session.user, null, 2)}
          </pre> */}
          <button
            onClick={() => signOut()}
            className="mt-4 rounded-lg bg-blue-500 py-2 px-4 font-bold text-white shadow hover:shadow-none shadow-blue-500 hover:bg-blue-700"
          >
            Sair
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
