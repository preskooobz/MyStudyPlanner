import express from 'express';
import { 
  getUserById, 
  updateUser, 
  updatePassword, 
  deleteUser 
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/users/:id - Récupérer un utilisateur
router.get('/:id', authenticateToken, getUserById);

// PUT /api/users/:id - Mettre à jour un utilisateur
router.put('/:id', authenticateToken, updateUser);

// PUT /api/users/:id/password - Changer le mot de passe
router.put('/:id/password', authenticateToken, updatePassword);

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', authenticateToken, deleteUser);

export default router;
