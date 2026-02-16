import express from 'express';
import { login, register, logout, checkAuth, refreshToken } from '../controllers/authController.js';
import { 
  loginValidationRules, 
  registerValidationRules, 
  validate 
} from '../middleware/validateAuth.js';

const router = express.Router();

// POST /api/auth/login - avec validation et sanitization
router.post('/login', loginValidationRules, validate, login);

// POST /api/auth/register - avec validation et sanitization
router.post('/register', registerValidationRules, validate, register);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/check
router.get('/check', checkAuth);

// POST /api/auth/refresh - Rafraîchir l'access token
router.post('/refresh', refreshToken);

export default router;
