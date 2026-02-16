/**
 * Middleware pour vérifier le rôle de l'utilisateur
 * Usage: router.get('/admin-route', checkRole('admin'), controller)
 * 
 * Note: Ce middleware doit être utilisé APRÈS authenticateToken
 * qui ajoute req.user avec les informations de l'utilisateur
 */
export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Essayer d'abord req.user (depuis JWT)
    let userRole = req.user?.role;
    
    // Fallback sur req.body pour compatibilité (ancien système)
    if (!userRole && req.body.userRole) {
      userRole = req.body.userRole;
    }
    
    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé: rôle non spécifié. Authentification requise.'
      });
    }
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Accès refusé: permissions insuffisantes. Rôle requis: ${allowedRoles.join(' ou ')}`
      });
    }
    
    next();
  };
};

// Middleware pour vérifier si l'utilisateur est admin
export const isAdmin = checkRole('admin');

// Middleware pour vérifier si l'utilisateur est étudiant ou admin
export const isStudent = checkRole('student', 'admin');

// Middleware pour vérifier si l'utilisateur est UNIQUEMENT étudiant (pas admin)
// Utilisé pour les actions que seuls les étudiants peuvent faire (ex: créer des tâches)
export const isStudentOnly = checkRole('student');
