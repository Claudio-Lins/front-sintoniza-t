import { useState, useEffect } from 'react'
import Image from 'next/image'
import AuthInput from '../../components/assets/auth/AuthInput'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setLoginError(''), 9000)
  }, [errorText])

  function errorText() {
    setLoginError('Dados incorretos')
  }

  async function handleSubmit() {
    if(!email || !password) {
      setLoginError('Please enter your email address')
      return
    }
    setLoginError('')
    setLoading(true)
    const request = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    setLoading(false)
    if (request && request.ok) {
      if (router.query.callbackUrl) {
        router.push(router.query.callbackUrl as string)
      } else {
        router.push('/admin')
      }
    } else {
      errorText()
    }
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-white">
      <div className="relative h-[calc(100vh-100px)] w-full">
        <Image
          src="/auth/masjid-pogung-dalangan-D5cTOQPZNG8-unsplash.jpeg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="contrast-125 filter"
        />
      </div>
      <div className="absolute w-full border bg-white bg-opacity-20 p-8 backdrop-blur-sm md:w-1/2 lg:w-1/3">
        <div className=" w-full rounded-lg border bg-white bg-opacity-80 p-10 shadow-md">
          <h1
            className={`
            mb-5 text-center text-xl font-bold
        `}
          >
            Entre com seu emil e senha
          </h1>

          <hr className="mb-6 w-full" />

          <AuthInput
            label="Email"
            type="email"
            value={email}
            changeValue={setEmail}
            required
            disabled={loading}
            />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            changeValue={setPassword}
            required
            disabled={loading}
          />

          <button
            className={`
        mt-6 w-full rounded-lg
        bg-purple-500 py-2 px-4 text-white hover:bg-purple-400
      `}
            onClick={handleSubmit}
          >
            Entrar
          </button>

          <hr className="my-6 w-full border-slate-400" />
          {loginError && (
            <span className="font-semibold text-red-500 animate-pulse">{loginError}</span>
          )}
          {loading && (
            <span className="font-semibold text-red-500">Carregando...</span>
          )}
        </div>
      </div>
    </div>
  )
}
