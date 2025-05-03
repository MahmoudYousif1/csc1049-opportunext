import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

const transition = (WrappedComponent) => {
  return (props) => (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
};

export default transition;
