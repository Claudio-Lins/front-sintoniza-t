import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flag } from './Flag'
import { scaleAnimationUp } from '../../../utils/Motion/Animations'
import { useScroll } from '../../../utils/Motion/useScroll'
import { Ref } from 'react'

// interface TeamCardProps {
//   name: string
//   cargo?: string
//   nationality?: string | undefined
//   src?: string
//   flag?: string
//   delay?: number | undefined
  
//   ref?: unknown | undefined;
// }


export function TeamCardV2({ name, cargo, nationality, src, delay }) {
  const [element, controls] = useScroll()
  return (
    <motion.div
    ref={element}
    thresh={0}
    variants={scaleAnimationUp}
    animate={controls}
    transition={{ delay: delay, type: 'tween' }}
    
    className="relative mt-10 flex w-[250px] flex-col items-center justify-start rounded-md bg-white p-4 shadow-md hover:shadow-lg border border-gray-50">
      <div className="absolute -top-12 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-white bg-red-500 shadow-lg">
        <Image
          className="grayscale"
          src={src ?? '/vercel.svg'}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
        />
      </div>
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
    </motion.div>
  )
}
