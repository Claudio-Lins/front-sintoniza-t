import { getSession } from 'next-auth/react'
import { HeaderContent } from '../../components/template/HeaderContent'
import { getAllImprensa } from '../api/sintonizat-api/imprensa/getAllImprensa'
import { TableImprensa} from '../../components/imprensa/TableImprensa'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const imprensa = await getAllImprensa()

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
      imprensa: JSON.parse(JSON.stringify(imprensa)),
    },
  }
}

export default function Imprensa({ imprensa }) {

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function deleteImprensa(id) {
    try {
      fetch(`/api/sintonizat-api/imprensa/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData()
      })
    } catch (error) {
      console.error(error)
    }
  }

    // VIEW
    function viewImprensa(imprensa) {
      setVisible('table')
    }


   // GET by ID
   function selectImprensa(imprensa) {
    setVisible('form')
    // METHOD TO UPDATE
    const response = fetch(
      `${process.env.API_SINTONIZA_T}/imprensa/${imprensa.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    setTitle(imprensa.title)
    console.log(imprensa)
  }
  
  return (
    <>
      <HeaderContent
        title={'Imprensa'}
        subtitle="Materias relacionadas com a Sitoniza-t"
      />
      <TableImprensa 
        imprensa={imprensa} 
        viewImprensa={viewImprensa}
        deleteImprensa={deleteImprensa}
        selectImprensa={selectImprensa}
      />
    </>
    
  )
}
