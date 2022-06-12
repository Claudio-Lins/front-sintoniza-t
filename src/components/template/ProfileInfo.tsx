
import useAuth from '../../data/hook/useAuth'

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
  const { user } = useAuth()
  return (
    <div className='p-10 truncate'>
      <pre className='w-96'>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
