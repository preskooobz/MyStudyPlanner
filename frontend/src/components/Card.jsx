import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';

const Card = ({ children, className, hover = false, ...props }) => {
  const { theme } = useTheme();
  
  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
    borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    color: theme === 'dark' ? '#ffffff' : '#111827'
  };
  
  if (hover) {
    return (
      <motion.div
        className={cn('card', className)}
        style={cardStyle}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={cn('card', className)} style={cardStyle} {...props}>
      {children}
    </div>
  );
};

export default Card;
