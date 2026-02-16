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

const router = express.Router();

// GET /api/tasks/stats/:userId
router.get('/stats/:userId', getTaskStats);

// GET /api/tasks
router.get('/', getAllTasks);

// GET /api/tasks/:id
router.get('/:id', getTaskById);

// POST /api/tasks - UNIQUEMENT pour les étudiants (pas les admins)
router.post('/', isStudentOnly, taskValidationRules, validateTask, createTask);

// PUT /api/tasks/:id
router.put('/:id', taskValidationRules, validateTask, updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

export default router;
