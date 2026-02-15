import api from './axios';

export const tasksAPI = {
  // Récupérer toutes les tâches
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/tasks?${params}`);
    return response.data;
  },

  // Récupérer une tâche par ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Créer une nouvelle tâche
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Mettre à jour une tâche
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Supprimer une tâche
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Récupérer les statistiques
  getStats: async (userId) => {
    const response = await api.get(`/tasks/stats/${userId}`);
    return response.data;
  },
};
