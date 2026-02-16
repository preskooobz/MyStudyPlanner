import { readDatabase, writeDatabase } from '../models/database.js';

// GET /api/tasks
export const getAllTasks = async (req, res) => {
  try {
    const { userId, status, priority, subject } = req.query;
    const db = readDatabase();
    let tasks = db.tasks;
    
    // Filtrer par userId si fourni
    if (userId) {
      tasks = tasks.filter(task => task.userId === parseInt(userId));
    }
    
    // Filtrer par status
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    
    // Filtrer par priorité
    if (priority) {
      tasks = tasks.filter(task => task.priority === priority);
    }
    
    // Filtrer par matière
    if (subject) {
      tasks = tasks.filter(task => 
        task.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }
    
    // Enrichir les tâches avec les informations de l'utilisateur
    const enrichedTasks = tasks.map(task => {
      const user = db.users.find(u => u.id === task.userId);
      return {
        ...task,
        user: user ? {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        } : null
      };
    });
    
    res.json({
      success: true,
      count: enrichedTasks.length,
      tasks: enrichedTasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tâches',
      error: error.message
    });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = readDatabase();
    const task = db.tasks.find(t => t.id === parseInt(id));
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }
    
    res.json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la tâche',
      error: error.message
    });
  }
};

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, subject, priority, dueDate } = req.body;
    const db = readDatabase();
    
    // Utiliser req.user.id (depuis JWT) ou fallback sur req.body.userId
    const userId = req.user?.id || req.body.userId || 1;
    
    const newTask = {
      id: db.tasks.length > 0 ? Math.max(...db.tasks.map(t => t.id)) + 1 : 1,
      userId,
      title,
      description: description || '',
      subject,
      priority: priority || 'medium',
      status: 'pending',
      dueDate,
      createdAt: new Date().toISOString()
    };
    
    db.tasks.push(newTask);
    writeDatabase(db);
    
    res.status(201).json({
      success: true,
      message: 'Tâche créée avec succès',
      task: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la tâche',
      error: error.message
    });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = readDatabase();
    
    const taskIndex = db.tasks.findIndex(t => t.id === parseInt(id));
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }
    
    // Mettre à jour la tâche
    db.tasks[taskIndex] = {
      ...db.tasks[taskIndex],
      ...updates,
      id: parseInt(id) // S'assurer que l'ID ne change pas
    };
    
    writeDatabase(db);
    
    res.json({
      success: true,
      message: 'Tâche mise à jour avec succès',
      task: db.tasks[taskIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la tâche',
      error: error.message
    });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const db = readDatabase();
    
    const taskIndex = db.tasks.findIndex(t => t.id === parseInt(id));
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tâche non trouvée'
      });
    }
    
    const deletedTask = db.tasks.splice(taskIndex, 1)[0];
    writeDatabase(db);
    
    res.json({
      success: true,
      message: 'Tâche supprimée avec succès',
      task: deletedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la tâche',
      error: error.message
    });
  }
};

// GET /api/tasks/stats/:userId
export const getTaskStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const db = readDatabase();
    
    // Si userId est "all", récupérer toutes les tâches (pour admin)
    const userTasks = userId === 'all' 
      ? db.tasks 
      : db.tasks.filter(t => t.userId === parseInt(userId));
    
    const stats = {
      total: userTasks.length,
      completed: userTasks.filter(t => t.status === 'completed').length,
      pending: userTasks.filter(t => t.status === 'pending').length,
      byPriority: {
        high: userTasks.filter(t => t.priority === 'high').length,
        medium: userTasks.filter(t => t.priority === 'medium').length,
        low: userTasks.filter(t => t.priority === 'low').length
      },
      bySubject: userTasks.reduce((acc, task) => {
        acc[task.subject] = (acc[task.subject] || 0) + 1;
        return acc;
      }, {})
    };
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};
