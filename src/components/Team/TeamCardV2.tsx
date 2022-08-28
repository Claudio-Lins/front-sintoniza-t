import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flag } from './Flag'
import { scaleAnimationUp } from '../../../utils/Motion/Animations'
import { useScroll } from '../../../utils/Motion/useScroll'
import { Ref } from 'react'
import { BsTrash } from 'react-icons/bs'

interface TeamCardProps {
  name: string
  cargo?: string
  nationality?: string | undefined
  src?: string
  flag?: string
  onClick?: () => void
  deleteBtn?: boolean
}

export function TeamCardV2({
  name,
  cargo,
  nationality,
  deleteBtn,
  src,
  onClick,
}:TeamCardProps) {
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
        <button
          onClick={onClick}
          className="absolute top-1 hover:text-red-600 right-1 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 shadow-sm"
        >
          {<BsTrash size={20} />}
        </button>
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
