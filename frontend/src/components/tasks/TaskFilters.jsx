import { Search, Filter } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';

const TaskFilters = ({ filters, onFilterChange }) => {
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
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="input-field pl-10"
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
