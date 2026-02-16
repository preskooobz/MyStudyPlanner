import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer le dossier logs s'il n'existe pas
import fs from 'fs';
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

/**
 * Configuration du logger Winston
 * Logs organisés par niveau : error, warn, info, http, debug
 */

// Format personnalisé pour les logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Format pour la console (plus lisible)
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

// Configuration des transports (destinations des logs)
const transports = [
  // Console (développement)
  new winston.transports.Console({
    format: consoleFormat,
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  }),

  // Fichier pour tous les logs
  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    format: customFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),

  // Fichier séparé pour les erreurs
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    format: customFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

// Créer le logger principal
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  transports,
  exitOnError: false,
});

// Logger spécifique pour la sécurité
export const securityLogger = winston.createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'security.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    }),
  ],
});

// Méthodes helper pour logs de sécurité
export const logSecurity = {
  /**
   * Log une tentative de connexion
   */
  loginAttempt: (username, ip, success) => {
    securityLogger.info('Login attempt', {
      username,
      ip,
      success,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log une tentative de connexion échouée
   */
  loginFailed: (username, ip, reason = 'Invalid credentials') => {
    securityLogger.warn('Login failed', {
      username,
      ip,
      reason,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log une violation de rate limit
   */
  rateLimitExceeded: (ip, endpoint) => {
    securityLogger.warn('Rate limit exceeded', {
      ip,
      endpoint,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log une erreur de validation
   */
  validationError: (endpoint, errors, ip) => {
    securityLogger.info('Validation error', {
      endpoint,
      errors,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log un accès refusé (permissions)
   */
  accessDenied: (userId, userRole, resource, action) => {
    securityLogger.warn('Access denied', {
      userId,
      userRole,
      resource,
      action,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log une tentative XSS détectée
   */
  xssAttempt: (field, value, ip) => {
    securityLogger.warn('XSS attempt detected', {
      field,
      value: value.substring(0, 100), // Limiter la taille
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log un token JWT invalide
   */
  invalidToken: (ip, reason) => {
    securityLogger.warn('Invalid JWT token', {
      ip,
      reason,
      timestamp: new Date().toISOString(),
    });
  },
};

// Stream pour Morgan (HTTP logging)
export const httpLogStream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

export default logger;
