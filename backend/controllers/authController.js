import { readDatabase, writeDatabase } from '../models/database.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username et password requis'
      });
    }
    
    const db = readDatabase();
    const user = db.users.find(
      u => u.username === username && u.password === password
    );
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }
    
    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    
    // Créer un cookie sécurisé avec les informations de l'utilisateur
    res.cookie('user', JSON.stringify(userWithoutPassword), {
      httpOnly: false, // Accessible depuis JavaScript pour faciliter l'usage
      secure: process.env.NODE_ENV === 'production', // HTTPS en production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 heures
    });
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: userWithoutPassword
    });
  } catch (error) {
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
    
    if (!username || !email || !password) {
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
      return res.status(409).json({
        success: false,
        message: 'Utilisateur déjà existant'
      });
    }
    
    // Créer le nouvel utilisateur
    const newUser = {
      id: db.users.length + 1,
      username,
      email,
      password, // En production, utiliser bcrypt !
      fullName: fullName || username,
      role: 'student', // Rôle par défaut
      createdAt: new Date().toISOString()
    };
    
    db.users.push(newUser);
    writeDatabase(db);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Créer un cookie sécurisé avec les informations de l'utilisateur
    res.cookie('user', JSON.stringify(userWithoutPassword), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 heures
    });
    
    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message
    });
  }
};

// Déconnexion - Supprime le cookie
export const logout = async (req, res) => {
  try {
    res.clearCookie('user');
    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la déconnexion',
      error: error.message
    });
  }
};

// Vérifier l'authentification via le cookie
export const checkAuth = async (req, res) => {
  try {
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
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de l\'authentification',
      error: error.message
    });
  }
};
