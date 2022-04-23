export const animationLeft = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 1, opacity: 1 },
};

export const animationRight = {
  hidden: { x: 100, opacity: 0 },
  show: { x: 1, opacity: 1 },
};

export const animationUp = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 1, opacity: 1 },
};

export const animationDown = {
  hidden: { y: -100, opacity: 0 },
  show: { y: 1, opacity: 1 },
};

export const scaleAnimationUp = {
  hidden: { scale: 0, opacity: 1 },
  show: { scale: 1, opacity: 1 },
};

export const scaleAnimationRight = {
  hidden: { scale: 0, opacity: 1 },
  show: { 
    scale: 1, 
    opacity: 1,
    originX: 0,
  },
};

export const scaleAnimationDown = {
  hidden: { scale: 2, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};
