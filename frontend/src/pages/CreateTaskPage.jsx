import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { tasksAPI } from '../api/tasksAPI';
import DashboardLayout from '../layouts/DashboardLayout';
import TaskForm from '../components/tasks/TaskForm';
import Button from '../components/ui/Button';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Bloquer l'accès pour les admins - ils ne peuvent pas créer de tâches
  useEffect(() => {
    if (user && user.role === 'admin') {
      toast.error('Les administrateurs ne peuvent pas créer de tâches. Vous gérez uniquement les tâches des étudiants.', 'Accès refusé');
      navigate('/tasks');
    }
  }, [user, navigate, toast]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const taskData = {
        ...formData,
        userId: user.id,
      };

      const response = await tasksAPI.createTask(taskData);

      if (response.success) {
        toast.success('Tâche créée avec succès !', 'Succès');
        navigate('/tasks');
      } else {
        toast.error(response.message || 'Erreur lors de la création de la tâche', 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur lors de la création de la tâche', 'Erreur');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/tasks')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900"
                style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>Nouvelle Tâche</h1>
            <p className="text-gray-600 mt-1"
               style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
              Créez une nouvelle tâche académique
            </p>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Plus className="w-6 h-6 text-primary-600"
                  style={{ color: theme === 'dark' ? '#4ade80' : '#16a34a' }} />
            <h2 className="text-xl font-semibold text-gray-900"
                style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>
              Informations de la tâche
            </h2>
          </div>

          <TaskForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTaskPage;
