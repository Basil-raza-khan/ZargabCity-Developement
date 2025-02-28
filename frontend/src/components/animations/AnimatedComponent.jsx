import { motion } from "framer-motion";

const variants = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    x: -20, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1 
  }
};

export const AnimatedComponent = ({ children, className }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// For list items or grid items
export const AnimatedItem = ({ children, className }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent; 