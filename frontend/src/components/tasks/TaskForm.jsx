import { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const TaskForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    subject: '',
    priority: 'medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  const subjects = [
    'Programmation Web',
    'Bases de Données',
    'Intelligence Artificielle',
    'Réseaux',
    'Sécurité Informatique',
    'Gestion de Projet',
    'Mathématiques',
    'Autre',
  ];

  const priorities = [
    { value: 'low', label: 'Basse' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'high', label: 'Haute' },
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'La matière est obligatoire';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'La date limite est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Titre de la tâche *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Ex: TP React Hooks"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2"
               style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="input-field resize-none"
          style={{
            backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#d1d5db',
            color: theme === 'dark' ? '#ffffff' : '#111827'
          }}
          placeholder="Décrivez votre tâche..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2"
               style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}>
          Matière *
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
          style={{
            backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
            borderColor: errors.subject ? (theme === 'dark' ? '#f87171' : '#dc2626') : (theme === 'dark' ? '#374151' : '#d1d5db'),
            color: theme === 'dark' ? '#ffffff' : '#111827'
          }}
        >
          <option value=""
                  style={{
                    backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#111827'
                  }}>Sélectionner une matière</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}
                    style={{
                      backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                      color: theme === 'dark' ? '#ffffff' : '#111827'
                    }}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600"
             style={{ color: theme === 'dark' ? '#f87171' : '#dc2626' }}>{errors.subject}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Select
          label="Priorité *"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorities}
        />

        <Input
          label="Date limite *"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          error={errors.dueDate}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Enregistrement...' : (initialData ? 'Modifier' : 'Créer la tâche')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
