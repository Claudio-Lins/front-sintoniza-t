import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
  const { data: session } = useSession()
  return (
    <div className="flex h-16  w-14 cursor-pointer flex-col">
      <Image
        src={session.user.image ?? '/avatar/avatar.svg'}
        alt="avatar"
        layout="responsive"
        width={56}
        height={56}
        className={`${props.className} rounded-full`}
      />

      <p className="text-center text-[8px] font-bold">{session.user.name}</p>
    </div>
  )
}
