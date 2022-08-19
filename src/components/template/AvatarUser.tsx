import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface AvatarUserProps {
  className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
  const { data: session } = useSession()
  return (
    <div className="flex cursor-pointer gap-1 flex-col justify-center items-center">
      {/* <div className="w-10 mt-2">
      <Image
        src={session.user.image ?? '/logo/logoicon.png'}
        alt="avatar"
        layout="responsive"
        width={56}
        height={56}
        className={`${props.className} rounded-full`}
      />
      </div> */}

      <p className="text-center text-[12px] font-bold">{session.user.name}</p>
    </div>
  )
}
