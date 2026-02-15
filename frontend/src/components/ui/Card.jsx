import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('card', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
