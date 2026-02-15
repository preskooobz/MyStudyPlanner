import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('🔄 Changement de thème:', theme === 'dark' ? 'clair' : 'sombre');
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 border-2 border-gray-300 dark:border-gray-600"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Changer le thème"
      title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {theme === 'dark' ? (
          <Moon size={22} className="text-yellow-400" />
        ) : (
          <Sun size={22} className="text-yellow-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
