import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { Botao } from '../../components/assets/Botao'
import { Entradas } from '../../components/assets/Entradas'
import { SelectFlag } from '../../components/Team/SelectFlag'
import { TeamCardV2 } from '../../components/Team/TeamCardV2'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllImprensa } from '../api/sintonizat-api/imprensa/getAllImprensa'

export default function Equipa() {
  const [upload, setUpload] = useState('')
  const [dataForm, setDataForm] = useState({
    name: '',
    nationality: '',
    telemovel: '',
    email: '',
    cargo: '',
    fileUrl: 'https://avatars.githubusercontent.com/u/69011104?v=4',
  })

  const onChangeInput = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })

  return (
    <div className="flex flex-col">
      <HeaderContent title={'Equipa'} subtitle="Membros da equipa Sitoniza-t" />
      <div className="flex justify-between divide-x-2 p-8">
        <div className="flex w-3/5 items-center justify-center">
          <div className="max-w-sm p-4 sm:min-w-[650px]">
            <h4 className="text-center">Cadastre um novo mebro da equipa.</h4>
            <div className="mt-2 rounded-md border p-4 shadow-inner ">
              <form className="flex w-full flex-col items-center justify-center">
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
                  <Botao>
                    Cadastrar
                  </Botao>
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
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  // const imprensa = await getAllImprensa()

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
      // imprensa: JSON.parse(JSON.stringify(imprensa)),
    },
  }
}
