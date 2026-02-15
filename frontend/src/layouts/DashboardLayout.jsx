import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import NotificationCenter from '../components/NotificationCenter';
import MobileFooter from '../components/MobileFooter';
import { 
  LayoutDashboard, 
  ListTodo, 
  LogOut, 
  User,
  BookOpen,
  Shield,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fermer le menu mobile quand on passe en desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mes Tâches', href: '/tasks', icon: ListTodo },
    { name: 'Mon Profil', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors"
         style={{ 
           backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
           color: theme === 'dark' ? '#ffffff' : '#111827'
         }}>
      
      {/* Mobile header with hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b"
           style={{ 
             backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
             borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
           }}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" 
                    style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }} />
          <h1 className="text-lg font-bold"
              style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>MyStudyPlanner</h1>
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter />
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop header - Fixed top right */}
      <div className="hidden lg:flex fixed top-0 right-0 z-30 items-center gap-3 px-8 py-4"
           style={{ 
             backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb'
           }}>
        <NotificationCenter />
        <ThemeToggle />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className="fixed inset-y-0 left-0 w-64 z-50 shadow-lg transition-all duration-300"
        style={{ 
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#111827',
          transform: isMobile ? (isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)'
        }}
      >
          <div className="flex flex-col h-full">
            {/* Logo - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 px-6 py-6 border-b dark:border-gray-700"
                 style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
              <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-500" 
                        style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }} />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white"
                    style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>MyStudyPlanner</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400"
                   style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Gestion académique</p>
              </div>
            </div>

            {/* Mobile spacer */}
            <div className="lg:hidden h-16" />

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: isActive(item.href) 
                      ? (theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#f0fdf4')
                      : 'transparent',
                    color: isActive(item.href)
                      ? (theme === 'dark' ? '#4ade80' : '#15803d')
                      : (theme === 'dark' ? '#d1d5db' : '#4b5563')
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User section */}
            <div className="border-t dark:border-gray-700 p-4 space-y-2"
                 style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive('/profile')
                    ? 'bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-200 dark:ring-primary-700'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate"
                     style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                    {user?.fullName || user?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate"
                     style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>{user?.email}</p>
                  {user?.role && (
                    <div className="flex items-center gap-1 mt-1">
                      {user.role === 'admin' ? (
                        <>
                          <Shield className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Admin</span>
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-3 h-3 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">Étudiant</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </div>
        </aside>

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-20" style={{ backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb' }}>
        <main className="p-4 md:p-6 lg:p-8 pb-16 lg:pb-8" style={{ 
          minHeight: '100vh',
          backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
          color: theme === 'dark' ? '#f3f4f6' : '#111827'
        }}>
          {children}
        </main>
      </div>

      {/* Mobile Footer */}
      <MobileFooter />
    </div>
  );
};

export default DashboardLayout;
