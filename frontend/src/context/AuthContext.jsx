import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Système d'authentification locale (localStorage uniquement)
const AUTH_STORAGE_KEY = 'mystudyplanner_users';
const CURRENT_USER_KEY = 'mystudyplanner_current_user';

// Récupérer tous les utilisateurs enregistrés
const getStoredUsers = () => {
  const users = localStorage.getItem(AUTH_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Sauvegarder un nouvel utilisateur
const saveUser = (user) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
};

// Trouver un utilisateur par email
const findUserByEmail = (email) => {
  const users = getStoredUsers();
  return users.find(u => u.email === email);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem(CURRENT_USER_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { email, password } = credentials;
      
      // Chercher l'utilisateur dans le localStorage
      const foundUser = findUserByEmail(email);
      
      if (!foundUser) {
        return { 
          success: false, 
          message: 'Aucun compte trouvé avec cet email' 
        };
      }
      
      if (foundUser.password !== password) {
        return { 
          success: false, 
          message: 'Mot de passe incorrect' 
        };
      }
      
      // Connexion réussie - ne pas inclure le mot de passe dans la session
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role || 'student',
        createdAt: foundUser.createdAt
      };
      
      setUser(userSession);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: 'Erreur de connexion' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const { name, email, password } = userData;
      
      // Vérifier si l'email existe déjà
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return { 
          success: false, 
          message: 'Un compte existe déjà avec cet email' 
        };
      }
      
      // Créer le nouvel utilisateur
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // En production, il faudrait hasher le mot de passe
        role: 'student',
        createdAt: new Date().toISOString()
      };
      
      // Sauvegarder dans le localStorage
      saveUser(newUser);
      
      // Créer la session (sans le mot de passe)
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      };
      
      setUser(userSession);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: 'Erreur d\'inscription' 
      };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
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
