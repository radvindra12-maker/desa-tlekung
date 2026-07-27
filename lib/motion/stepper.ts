export const stepCircleMotion = {
  transition: {
    type: "spring" as const,
    stiffness: 320,
    damping: 20,
  },
};

export const checkMotion = {
  initial: {
    scale: 0,
    rotate: -90,
  },
  animate: {
    scale: 1,
    rotate: 0,
  },
  transition: {
    duration: 0.2,
  },
};

export const connectorMotion = {
  transition: {
    duration: 0.35,
    ease: "easeInOut" as const,
  },
};

export const labelMotion = {
  transition: {
    duration: 0.2,
  },
};