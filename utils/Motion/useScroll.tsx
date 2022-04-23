import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { Ref } from "react";

interface UseScrollProps {
  ref?: React.RefObject<HTMLElement>;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export const useScroll = (thresh = 0) => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: thresh } as UseScrollProps);
  if (view) {
    controls.start("show");
  } else {
    controls.start("hidden");
  }
  return [element, controls];
};
