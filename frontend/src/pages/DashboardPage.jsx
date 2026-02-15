import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { tasksAPI } from '../api/tasksAPI';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import ThemeToggle from '../components/ThemeToggle';
import NotificationCenter from '../components/NotificationCenter';
import ThemeDebug from '../components/ThemeDebug';
import { 
  ListTodo, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { formatDate, isOverdue, getDaysUntilDue } from '../utils/helpers';

const DashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchData = async () => {
    try {
      // Si admin, récupérer toutes les données, sinon seulement celles de l'utilisateur
      const params = user.role === 'admin' ? {} : { userId: user.id };
      const statsId = user.role === 'admin' ? 'all' : user.id;
      
      const [statsResponse, tasksResponse] = await Promise.all([
        tasksAPI.getStats(statsId),
        tasksAPI.getAllTasks(params)
      ]);

      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }

      if (tasksResponse.success) {
        setTasks(tasksResponse.tasks);
      }
    } catch (error) {
      toast.error('Erreur lors de la récupération des données', 'Erreur');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Données pour les graphiques
  const subjectData = stats?.bySubject 
    ? Object.entries(stats.bySubject).map(([name, value]) => ({
        name,
        taches: value
      }))
    : [];

  const priorityData = [
    { name: 'Haute', value: stats?.byPriority?.high || 0, color: '#ef4444' },
    { name: 'Moyenne', value: stats?.byPriority?.medium || 0, color: '#f59e0b' },
    { name: 'Basse', value: stats?.byPriority?.low || 0, color: '#3b82f6' },
  ].filter(item => item.value > 0);

  const urgentTasks = tasks
    .filter(task => {
      if (task.status === 'completed') return false;
      const days = getDaysUntilDue(task.dueDate);
      return days <= 3 && days >= 0;
    })
    .slice(0, 5);

  const overdueTasks = tasks.filter(task => 
    task.status === 'pending' && isOverdue(task.dueDate)
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tableau de bord
              </h1>
              {user?.role === 'admin' && (
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-full">
                  Vue Administrateur
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Bienvenue {user?.fullName || user?.username} ! {user?.role === 'admin' 
                ? 'Voici un aperçu de toutes les tâches.' 
                : 'Voici un aperçu de vos tâches académiques.'
              }
            </p>
          </div>
          
          {/* Boutons Notification et Theme */}
          <div className="flex items-center gap-3">
            <NotificationCenter />
            <ThemeToggle />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total des tâches"
            value={stats?.total || 0}
            icon={ListTodo}
            color="primary"
          />
          <StatCard
            title="Tâches terminées"
            value={stats?.completed || 0}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="En cours"
            value={stats?.pending || 0}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="En retard"
            value={overdueTasks.length}
            icon={AlertCircle}
            color="red"
          />
        </div>

        {/* Progress Bar */}
        {stats && stats.total > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progression globale</h3>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {Math.round((stats.completed / stats.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.completed / stats.total) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {stats.completed} tâches terminées sur {stats.total}
            </p>
          </Card>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tâches par matière */}
          {subjectData.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tâches par matière</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="taches" fill="#16a34a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Répartition par priorité */}
          {priorityData.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Répartition par priorité</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>

        {/* Tâches urgentes */}
        {urgentTasks.length > 0 && (
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tâches urgentes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">À faire dans les 3 prochains jours</p>
            </div>
            <div className="space-y-3">
              {urgentTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>{task.subject}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-400 text-sm font-medium rounded-full">
                    {getDaysUntilDue(task.dueDate)} jour{getDaysUntilDue(task.dueDate) > 1 ? 's' : ''}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
      
      {/* Composant de debug pour tester le thème */}
      <ThemeDebug />
    </DashboardLayout>
  );
};

export default DashboardPage;
