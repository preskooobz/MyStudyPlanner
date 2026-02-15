import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { tasksAPI } from '../api/tasksAPI';
import DashboardLayout from '../layouts/DashboardLayout';
import TaskForm from '../components/tasks/TaskForm';
import Button from '../components/ui/Button';

const EditTaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await tasksAPI.getTaskById(id);
      if (response.success) {
        setTask(response.task);
      } else {
        toast.error('Tâche non trouvée', 'Erreur');
        navigate('/tasks');
      }
    } catch (error) {
      toast.error('Erreur lors de la récupération de la tâche', 'Erreur');
      console.error(error);
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const response = await tasksAPI.updateTask(id, formData);

      if (response.success) {
        toast.success('Tâche modifiée avec succès !', 'Succès');
        navigate('/tasks');
      } else {
        toast.error(response.message || 'Erreur lors de la modification de la tâche', 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur lors de la modification de la tâche', 'Erreur');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
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

  if (!task) {
    return null;
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Modifier la Tâche</h1>
            <p className="text-gray-600 mt-1">
              Modifiez les informations de votre tâche
            </p>
          </div>
        </div>


        {/* Form */}
        {task && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center gap-2 mb-6">
              <Edit className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Modifier les informations
              </h2>
            </div>

            <TaskForm
              initialData={task}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EditTaskPage;
