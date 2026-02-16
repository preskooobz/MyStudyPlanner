import { readDatabase, writeDatabase } from '../models/database.js';
import bcrypt from 'bcrypt';
import { generateTokenPair, verifyRefreshToken } from '../config/jwt.js';
import logger, { logSecurity } from '../config/logger.js';

const SALT_ROUNDS = 10; // Nombre de rounds pour bcrypt

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    
    if (!username || !password) {
      logSecurity.validationError('/api/auth/login', ['username and password required'], ip);
      return res.status(400).json({
        success: false,
        message: 'Username/Email et password requis'
      });
    }
    
    const db = readDatabase();
    // Accepter username OU email pour la connexion
    const user = db.users.find(
      u => u.username === username || u.email === username
    );
    
    if (!user) {
      logSecurity.loginFailed(username, ip, 'User not found');
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }
    
    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      logSecurity.loginFailed(username, ip, 'Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }
    
    // Log succès
    logSecurity.loginAttempt(username, ip, true);
    logger.info(`User ${user.id} (${user.username}) logged in successfully`);
    
    // Générer les tokens JWT
    const { accessToken, refreshToken } = generateTokenPair(user);
    
    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    
    // Stocker le refresh token dans un cookie httpOnly sécurisé
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Pas accessible en JavaScript (sécurité)
      secure: process.env.NODE_ENV === 'production', // HTTPS en production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
    
    // Compatibilité: garder aussi le cookie user pour l'ancien système
    res.cookie('user', JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: userWithoutPassword,
      accessToken,
      // Ne pas renvoyer le refreshToken dans le body (déjà dans le cookie)
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    
    if (!username || !email || !password) {
      logSecurity.validationError('/api/auth/register', ['Missing required fields'], ip);
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }
    
    const db = readDatabase();
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = db.users.find(
      u => u.username === username || u.email === email
    );
    
    if (existingUser) {
      logger.warn(`Registration attempt with existing user: ${username || email}`);
      return res.status(409).json({
        success: false,
        message: 'Utilisateur déjà existant'
      });
    }
    
    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    logger.debug(`Password hashed for user ${username}`);
    
    // Créer le nouvel utilisateur
    const newUser = {
      id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
      username,
      email,
      password: hashedPassword, // Mot de passe hashé
      fullName: fullName || username,
      role: 'student', // Rôle par défaut
      createdAt: new Date().toISOString()
    };
    
    db.users.push(newUser);
    writeDatabase(db);
    
    logger.info(`New user registered: ${newUser.id} (${newUser.username})`);
    
    // Générer les tokens JWT
    const { accessToken, refreshToken } = generateTokenPair(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Stocker le refresh token dans un cookie httpOnly sécurisé
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
    
    // Compatibilité
    res.cookie('user', JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message
    });
  }
};

// Déconnexion - Supprime les cookies
export const logout = async (req, res) => {
  try {
    const userId = req.user?.id || 'unknown';
    logger.info(`User ${userId} logged out`);
    
    res.clearCookie('user');
    res.clearCookie('refreshToken');
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion',
      error: error.message
    });
  }
};

// Vérifier l'authentification via le cookie OU le token JWT
export const checkAuth = async (req, res) => {
  try {
    // Vérifier d'abord le JWT (nouveau système)
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        const { verifyAccessToken } = await import('../config/jwt.js');
        const { valid, decoded } = verifyAccessToken(token);
        
        if (valid) {
          return res.json({
            success: true,
            authenticated: true,
            user: decoded
          });
        }
      }
    }
    
    // Fallback: vérifier le cookie (ancien système - compatibilité)
    const userCookie = req.cookies.user;
    
    if (!userCookie) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié',
        authenticated: false
      });
    }
    
    const user = JSON.parse(userCookie);
    
    res.json({
      success: true,
      authenticated: true,
      user
    });
  } catch (error) {
    logger.error('Check auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de l\'authentification',
      error: error.message
    });
  }
};

/**
 * Rafraîchir l'access token avec le refresh token
 * Le refresh token doit être dans le cookie httpOnly
 */
export const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    
    if (!refreshTokenCookie) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token manquant'
      });
    }
    
    const { valid, decoded, error } = verifyRefreshToken(refreshTokenCookie);
    
    if (!valid) {
      logSecurity.invalidToken(req.ip, `Invalid refresh token: ${error}`);
      return res.status(403).json({
        success: false,
        message: 'Refresh token invalide ou expiré',
        error
      });
    }
    
    // Récupérer l'utilisateur
    const db = readDatabase();
    const user = db.users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Générer un nouveau access token
    const { generateAccessToken } = await import('../config/jwt.js');
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    
    logger.info(`Access token refreshed for user ${user.id}`);
    
    res.json({
      success: true,
      accessToken
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du rafraîchissement du token',
      error: error.message
    });
  }
};
