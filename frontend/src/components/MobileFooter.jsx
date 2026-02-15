import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const MobileFooter = () => {
  const { theme } = useTheme();

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg"
      style={{
        backgroundColor: theme === 'dark' 
          ? 'rgba(31, 41, 55, 0.95)' 
          : 'rgba(255, 255, 255, 0.95)',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-center justify-center gap-2 px-4 py-3 safe-area-bottom">
        <GraduationCap 
          size={18}
          style={{
            color: theme === 'dark' ? '#4ade80' : '#16a34a'
          }}
        />
        <span
          className="text-sm font-medium"
          style={{
            color: theme === 'dark' ? '#9ca3af' : '#6b7280'
          }}
        >
          MyStudyPlanner
        </span>
        <span
          className="text-xs"
          style={{
            color: theme === 'dark' ? '#6b7280' : '#9ca3af'
          }}
        >
          © 2026
        </span>
      </div>
    </motion.footer>
  );
};

export default MobileFooter;
