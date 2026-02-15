import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ListTodo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { tasksAPI } from '../api/tasksAPI';
import DashboardLayout from '../layouts/DashboardLayout';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../components/ui/Button';

const TasksPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null });

  useEffect(() => {
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      // Si admin, récupérer toutes les tâches, sinon seulement celles de l'utilisateur
      const params = user.role === 'admin' ? {} : { userId: user.id };
      const response = await tasksAPI.getAllTasks(params);
      if (response.success) {
        setTasks(response.tasks);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    // Recherche
    if (filters.search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.subject.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Statut
    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    // Priorité
    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    setFilteredTasks(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await tasksAPI.updateTask(task.id, { ...task, status: newStatus });
      toast.success(
        newStatus === 'completed' ? 'Tâche marquée comme complétée !' : 'Tâche marquée comme en attente',
        'Statut mis à jour'
      );
      fetchTasks();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut', 'Erreur');
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    navigate(`/tasks/edit/${task.id}`);
  };

  const handleDelete = (taskId) => {
    setDeleteModal({ isOpen: true, taskId });
  };

  const confirmDelete = async () => {
    try {
      await tasksAPI.deleteTask(deleteModal.taskId);
      toast.success('Tâche supprimée avec succès !', 'Suppression');
      fetchTasks();
    } catch (error) {
      toast.error('Erreur lors de la suppression de la tâche', 'Erreur');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
               style={{ borderColor: theme === 'dark' ? '#4ade80' : '#16a34a' }}></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
                {user.role === 'admin' ? 'Toutes les Tâches' : 'Mes Tâches'}
              </h1>
              {user.role === 'admin' && (
                <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs sm:text-sm font-medium rounded-full"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(147, 51, 234, 0.2)' : '#f3e8ff',
                        color: theme === 'dark' ? '#c084fc' : '#7c3aed'
                      }}>
                  Vue Admin
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400"
               style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
              {user.role === 'admin' 
                ? 'Gérez toutes les tâches des étudiants' 
                : 'Gérez vos devoirs, TP et projets académiques'
              }
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/tasks/new')}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Nouvelle tâche
          </Button>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="card text-center py-16"
               style={{
                 backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                 borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
               }}>
            <ListTodo className="w-16 h-16 text-gray-400 mx-auto mb-4"
                      style={{ color: theme === 'dark' ? '#9ca3af' : '#9ca3af' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2"
                style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
              {tasks.length === 0 ? 'Aucune tâche' : 'Aucun résultat'}
            </h3>
            <p className="text-gray-600 mb-6"
               style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
              {tasks.length === 0
                ? 'Commencez par créer votre première tâche'
                : 'Essayez de modifier vos filtres'}
            </p>
            {tasks.length === 0 && (
              <Button
                variant="primary"
                onClick={() => navigate('/tasks/new')}
                className="inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Créer une tâche
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                  showUserId={user.role === 'admin'}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
        onConfirm={confirmDelete}
        title="Supprimer la tâche"
        message="Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
      />
    </DashboardLayout>
  );
};

export default TasksPage;
