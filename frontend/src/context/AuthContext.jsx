import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/authAPI';
import { getUserFromCookie, saveUserToCookie, removeUserFromCookie } from '../utils/cookies';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté via cookie ou localStorage
    const initAuth = async () => {
      try {
        // D'abord vérifier le cookie
        const userFromCookie = getUserFromCookie();
        if (userFromCookie) {
          setUser(userFromCookie);
          localStorage.setItem('user', JSON.stringify(userFromCookie));
          setLoading(false);
          return;
        }

        // Sinon vérifier localStorage (fallback)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          saveUserToCookie(parsedUser);
          setLoading(false);
          return;
        }

        // Pas d'utilisateur stocké = pas connecté
        setLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success && response.user) {
        setUser(response.user);
        // Sauvegarder l'utilisateur et le token JWT
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('accessToken', response.accessToken); // Nouveau: Sauvegarder le JWT
        saveUserToCookie(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success && response.user) {
        setUser(response.user);
        // Sauvegarder l'utilisateur et le token JWT
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('accessToken', response.accessToken); // Nouveau: Sauvegarder le JWT
        saveUserToCookie(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur d\'inscription' 
      };
    }
  };

  const logout = async () => {
    try {
      // Appeler l'API pour supprimer le cookie côté serveur
      await authAPI.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Nettoyer côté client
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken'); // Nouveau: Supprimer le JWT
      removeUserFromCookie();
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
