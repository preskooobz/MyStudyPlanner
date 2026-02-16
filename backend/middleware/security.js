import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

/**
 * Configuration de Helmet pour les headers de sécurité
 * Protection contre:
 * - XSS (Cross-Site Scripting)
 * - Clickjacking
 * - MIME type sniffing
 * - etc.
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Pour éviter les problèmes avec CORS
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

/**
 * Rate limiting général pour toutes les routes
 * Limite: 100 requêtes par 15 minutes par IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite de 100 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
  },
  standardHeaders: true, // Retourne les infos de rate limit dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
  trustProxy: true, // Trust proxy pour Render, Heroku, etc.
});

/**
 * Rate limiting strict pour les routes d'authentification
 * Limite: 5 tentatives par 15 minutes par IP
 * Protection contre les attaques bruteforce
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite de 5 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Compter même les requêtes réussies
  trustProxy: true, // Trust proxy pour Render, Heroku, etc.
});

/**
 * Rate limiting pour les routes de création
 * Limite: 20 créations par heure par IP
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // Limite de 20 requêtes par fenêtre
  message: {
    success: false,
    message: 'Trop de requêtes de création. Veuillez réessayer plus tard.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true, // Trust proxy pour Render, Heroku, etc.
});

/**
 * Middleware pour ajouter des headers de sécurité supplémentaires
 */
export const securityHeaders = (req, res, next) => {
  // Protection contre le clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Désactive le MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Active le filtre XSS du navigateur
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Force HTTPS (si en production)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Contrôle des referrers
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};
