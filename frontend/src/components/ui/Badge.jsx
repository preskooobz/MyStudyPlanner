import { cn } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const Badge = ({ children, variant = 'default', className }) => {
  const { theme } = useTheme();
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const variantStyles = {
    default: {
      backgroundColor: theme === 'dark' ? 'rgba(156, 163, 175, 0.2)' : '#f3f4f6',
      color: theme === 'dark' ? '#d1d5db' : '#1f2937'
    },
    success: {
      backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
      color: theme === 'dark' ? '#4ade80' : '#16a34a'
    },
    warning: {
      backgroundColor: theme === 'dark' ? 'rgba(234, 179, 8, 0.2)' : '#fef9c3',
      color: theme === 'dark' ? '#facc15' : '#ca8a04'
    },
    danger: {
      backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2',
      color: theme === 'dark' ? '#f87171' : '#dc2626'
    },
    info: {
      backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#dbeafe',
      color: theme === 'dark' ? '#60a5fa' : '#2563eb'
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
};

export default Badge;
