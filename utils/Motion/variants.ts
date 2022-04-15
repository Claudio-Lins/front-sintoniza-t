import { Variants } from 'framer-motion'

export const fadeIn = (direction: 'up' | 'down' = 'up', delay: any): Variants => {
  return {
    initial: {
      y: direction === 'up' ? '40' : '-60',
      opacity: 0,
    },

    animate: {
      y: 0,
      opacity: 1,

      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        delay,
      },
    },
  }
}

export const scaleUp = (scale: 'up' | 'down' = 'up', delay: any): Variants => {
  return {
    initial: {
      scale: scale === 'up' ? 0 : 1,
      opacity: 0,
    },

    animate: {
      scale: 1,
      opacity: 1,

      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        delay,
      },
    },
  }
}
