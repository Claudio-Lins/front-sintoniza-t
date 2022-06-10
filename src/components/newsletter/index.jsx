import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../../utils/Motion/variants'

export function Newsletter() {
  const [dataForm, setDataForm] = useState({
    id: '',
    name: '',
    email: '',
  })

  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })

  async function create(data) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/sintonizat-api/newsletter/create`,
        {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
        ).then(() => setDataForm({ email: '', name: '' }))
      } catch (error) {
        console.error(error)
      }
    }
    
    const handleSubmit = async(data) => {
      try {
        create(data) 
    } catch (error) {
      console.error(error)
    }
      
    }

  return (
    <motion.div
      variants={fadeIn('down', 0.8)}
      initial="initial"
      animate="animate"
      className="flex bg-green-900 p-4 md:h-24"
    >
      <div className="w-full items-center justify-center md:flex">
        <div className="mr-4">
          <h3 className="text-center text-2xl font-bold uppercase text-white 2xl:text-4xl">
            Newsletter
          </h3>
          <p className="mb-2 text-center text-xs font-light tracking-wider text-white sm:mb-0">
            Inscreva-se para receber as novidades!
          </p>
        </div>

        <form onSubmit={
          (e) => {
            e.preventDefault()
            handleSubmit(dataForm)
            console.log(dataForm)
          }
        }>
          <div className="items-center justify-center md:flex md:space-x-3">
            <input
              type="text"
              name="name"
              onChange={onChangeInput}
              value={dataForm.name}
              placeholder="Nome e apelido"
              className="mb-2 h-8 w-full rounded-md px-2 text-center text-purple-600 shadow outline-none md:mb-0 md:w-auto"
            />
            <input
              type="email"
              name="email"
              onChange={onChangeInput}
              value={dataForm.email}
              placeholder="E-mail"
              className="mb-2 h-8 w-full rounded-md px-2 text-center text-purple-600 shadow outline-none md:mb-0 md:w-auto"
            />
            <button
              type="submit"
              className="mx-auto w-full rounded-md bg-purple-600 px-4 py-1 text-white shadow-md shadow-purple-600/50"
            >
              Inscreva-se
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
