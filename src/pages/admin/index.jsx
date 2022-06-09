import React, { useRouter } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Admin() {
  const { data: session } = useSession()
  
  console.log(session)

  return (
    <div className="flex min-h-screen items-center justify-center">
      {session ? (
        <div>
          <h1>You are signed in as {session.user.email}</h1>
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
