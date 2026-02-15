import api from './axios';

export const usersAPI = {
  // Récupérer un utilisateur par ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour le profil utilisateur
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Changer le mot de passe
  updatePassword: async (userId, passwordData) => {
    try {
      const response = await api.put(`/users/${userId}/password`, passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer le compte
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
