import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import supabase from '../../../utils/supabaseClient'
import { Botao } from '../../components/assets/Botao'
import { Entradas } from '../../components/assets/Entradas'
import { SelectFlag } from '../../components/Team/SelectFlag'
import { TeamCardV2 } from '../../components/Team/TeamCardV2'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllEquipa } from '../api/sintonizat-api/equipa/getAllEquipa'

export default function Equipa({ equipa }) {
  let today = new Date().toISOString().slice(0, 10)
  const router = useRouter()
  const [image, setImage] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telemovel, setTelemovel] = useState('')
  const [nationality, setNationality] = useState('')
  const [cargo, setCargo] = useState('')
  const [datePublished, setDatePublished] = useState(today)
  const [fileUrl, setFileUrl] = useState('')
  // const [dataForm, setDataForm] = useState({
  //   id: '',
  //   name: '',
  //   nationality: '',
  //   telemovel: '',
  //   email: '',
  //   cargo: '',
  //   datePublished: today,
  // })

  function resetForm() {
    // setDataForm({
    //   id: '',
    //   name: '',
    //   nationality: '',
    //   telemovel: '',
    //   email: '',
    //   cargo: '',
    //   datePublished: today,
    // })
  }

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })

  async function create(data) {
    try {
      await fetch(`/api/sintonizat-api/equipa/`, {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }).then(() => {
        resetForm()
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  async function updateEquipa(id) {
    try {
      await fetch(`/api/sintonizat-api/equipa/${id}`, {
        body: JSON.stringify(dataForm),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then(() => {})
    } catch (err) {
      console.log(err)
    }
  }

  // const handleUpload = async (e) => {
  //   let file

  //   if (e.target.files) {
  //     file = e.target.files[0]
  //   }
  //   const { data, error } = await supabase.storage
  //     .from('sintonizat')
  //     .upload('equipa/' + file?.name, file)

  //   if (data) {
  //   } else if (error) {
  //     console.log(error)
  //   }
  // }

  const handleSubmitData = async (data) => {
    try {
      toast
        .promise(
          create(data),
          {
            loading: 'Trabalhando nisso....',
            success: 'Equipa criada com secesso!',
            error: 'Ooops! Algo deu errado.',
          },
          {
            duration: 3000,
          }
        )
        .then(() => {
          refreshData()
          resetForm()
        })
    } catch (err) {
      toast.error(err)
    }
  }

  const handleUpdate = (id) => {
    try {
      toast
        .promise(
          updateEquipa(id),
          {
            loading: 'Trabalhando nisso....',
            success: 'Equipa alterada com sucesso',
            error: 'Opppps! Algo deu errado',
          },
          {
            duration: 3000,
          }
        )
        .then(() => {
          resetForm()
          refreshData()
          setIsUpdate(false)
        })
    } catch (err) {
      toast.error(err.message)
    }
  }

  function handleDelete(id) {
    try {
      toast
        .promise(
          fetch(`/api/sintonizat-api/equipa/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          }),
          {
            loading: 'Trabalhando nisso....',
            success: 'Equipa deletada com secesso!',
            error: 'Ooops! Algo deu errado.',
          },
          {
            duration: 3000,
          }
        )
        .then(() => {
          refreshData()
          resetForm()
        })
    } catch (err) {
      console.error(err.message)
    }
  }

  function cancelUpdate() {
    resetForm()
    setIsUpdate(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let fileUrl = ''

    if (image) {
      const { data, error } = await supabase.storage
        .from('sintonizat')
        .upload(`equipa/${Date.now()}_${image.name}`, image)

      if (error) {
        console.error(error.message)
      }

      if (data) {
        setFileUrl(data.path)
        fileUrl = data.path
        console.log(fileUrl)
      }
    }

    const { data, error } = await supabase
      .from('Equipa')
      .insert([{ fileUrl: 'fileUrl' }], { upsert: true })

    isUpdate ? handleUpdate(dataForm.id) : handleSubmitData(dataForm)
    console.log(fileUrl)
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault()
    let fileUrl = ''
    
    if(image) {
      const { data, error } = await supabase.storage
        .from('sintonizat')
        .upload(`equipa/${Date.now()}_${image.name}`, image)


        if (error) {
          alert(error)
        }

        if(data) {
          setFileUrl(data.path)
          fileUrl = data.path.slice(7)
        }
    }

    const { data, error } = await supabase.from('Equipa')
    .insert([
    {name: name,
    nationality: nationality,
    telemovel: telemovel,
    email: email,
    cargo: cargo,
    fileUrl: fileUrl}
    ])

    if(error) {
      console.error(error.message)
    }

    if(data) {
      console.log('ok')
    }
  }

  return (
    <div className="flex flex-col">
      <Toaster />
      <HeaderContent title={'Equipa'} subtitle="Membros da equipa Sitoniza-t" />
      <div className="flex justify-between divide-x-2 p-8">
        <div className="flex w-3/5 items-center justify-center">
          <div className="max-w-sm p-4 sm:min-w-[650px]">
            <h4 className="text-center">Cadastre um novo mebro da equipa.</h4>
            <div className="mt-2 rounded-md border p-4 shadow-inner ">
              <form
                onSubmit={handleSubmitForm}
                className="flex w-full flex-col items-center justify-center"
              >
                <div className="mt-4 w-full space-y-2 p-2">
                  <Entradas
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Nome"
                    className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                  />
                  <Entradas
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <Entradas
                      name="telemovel"
                      type="phone"
                      onChange={(e) => setTelemovel(e.target.value)}
                      value={telemovel}
                      placeholder="Telemovel"
                      className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                    />
                    <Entradas
                      name="cargo"
                      type="text"
                      onChange={(e) => setCargo(e.target.value)}
                      value={cargo}
                      placeholder="Cargo"
                      className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <SelectFlag
                      name="nationality"
                      onChange={(e) => setNationality(e.target.value)}
                      value={nationality}
                      className="p-2 text-gray-400"
                    />
                    <Entradas
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="p-2"
                    />
                  </div>
                  {isUpdate ? (
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Botao type="submit">Alterar</Botao>
                        <Botao onClick={cancelUpdate}>Cancel</Botao>
                      </div>
                    </div>
                  ) : (
                    <Botao type="submit">Cadastrar</Botao>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <TeamCardV2
            deleteBtn={false}
            name={name ? name : 'Nome'}
            cargo={cargo ? cargo : 'Cargo'}
            nationality={nationality ? nationality : 'UN'}
            src={'/assets/user-circle-fill.svg'}
            onClick={() => {}}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {equipa &&
          equipa.map((equipa, i) => {
            return (
              <div className="" key={i}>
                <TeamCardV2
                  deleteBtn
                  onDelete={() => {
                    handleDelete(equipa.id)
                  }}
                  onEdit={() => {
                    setDataForm({
                      id: equipa.id,
                      name: equipa.name,
                      nationality: equipa.nationality,
                      telemovel: equipa.telemovel,
                      email: equipa.email,
                      cargo: equipa.cargo,
                      fileUrl: equipa.fileUrl,
                      datePublished: equipa.datePublished,
                    })
                    setIsUpdate(true)
                  }}
                  name={equipa.name}
                  cargo={equipa.cargo}
                  nationality={equipa.nationality ? equipa.nationality : 'UN'}
                  src={
                    equipa.fileUrl
                      ? `${process.env.NEXT_PUBLIC_URL_EQUIPA_IMG}${equipa.fileUrl}`
                      : '/assets/user-circle-fill.svg'
                  }
                />
                {/* <pre>
                  {JSON.stringify(equipa, null, 2)}
                </pre> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const equipa = await getAllEquipa()

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
      equipa: JSON.parse(JSON.stringify(equipa)),
    },
  }
}
