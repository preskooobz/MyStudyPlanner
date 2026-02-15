import { useAuth } from '../context/AuthContext';

/**
 * Composant pour afficher du contenu selon le rôle de l'utilisateur
 * Usage: <RoleGuard roles={['admin']}><AdminComponent /></RoleGuard>
 */
export const RoleGuard = ({ roles = [], children, fallback = null }) => {
  const { user } = useAuth();
  
  if (!user || !user.role) {
    return fallback;
  }
  
  if (roles.length === 0 || roles.includes(user.role)) {
    return children;
  }
  
  return fallback;
};

/**
 * Hook pour vérifier si l'utilisateur a un rôle spécifique
 * Usage: const isAdmin = useHasRole('admin');
 */
export const useHasRole = (role) => {
  const { user } = useAuth();
  return user?.role === role;
};

/**
 * Hook pour vérifier si l'utilisateur a un des rôles spécifiés
 * Usage: const canEdit = useHasAnyRole(['admin', 'teacher']);
 */
export const useHasAnyRole = (roles = []) => {
  const { user } = useAuth();
  return roles.includes(user?.role);
};
