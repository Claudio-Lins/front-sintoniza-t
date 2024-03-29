import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { Flag } from './Flag'

interface TeamCardProps {
  name: string
  cargo?: string
  nationality?: string | undefined
  src?: string
  flag?: string
  onDelete?: () => void
  onEdit?: () => void
  onClick?: () => void
  deleteBtn?: boolean
  editBtn?: boolean
}

export function TeamCardV2({
  name,
  cargo,
  nationality,
  deleteBtn,
  onEdit,
  src,
  onDelete,
  onClick
}: TeamCardProps) {
  return (
    <div className="relative mt-10 flex w-[300px] flex-col items-center justify-start rounded-md border border-gray-50 bg-white p-4 shadow-md hover:shadow-lg">
      <div className="absolute -top-12 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white shadow-lg">
        <Image
          className=""
          src={src ? src : '/assets/alien-fill.svg'}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
          priority
        />
      </div>
      {deleteBtn && (
        <div className="absolute top-1 right-1 flex flex-col items-center justify-center gap-2 rounded-full text-gray-400 shadow-sm">
          <button onClick={onDelete} className=" hover:text-red-600">
            {<BsTrash size={20} />}
          </button>

          <button onClick={onEdit} className=" hover:text-green-600">
            {<FiEdit size={20} />}
          </button>
        </div>
      )}
      <div className="mt-16 flex h-20 w-full flex-col items-center justify-center ">
        <h3 className="mb-4 text-center text-lg leading-5">{name}</h3>
        <div className="flex w-full items-center justify-between">
          <p className="text-xs font-bold">{cargo}</p>
          <button className=" group flex items-center justify-center">
            <span className="mr-1 max-w-0 overflow-hidden text-xs font-bold transition-all duration-700 group-hover:max-w-sm">
              {nationality?.slice(3)}
            </span>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Flag country={nationality?.slice(0, 2)} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
