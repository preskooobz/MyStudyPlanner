import { Search, Filter } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { useTheme } from '../../context/ThemeContext';

const TaskFilters = ({ filters, onFilterChange }) => {
  const { theme } = useTheme();
  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'pending', label: 'En cours' },
    { value: 'completed', label: 'Terminées' },
  ];

  const priorityOptions = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'high', label: 'Haute' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Basse' },
  ];

  return (
    <div className="card"
         style={{
           backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
           borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
         }}>
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600"
                style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }} />
        <h3 className="text-lg font-semibold text-gray-900"
            style={{ color: theme === 'dark' ? '#ffffff' : '#111827' }}>Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#9ca3af' }} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="input-field pl-10"
            style={{
              backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : '#d1d5db',
              color: theme === 'dark' ? '#ffffff' : '#111827'
            }}
          />
        </div>

        <Select
          options={statusOptions}
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        />

        <Select
          options={priorityOptions}
          value={filters.priority || ''}
          onChange={(e) => onFilterChange({ priority: e.target.value })}
        />
      </div>
    </div>
  );
};

export default TaskFilters;
