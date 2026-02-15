import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

const Card = ({ children, className, hover = false, ...props }) => {
  const Component = hover ? motion.div : 'div';
  
  return (
    <Component
      className={cn('card', className)}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
