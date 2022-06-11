import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import { getAllImprensa } from "../api/sintonizat-api/imprensa/getAllImprensa"




export async function getServerSideProps(context) {
  const session = await getSession(context);
  const imprensa = await getAllImprensa()

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      imprensa: JSON.parse(JSON.stringify(imprensa)),
    },
  };
}

export default function Imprensa({imprensa}) {
  return (
    <div>
      <pre>
        {JSON.stringify(imprensa, null, 2)}
      </pre>
    </div>
  )
}

