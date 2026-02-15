import express from 'express';
import { login, register, logout, checkAuth } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/check
router.get('/check', checkAuth);

export default router;
