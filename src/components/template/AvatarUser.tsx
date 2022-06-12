import Link from 'next/link'
import Image from 'next/image'
import useAuth from '../../data/hook/useAuth'

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
  const { user } = useAuth()
  return (
    <div className='flex flex-col  h-14 w-14 cursor-pointer'>
      <Link href='/profile' passHref>
        <a>
          <Image
            src={user?.imageUrl ?? '/avatar/avatar.svg'}
            alt='avatar'
            layout='responsive'
            width={56}
            height={56}
            className={`${props.className} rounded-full`}
          />
        </a>
      </Link>
    </div>
  )
}
