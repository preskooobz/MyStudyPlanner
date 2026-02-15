import { motion } from 'framer-motion';
import { CheckCircle, Clock, Calendar, AlertCircle } from 'lucide-react';
import { 
  formatDate, 
  getPriorityBadgeColor, 
  getStatusColor,
  isOverdue,
  getDaysUntilDue
} from '../utils/helpers';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const overdue = task.status === 'pending' && isOverdue(task.dueDate);
  const daysUntil = getDaysUntilDue(task.dueDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadgeColor(task.priority)}`}>
              {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        {overdue && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">En retard</span>
          </div>
        )}
        {!overdue && task.status === 'pending' && daysUntil <= 3 && daysUntil >= 0 && (
          <div className="flex items-center gap-1 text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Urgent ({daysUntil}j)</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{task.subject}</span>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
            {task.status === 'completed' ? 'Terminée' : 'En cours'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStatus(task)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={task.status === 'completed' ? 'Marquer comme en cours' : 'Marquer comme terminée'}
          >
            <CheckCircle 
              className={`w-5 h-5 ${task.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}
            />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
