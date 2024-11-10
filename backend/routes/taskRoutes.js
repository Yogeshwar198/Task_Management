import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskControllers.js';

const router = express.Router();

// Route to create a new task
router.post('/tasks', createTask);

// Route to get all tasks
router.get('/tasks', getTasks);

// Route to get a specific task by ID
router.get('/tasks/:id', getTaskById);

// Route to update a task by ID
router.put('/tasks/:id', updateTask);

// Route to delete a task by ID
router.delete('/tasks/:id', deleteTask);

export default router;
