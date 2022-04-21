import Image from 'next/image'

interface TeamCardProps {
  name?: string
  cargo?: string
  nationality?: string
  src?: string
}

export function TeamCard({ name, cargo, nationality, src }: TeamCardProps) {
  return (
    <div className="relative flex h-[350px] w-[250px] flex-col items-center justify-start rounded-md border border-gray-50 bg-white p-4 shadow-md hover:shadow-lg">
      <div className="h-[200px] w-[200px] rounded-full border-4 border-purple-600 bg-white shadow overflow-hidden mb-4">
        <Image
          src={src ?? '/vercel.svg'}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
        />
        <div className="absolute w-12 h-12 bg-green-900 rounded-full bottom-36 left-40 border-4 border-purple-600"></div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-28 ">
        <h3 className="text-xl text-center">{name}</h3>
        <p className='text-xs'>{cargo}</p>
        <p className='text-xs font-bold'>{nationality}</p>
      </div>
    </div>
  )
}
