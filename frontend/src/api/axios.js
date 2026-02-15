import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requêtes
api.interceptors.request.use(
  (config) => {
    // Vous pouvez ajouter un token d'authentification ici si nécessaire
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non autorisé
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
