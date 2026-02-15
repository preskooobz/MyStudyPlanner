import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ListTodo, 
  LogOut, 
  User,
  BookOpen,
  Shield,
  GraduationCap
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Mes Tâches', href: '/tasks', icon: ListTodo },
    { name: 'Mon Profil', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transition-colors">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-6 border-b dark:border-gray-700">
            <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MyStudyPlanner</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gestion académique</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t dark:border-gray-700 p-4 space-y-2">
            <Link
              to="/profile"
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
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
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
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
