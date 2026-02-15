import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const StatCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
  const { theme } = useTheme();
  
  const colorStyles = {
    primary: {
      bg: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#f0fdf4',
      text: theme === 'dark' ? '#4ade80' : '#16a34a'
    },
    green: {
      bg: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#f0fdf4',
      text: theme === 'dark' ? '#4ade80' : '#16a34a'
    },
    yellow: {
      bg: theme === 'dark' ? 'rgba(234, 179, 8, 0.2)' : '#fefce8',
      text: theme === 'dark' ? '#facc15' : '#ca8a04'
    },
    blue: {
      bg: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#eff6ff',
      text: theme === 'dark' ? '#60a5fa' : '#2563eb'
    },
    red: {
      bg: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fef2f2',
      text: theme === 'dark' ? '#f87171' : '#dc2626'
    },
  };

  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    red: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
             style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white"
             style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
            {value}
          </p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
               style={{ color: trend > 0 
                 ? (theme === 'dark' ? '#4ade80' : '#16a34a')
                 : (theme === 'dark' ? '#f87171' : '#dc2626')
               }}>
              {trend > 0 ? '+' : ''}{trend}% vs semaine dernière
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full ${colorClasses[color]}`}
             style={{
               backgroundColor: colorStyles[color].bg,
               color: colorStyles[color].text
             }}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
