import { motion } from 'framer-motion';
import { animationUp, scaleAnimationRight } from '../../../../utils/Motion/Animations';
import { useScroll } from '../../../../utils/Motion/useScroll';

// interface TitleProps {
//   title: string;
//   delay: any;
// }

export function Title({ title, delay }) {

  const [element, controls] = useScroll()

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <motion.h2
        ref={element}
        variants={animationUp}
        animate={controls}
        transition={{ delay: delay, type: 'spring' }}
        className='w-full'
        >
        <span className='text-transparent bg-gradient-to-r bg-clip-text from-green-900 via-purple-700 to-green-600 drop-shadow-md'>
        {title}
        </span>
      </motion.h2>
      <motion.div
        ref={element}
        variants={scaleAnimationRight}
        animate={controls}
        transition={{ delay: delay - 1, type: 'spring', duration: 1 }}
        className="my-2 w-full h-[2px] shadow-sm bg-gradient-to-r from-green-900 via-purple-700 to-green-800 rounded-lg"
      ></motion.div>
    </div>
  )
}
