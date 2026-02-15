import express from 'express';
import { 
  getUserById, 
  updateUser, 
  updatePassword, 
  deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

// GET /api/users/:id - Récupérer un utilisateur
router.get('/:id', getUserById);

// PUT /api/users/:id - Mettre à jour un utilisateur
router.put('/:id', updateUser);

// PUT /api/users/:id/password - Changer le mot de passe
router.put('/:id/password', updatePassword);

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete('/:id', deleteUser);

export default router;
