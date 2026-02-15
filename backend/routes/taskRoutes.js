import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

// GET /api/tasks/stats/:userId
router.get('/stats/:userId', getTaskStats);

// GET /api/tasks
router.get('/', getAllTasks);

// GET /api/tasks/:id
router.get('/:id', getTaskById);

// POST /api/tasks
router.post('/', validateTask, createTask);

// PUT /api/tasks/:id
router.put('/:id', updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

export default router;
