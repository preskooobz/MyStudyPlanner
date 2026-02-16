import { body, validationResult } from 'express-validator';
import xss from 'xss';

/**
 * Règles de validation pour l'inscription (register)
 */
export const registerValidationRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('Le nom d\'utilisateur est obligatoire')
    .isLength({ min: 3, max: 50 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscore')
    .customSanitizer(value => xss(value)),
  
  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est obligatoire')
    .isEmail().withMessage('Format d\'email invalide')
    .normalizeEmail()
    .customSanitizer(value => xss(value)),
  
  body('password')
    .notEmpty().withMessage('Le mot de passe est obligatoire')
    .isLength({ min: 6, max: 100 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  
  body('fullName')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Le nom complet ne peut pas dépasser 100 caractères')
    .customSanitizer(value => xss(value)),
];

/**
 * Règles de validation pour la connexion (login)
 */
export const loginValidationRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('Le nom d\'utilisateur/email est obligatoire')
    .customSanitizer(value => xss(value)),
  
  body('password')
    .notEmpty().withMessage('Le mot de passe est obligatoire'),
];

/**
 * Middleware pour valider et vérifier les erreurs
 */
export const validate = (req, res, next) => {
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
