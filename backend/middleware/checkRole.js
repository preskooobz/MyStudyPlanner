/**
 * Middleware pour vérifier le rôle de l'utilisateur
 * Usage: router.get('/admin-route', checkRole('admin'), controller)
 */
export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Dans une vraie application, l'utilisateur viendrait du token JWT
    // Ici, on suppose que le userId est passé dans le body ou query
    const { userId, userRole } = req.body;
    
    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé: rôle non spécifié'
      });
    }
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé: permissions insuffisantes'
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
