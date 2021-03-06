import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flag } from './Flag'
import { scaleAnimationUp } from '../../../utils/Motion/Animations'
import { useScroll } from '../../../utils/Motion/useScroll'

// interface TeamCardProps {
//   name?: string
//   cargo?: string
//   nationality?: string | undefined
//   src?: string
//   flag?: string
// }

export function TeamCard({ name, cargo, nationality, src, delay }) {
  const [element, controls] = useScroll()
  
  return (
    <motion.div
    ref={element}
    thresh={0}
    variants={scaleAnimationUp}
    animate={controls}
    transition={{ delay: delay, type: 'tween' }}
    className="relative flex h-[350px] w-[250px] flex-col items-center justify-start rounded-md border border-gray-50 bg-white p-4 shadow-md hover:shadow-lg">
      <div className="mb-4 h-[200px] w-[200px] overflow-hidden rounded-full border-8 border-purple-800 bg-white shadow">
        <Image
          className="grayscale"
          src={src ?? '/vercel.svg'}
          alt={name}
          width={200}
          height={200}
          layout="responsive"
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-36 left-40 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-4 border-purple-800 bg-green-900 object-fill">
          <Flag country={nationality?.slice(0, 2)}  />
        </div>
      </div>
      <div className="flex h-28 w-full flex-col items-center justify-center ">
        <h3 className="text-center text-xl">{name}</h3>
        <p className="text-xs">{cargo}</p>
        <p className="text-xs font-bold">{nationality?.slice(3)}</p>
      </div>
    </motion.div>
  )
}
