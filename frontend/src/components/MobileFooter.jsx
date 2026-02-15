import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, ListTodo, User } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileFooter = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      label: 'Accueil'
    },
    { 
      name: 'Tâches', 
      href: '/tasks', 
      icon: ListTodo,
      label: 'Tâches'
    },
    { 
      name: 'Profil', 
      href: '/profile', 
      icon: User,
      label: 'Profil'
    },
  ];

  const isActive = (path) => location.pathname === path;

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
      <nav className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex flex-col items-center justify-center min-w-[70px] py-2 px-3 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: active 
                  ? (theme === 'dark' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)')
                  : 'transparent'
              }}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon 
                  size={24}
                  strokeWidth={active ? 2.5 : 2}
                  style={{
                    color: active
                      ? (theme === 'dark' ? '#4ade80' : '#16a34a')
                      : (theme === 'dark' ? '#9ca3af' : '#6b7280')
                  }}
                />
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: theme === 'dark' ? '#4ade80' : '#16a34a'
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span
                className="text-xs mt-1 font-medium transition-colors"
                style={{
                  color: active
                    ? (theme === 'dark' ? '#4ade80' : '#16a34a')
                    : (theme === 'dark' ? '#9ca3af' : '#6b7280')
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.footer>
  );
};

export default MobileFooter;
