import axios from 'axios';

// Utiliser la variable d'environnement ou localhost par défaut
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Permet d'envoyer et recevoir des cookies
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
    // Ne pas rediriger automatiquement sur 401
    // Laisser les composants gérer les erreurs
    return Promise.reject(error);
  }
);

export default api;
