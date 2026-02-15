import { readDatabase, writeDatabase } from '../models/database.js';

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = readDatabase();
    
    const user = db.users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'utilisateur',
      error: error.message
    });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, fullName } = req.body;
    
    const db = readDatabase();
    const userIndex = db.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Vérifier si le username ou email existe déjà (sauf pour l'utilisateur actuel)
    const existingUser = db.users.find(
      u => (u.username === username || u.email === email) && u.id !== parseInt(id)
    );
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Ce nom d\'utilisateur ou email est déjà utilisé'
      });
    }
    
    // Mettre à jour l'utilisateur
    db.users[userIndex] = {
      ...db.users[userIndex],
      username: username || db.users[userIndex].username,
      email: email || db.users[userIndex].email,
      fullName: fullName || db.users[userIndex].fullName,
      updatedAt: new Date().toISOString()
    };
    
    writeDatabase(db);
    
    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = db.users[userIndex];
    
    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil',
      error: error.message
    });
  }
};

// PUT /api/users/:id/password
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mot de passe actuel et nouveau mot de passe requis'
      });
    }
    
    const db = readDatabase();
    const userIndex = db.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Vérifier le mot de passe actuel
    if (db.users[userIndex].password !== currentPassword) {
      return res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }
    
    // Mettre à jour le mot de passe
    db.users[userIndex].password = newPassword; // En production, utiliser bcrypt !
    db.users[userIndex].updatedAt = new Date().toISOString();
    
    writeDatabase(db);
    
    res.json({
      success: true,
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de mot de passe',
      error: error.message
    });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const db = readDatabase();
    
    const userIndex = db.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Supprimer toutes les tâches de l'utilisateur
    db.tasks = db.tasks.filter(task => task.userId !== parseInt(id));
    
    // Supprimer l'utilisateur
    db.users.splice(userIndex, 1);
    
    writeDatabase(db);
    
    res.json({
      success: true,
      message: 'Compte supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du compte',
      error: error.message
    });
  }
};
