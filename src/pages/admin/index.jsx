import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { stringify } from 'querystring'

export default function Admin() {
  const { data: session } = useSession()
  const { push, asPath } = useRouter()

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/admin' })
    push(data.url)
  }

  const handleSignIn = async () => push(`/admin/signin?callbackUrl=${asPath}`)

  return (
    <div className=" flex min-h-screen w-full flex-col items-center justify-center bg-green-100">
      {session ? (
        <>
        <div className="mb-4">You are signed in as {session?.user.email}</div>
        <Image 
          src={session?.user.image}
          width={100}
          height={100}
          alt={session?.user.name}
          className="rounded-full"
        />
        <p>Expira: {new Intl.DateTimeFormat('pt-PT', { dateStyle: 'full', timeStyle: 'short' }).format(session?.user.expires) }</p>
        </>
      ) : (
        <div className="mb-4">You are not signed in</div>
      )}
      {session ? (
        <button
          onClick={handleSignOut}
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Sing Out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Sing In
        </button>
      )}
    </div>
  )
}
