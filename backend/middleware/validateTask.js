import { body, validationResult } from 'express-validator';
import xss from 'xss';

// Règles de validation pour les tâches
export const taskValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Le titre est obligatoire')
    .isLength({ min: 3, max: 200 }).withMessage('Le titre doit contenir entre 3 et 200 caractères')
    .customSanitizer(value => xss(value)), // Protection XSS
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('La description ne peut pas dépasser 1000 caractères')
    .customSanitizer(value => xss(value)), // Protection XSS
  
  body('subject')
    .trim()
    .notEmpty().withMessage('La matière est obligatoire')
    .isLength({ min: 2, max: 100 }).withMessage('La matière doit contenir entre 2 et 100 caractères')
    .customSanitizer(value => xss(value)), // Protection XSS
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priorité invalide (low, medium, high)'),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Format de date invalide')
    .toDate(),
  
  body('userId')
    .optional()
    .isInt({ min: 1 }).withMessage('ID utilisateur invalide')
    .toInt(),
];

// Middleware pour valider et vérifier les erreurs
export const validateTask = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

// Middleware de validation compatible avec l'ancienne version
export const validateTaskLegacy = (req, res, next) => {
  const { title, subject, priority, dueDate } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Le titre est obligatoire'
    });
  }
  
  // Protection XSS sur les champs texte
  if (title) req.body.title = xss(title.trim());
  if (req.body.description) req.body.description = xss(req.body.description.trim());
  if (subject) req.body.subject = xss(subject.trim());
  
  if (!subject || subject.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'La matière est obligatoire'
    });
  }
  
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({
      success: false,
      message: 'Priorité invalide (low, medium, high)'
    });
  }
  
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({
      success: false,
      message: 'Date invalide'
    });
  }
  
  next();
};
