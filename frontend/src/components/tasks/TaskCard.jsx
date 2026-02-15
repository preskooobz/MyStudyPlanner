import { motion } from 'framer-motion';
import { Pencil, Trash2, Calendar, Flag, User } from 'lucide-react';
import { formatDate, getPriorityBadgeColor, getStatusColor } from '../../utils/helpers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, showUserId = false }) => {
  const { theme } = useTheme();
  const priorityLabels = {
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse',
  };

  const statusLabels = {
    completed: 'Terminée',
    pending: 'En cours',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card hover:shadow-lg transition-shadow"
      style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}
                style={{ color: task.status === 'completed' ? '#9ca3af' : (theme === 'dark' ? '#ffffff' : '#111827') }}>
              {task.title}
            </h3>
            {showUserId && task.user && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700">
                <User className="w-3 h-3 mr-1" />
                {task.user.fullName || task.user.username}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1"
             style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>{task.subject}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={getPriorityBadgeColor(task.priority)}>
            <Flag className="w-3 h-3 mr-1" />
            {priorityLabels[task.priority]}
          </Badge>
          <Badge className={getStatusColor(task.status)}>
            {statusLabels[task.status]}
          </Badge>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-4"
           style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>{task.description}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t"
           style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
        <div className="flex items-center gap-2 text-sm text-gray-500"
             style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task.dueDate)}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="px-3 py-1.5 text-sm"
            onClick={() => onToggleStatus(task)}
          >
            {task.status === 'completed' ? 'Marquer en cours' : 'Marquer terminée'}
          </Button>
          <Button
            variant="secondary"
            className="px-3 py-1.5 text-sm"
            onClick={() => onEdit(task)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            className="px-3 py-1.5 text-sm"
            onClick={() => onDelete(task)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
