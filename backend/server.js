import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { 
  helmetConfig, 
  generalLimiter, 
  authLimiter, 
  createLimiter,
  securityHeaders 
} from './middleware/security.js';
import logger, { httpLogStream } from './config/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// CONFIGURATION
// ========================================

// Trust proxy - Nécessaire pour Render, Heroku, et autres plateformes derrière un proxy
// Permet à express-rate-limit d'identifier correctement les utilisateurs via X-Forwarded-For
app.set('trust proxy', 1);

// ========================================
// LOGGING
// ========================================

// HTTP request logging avec Morgan
app.use(morgan('combined', { stream: httpLogStream }));

// ========================================
// MIDDLEWARES DE SÉCURITÉ
// ========================================

// Headers de sécurité avec Helmet
app.use(helmetConfig);

// Headers de sécurité supplémentaires
app.use(securityHeaders);

// Rate limiting général (protection DDoS)
app.use(generalLimiter);

// ========================================
// MIDDLEWARES GÉNÉRAUX
// ========================================

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://mystudyplanner.vercel.app',
  'https://mystudyplanner-fxa1cezms-ngatses-projects-addf8dcf.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permettre les requêtes sans origine (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Accepter toutes les URLs Vercel (preview deployments)
    if (origin && (origin.includes('vercel.app') || allowedOrigins.indexOf(origin) !== -1)) {
      callback(null, true);
    } else {
      console.log('❌ Origine bloquée:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json({ limit: '10mb' })); // Limite de taille du payload
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ========================================
// ROUTES
// ========================================

// Routes d'authentification avec rate limiting strict
app.use('/api/auth', authLimiter, authRoutes);

// Routes des tâches avec rate limiting pour la création
app.use('/api/tasks', taskRoutes);

// Routes des utilisateurs
app.use('/api/users', userRoutes);

// Route de test
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API MyStudyPlanner 📚',
    version: '2.0.0',
    security: {
      helmet: 'enabled',
      rateLimit: 'enabled',
      xssProtection: 'enabled'
    },
    endpoints: {
      auth: '/api/auth',
      tasks: '/api/tasks',
      users: '/api/users'
    }
  });
});

// ========================================
// ERROR HANDLING
// ========================================

// Error handling middleware
app.use(errorHandler);

// ========================================
// SERVEUR
// ========================================

app.listen(PORT, () => {
  logger.info(`🚀 Serveur démarré sur le port ${PORT}`);
  logger.info(`📡 API disponible sur http://localhost:${PORT}/api`);
  logger.info(`🔒 Sécurité activée: Helmet, Rate Limiting, XSS Protection, JWT, Bcrypt`);
  logger.info(`📝 Logging activé: Winston + Morgan`);
  console.log(`\n✅ Server ready on port ${PORT}\n`);
});
