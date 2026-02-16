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
    // Ajouter le token JWT à chaque requête si disponible
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si 401 Unauthorized et on n'a pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Récupérer le refresh token du localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Tenter de rafraîchir le token avec le refresh token dans le body
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          // Sauvegarder le nouveau access token
          localStorage.setItem('accessToken', data.accessToken);
          
          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Échec du refresh = déconnexion
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Ne pas rediriger automatiquement sur 401
    // Laisser les composants gérer les erreurs
    return Promise.reject(error);
  }
);

export default api;
