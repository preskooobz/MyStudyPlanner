import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { taskValidationRules, validateTask } from '../middleware/validateTask.js';
import { isStudentOnly } from '../middleware/checkRole.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/tasks/stats/:userId
router.get('/stats/:userId', authenticateToken, getTaskStats);

// GET /api/tasks
router.get('/', authenticateToken, getAllTasks);

// GET /api/tasks/:id
router.get('/:id', authenticateToken, getTaskById);

// POST /api/tasks - UNIQUEMENT pour les étudiants (pas les admins)
// authenticateToken doit être AVANT isStudentOnly pour que req.user soit défini
router.post('/', authenticateToken, isStudentOnly, taskValidationRules, validateTask, createTask);

// PUT /api/tasks/:id
router.put('/:id', authenticateToken, taskValidationRules, validateTask, updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', authenticateToken, deleteTask);

export default router;
