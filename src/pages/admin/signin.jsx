import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs'

const providers = [
  {
    name: 'google',
    Icon: 'BsGoogle',
  },
]

export default function Signin() {
  const [email, setEmail] = useState('')
  const { data: session, status } = useSession()
  const { push, asPath } = useRouter()

  if (status === 'loading') return <div>Loading...</div>
  if (session) {
    setTimeout(() => {
      push('/admin')
    }, 5000)
    return <div>You are signed in as {session.user.email}</div>
  }

  const handleAuthSignup = (provider) => () => signIn(provider)

  const handdleSubmit = (e) => {
    e.preventDefault()
    if(!email) return false
    signIn('email', {email, redirect: false})
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-green-100">
      <form 
        onSubmit={handdleSubmit}
      >
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-400 p-2"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 w-full"
          >
            Login
          </button>
        </div>
      </form>
      {providers.map(({ name, Icon }) => (
        <button
          key={name}
          onClick={handleAuthSignup(name)}
          className="flex items-center justify-center gap-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          <BsGoogle />
          {name}
        </button>
      ))}
    </div>
  )
}
