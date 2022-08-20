import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Key, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useToast } from '../../../hooks/useToast'
import { Botao } from '../../components/assets/Botao'
import { Entradas } from '../../components/assets/Entradas'
import { SelectFlag } from '../../components/Team/SelectFlag'
import { TeamCardV2 } from '../../components/Team/TeamCardV2'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllEquipa } from '../api/sintonizat-api/equipa/getAllEquipa'

interface EquipaProps {
  id: Number
  name: string
  cargo: string
  nationality: string
}

export default function Equipa({ equipa }) {
  let today = new Date().toISOString().slice(0, 10)
  const [upload, setUpload] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const router = useRouter()
  const [dataForm, setDataForm] = useState({
    id: '',
    name: '',
    nationality: '',
    telemovel: '',
    email: '',
    cargo: '',
    fileUrl: 'https://avatars.githubusercontent.com/u/69011104?v=4',
    datePublished: today,
  })

  function resetForm() {
    setDataForm({
      id: '',
      name: '',
      nationality: '',
      telemovel: '',
      email: '',
      cargo: '',
      fileUrl: 'https://avatars.githubusercontent.com/u/69011104?v=4',
      datePublished: today,
    })
  }

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })

  async function updateEquipa(id: any) {
    console.log('aqui', id)
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

  async function handleUpdate(id: string) {
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
          setIsUpdate(false)
          refreshData()
        })
    } catch (err) {
      toast.error(err.message)
    }
  }

  function cancelUpdate() {
    resetForm()
    setIsUpdate(false)
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
                className="flex w-full flex-col items-center justify-center"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdate(dataForm.id)
                  refreshData()
                }}
              >
                <div className="mt-4 w-full space-y-2 p-2">
                  <Entradas
                    name="name"
                    type="text"
                    onChange={onChangeInput}
                    value={dataForm.name}
                    placeholder="Nome"
                    className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                  />
                  <Entradas
                    name="email"
                    type="email"
                    onChange={onChangeInput}
                    value={dataForm.email}
                    placeholder="Email"
                    className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <Entradas
                      name="telemovel"
                      type="phone"
                      onChange={onChangeInput}
                      value={dataForm.telemovel}
                      placeholder="Telemovel"
                      className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                    />
                    <Entradas
                      name="cargo"
                      type="text"
                      onChange={onChangeInput}
                      value={dataForm.cargo}
                      placeholder="Cargo"
                      className="w-full rounded-lg border border-teal-400 bg-gray-100
                            p-2 focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <SelectFlag
                      name="nationality"
                      onChange={onChangeInput}
                      value={dataForm.nationality}
                      dataForm={undefined}
                      className="p-2 text-gray-400"
                    />
                    <Entradas
                      type="file"
                      name="fileUpload"
                      onChange={(e) => setUpload(e.target.files[0])}
                      placeholder="Foto"
                      className="p-2"
                    />
                  </div>
                  {isUpdate ? (
                    <div className="flex gap-4">
                      <Botao type="submit">Alterar</Botao>
                      <Botao onClick={cancelUpdate}>Cancel</Botao>
                    </div>
                  ) : (
                    <Botao>Cadastrar</Botao>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <TeamCardV2
            name={dataForm.name ? dataForm.name : 'Nome'}
            cargo={dataForm.cargo ? dataForm.cargo : 'Cargo'}
            nationality={dataForm.nationality ? dataForm.nationality : 'UN'}
            src={'https://avatars.githubusercontent.com/u/69011104?v=4'}
            delay={300}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {equipa &&
          equipa.map(
            (
              equipa: {
                telemovel: string
                email: string
                fileUrl: string
                datePublished: string
                id: string
                name: string
                cargo: string
                nationality: string
              },
              i: Key
            ) => {
              return (
                <div
                  className="cursor-pointer"
                  key={i}
                  onClick={() => {
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
                >
                  <TeamCardV2
                    name={equipa.name}
                    cargo={equipa.cargo}
                    nationality={equipa.nationality}
                    src={'https://avatars.githubusercontent.com/u/69011104?v=4'}
                    delay={300}
                  />
                </div>
              )
            }
          )}
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
