import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
  const { data: session } = useSession()
  return (
    <div className='flex flex-col  h-16 w-14 cursor-pointer'>
      <Link href='/profile' passHref>
        <a>
          <Image
            src={session.user.image ?? '/avatar/avatar.svg'}
            alt='avatar'
            layout='responsive'
            width={56}
            height={56}
            className={`${props.className} rounded-full`}
          />
        </a>
      </Link>
        <p className='text-[8px] text-center font-bold'>{session.user.name}</p>
    </div>
  )
}