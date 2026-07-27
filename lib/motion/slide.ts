export const slideUp = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -18,
  },
  transition: {
    duration: 0.25,
    ease: "easeOut" as const,
  },
};