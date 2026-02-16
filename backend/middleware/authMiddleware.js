import { verifyAccessToken, extractToken } from '../config/jwt.js';
import logger, { logSecurity } from '../config/logger.js';

/**
 * Middleware pour vérifier le token JWT
 * Doit être utilisé sur les routes protégées
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = extractToken(authHeader);

  if (!token) {
    logSecurity.invalidToken(req.ip, 'No token provided');
    return res.status(401).json({
      success: false,
      message: 'Token d\'authentification manquant',
    });
  }

  const { valid, decoded, error } = verifyAccessToken(token);

  if (!valid) {
    logSecurity.invalidToken(req.ip, error);
    return res.status(403).json({
      success: false,
      message: 'Token invalide ou expiré',
      error,
    });
  }

  // Ajouter les infos utilisateur à la requête
  req.user = decoded;
  logger.debug(`User ${decoded.id} authenticated via JWT`);
  next();
};

/**
 * Middleware optionnel: permet de continuer sans token
 * mais charge l'utilisateur si le token est présent
 */
export const authenticateTokenOptional = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = extractToken(authHeader);

  if (!token) {
    // Pas de token, on continue sans utilisateur
    req.user = null;
    return next();
  }

  const { valid, decoded } = verifyAccessToken(token);

  if (valid) {
    req.user = decoded;
    logger.debug(`User ${decoded.id} authenticated via JWT (optional)`);
  } else {
    req.user = null;
  }

  next();
};

/**
 * Middleware pour vérifier que l'utilisateur a un rôle spécifique
 * À utiliser APRÈS authenticateToken
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentification requise',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logSecurity.accessDenied(
        req.user.id,
        req.user.role,
        req.path,
        req.method
      );
      
      return res.status(403).json({
        success: false,
        message: 'Permissions insuffisantes',
      });
    }

    next();
  };
};

/**
 * Middleware pour vérifier que l'utilisateur accède à ses propres ressources
 * ou qu'il est admin
 */
export const requireOwnershipOrAdmin = (userIdParam = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentification requise',
      });
    }

    const resourceUserId = parseInt(req.params[userIdParam] || req.body.userId);
    
    // Admin peut tout voir
    if (req.user.role === 'admin') {
      return next();
    }

    // L'utilisateur ne peut accéder qu'à ses propres ressources
    if (req.user.id !== resourceUserId) {
      logSecurity.accessDenied(
        req.user.id,
        req.user.role,
        req.path,
        'Access to other user resources'
      );
      
      return res.status(403).json({
        success: false,
        message: 'Accès refusé: vous ne pouvez accéder qu\'à vos propres ressources',
      });
    }

    next();
  };
};

export default {
  authenticateToken,
  authenticateTokenOptional,
  requireRole,
  requireOwnershipOrAdmin,
};
