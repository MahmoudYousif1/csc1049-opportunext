import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const createVariants = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.6,
      ease: 'easeIn',
    },
  },
});

const transition = (WrappedComponent, delay = 0) => {
  return function TransitionedComponent(props) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="page-wrapper"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={createVariants(delay)}
        >
          <WrappedComponent {...props} />
        </motion.div>
      </AnimatePresence>
    );
  };
};

export default transition;
