import { getSession, signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

function Login() {
  const { data: session, status } = useSession()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  console.log(session)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!name) return false

    signIn('credentials')
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
      <div className="xs:p-0 mx-auto p-10 md:w-full md:max-w-md">
        <h1 className="mb-5 text-center text-2xl font-bold">Your Logo</h1>
        <div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
          <form onSubmit={handleSubmit} className="px-5 py-7">
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-sm"
            />
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 mb-5 w-full rounded-lg border px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 hover:shadow-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span className="mr-2 inline-block">Login</span>
            </button>
          </form>
          {/* <div className="p-5">
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                MailUp
              </button>
              <button
                type="button"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => signIn("github")}
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                Github
              </button>
            </div>
          </div> */}
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="whitespace-nowrap text-center sm:text-left">
                <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="inline-block h-4 w-4 align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="ml-1 inline-block">Forgot Password</span>
                </button>
              </div>
              <div className="whitespace-nowrap text-center sm:text-right">
                <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="inline-block h-4 w-4 align-text-bottom	"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="ml-1 inline-block">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="whitespace-nowrap text-center sm:text-left">
              <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block h-4 w-4 align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="ml-1 inline-block">{session?.user.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
