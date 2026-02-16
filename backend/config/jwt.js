import jwt from 'jsonwebtoken';
import logger, { logSecurity } from './logger.js';

// Secret pour signer les tokens (À METTRE dans .env en production!)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-this';

// Durées de validité
const ACCESS_TOKEN_EXPIRES_IN = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 jours

/**
 * Génère un access token JWT
 * @param {Object} payload - Données utilisateur (id, username, role)
 * @returns {String} Token JWT
 */
export const generateAccessToken = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      issuer: 'mystudyplanner',
    });
    
    logger.debug(`Access token generated for user ${payload.id}`);
    return token;
  } catch (error) {
    logger.error('Error generating access token:', error);
    throw error;
  }
};

/**
 * Génère un refresh token JWT
 * @param {Object} payload - Données utilisateur (id)
 * @returns {String} Refresh token JWT
 */
export const generateRefreshToken = (payload) => {
  try {
    const token = jwt.sign(
      { id: payload.id },
      JWT_REFRESH_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        issuer: 'mystudyplanner',
      }
    );
    
    logger.debug(`Refresh token generated for user ${payload.id}`);
    return token;
  } catch (error) {
    logger.error('Error generating refresh token:', error);
    throw error;
  }
};

/**
 * Vérifie et décode un access token
 * @param {String} token - JWT token
 * @returns {Object} Payload décodé
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'mystudyplanner',
    });
    return { valid: true, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.debug('Access token expired');
      return { valid: false, error: 'Token expired' };
    }
    if (error.name === 'JsonWebTokenError') {
      logger.warn('Invalid access token');
      return { valid: false, error: 'Invalid token' };
    }
    logger.error('Error verifying access token:', error);
    return { valid: false, error: error.message };
  }
};

/**
 * Vérifie et décode un refresh token
 * @param {String} token - Refresh token JWT
 * @returns {Object} Payload décodé
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'mystudyplanner',
    });
    return { valid: true, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.debug('Refresh token expired');
      return { valid: false, error: 'Token expired' };
    }
    if (error.name === 'JsonWebTokenError') {
      logger.warn('Invalid refresh token');
      return { valid: false, error: 'Invalid token' };
    }
    logger.error('Error verifying refresh token:', error);
    return { valid: false, error: error.message };
  }
};

/**
 * Génère une paire de tokens (access + refresh)
 * @param {Object} user - Objet utilisateur
 * @returns {Object} { accessToken, refreshToken }
 */
export const generateTokenPair = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ id: user.id });

  logger.info(`Token pair generated for user ${user.id} (${user.username})`);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Extrait le token du header Authorization
 * @param {String} authHeader - Header Authorization
 * @returns {String|null} Token ou null
 */
export const extractToken = (authHeader) => {
  if (!authHeader) return null;
  
  // Format: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair,
  extractToken,
};
