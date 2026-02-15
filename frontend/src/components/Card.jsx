import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

const Card = ({ children, className, hover = false, ...props }) => {
  if (hover) {
    return (
      <motion.div
        className={cn('card', className)}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
