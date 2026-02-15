import api from './axios';

export const authAPI = {
  // Connexion
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Vérifier l'authentification
  checkAuth: async () => {
    const response = await api.get('/auth/check');
    return response.data;
  },
};
