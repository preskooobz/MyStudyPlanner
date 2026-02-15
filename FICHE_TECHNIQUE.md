# 🎓 Fiche Technique - MyStudyPlanner

## 📋 Informations Générales

**Nom du projet**: MyStudyPlanner  
**Type**: Application web de gestion académique  
**Objectif**: Permettre aux étudiants de gérer leurs devoirs, TP et projets  
**Architecture**: Client-Serveur (Frontend/Backend séparé)  
**Date**: 2026  

---

## 🏗️ Architecture Technique

### Type d'architecture
- **Pattern**: MVC (Model-View-Controller)
- **Communication**: API REST (JSON)
- **Séparation**: Frontend SPA / Backend API

### Structure des dossiers
```
mystudyplanner/
│
├── backend/              # API REST
│   ├── server.js         # Point d'entrée serveur
│   ├── controllers/      # Logique métier
│   ├── routes/           # Définition des routes
│   ├── models/           # Accès aux données
│   ├── middleware/       # Middleware personnalisés
│   └── data/             # Base de données JSON
│
└── frontend/             # Interface utilisateur
    ├── src/
    │   ├── api/          # Appels API (axios)
    │   ├── components/   # Composants réutilisables
    │   ├── pages/        # Pages de l'application
    │   ├── context/      # State management
    │   ├── layouts/      # Mise en page
    │   ├── routes/       # Configuration routes
    │   └── utils/        # Fonctions utilitaires
    └── public/           # Assets statiques
```

---

## 💻 Stack Technologique

### Backend
| Technologie | Version | Rôle |
|------------|---------|------|
| Node.js | 18+ | Runtime JavaScript |
| Express.js | 4.18+ | Framework web |
| CORS | 2.8+ | Gestion CORS |
| dotenv | 16.3+ | Variables d'environnement |

### Frontend
| Technologie | Version | Rôle |
|------------|---------|------|
| React | 19 | Framework UI |
| React Router DOM | 6.22+ | Navigation SPA |
| Axios | 1.6+ | Client HTTP |
| Tailwind CSS | 3.4+ | Framework CSS |
| Framer Motion | 11+ | Animations |
| Recharts | 2.12+ | Graphiques |
| Lucide React | 0.323+ | Icônes |

### Outils de développement
- **Vite** - Build tool moderne
- **ESLint** - Linter JavaScript
- **PostCSS** - Transformation CSS
- **Autoprefixer** - Compatibilité CSS

---

## 🎯 Fonctionnalités Détaillées

### 1. Authentification
**Type**: Simulée (localStorage)  
**Fonctionnalités**:
- Connexion utilisateur
- Déconnexion
- Session persistante
- Routes protégées

**Endpoints**:
```
POST /api/auth/login
POST /api/auth/register
```

### 2. Gestion des Tâches
**CRUD Complet**:
- ✅ Create - Créer une tâche
- ✅ Read - Lire/Lister les tâches
- ✅ Update - Modifier une tâche
- ✅ Delete - Supprimer une tâche

**Attributs d'une tâche**:
```javascript
{
  id: Number,
  userId: Number,
  title: String,
  description: String,
  subject: String,
  priority: 'low' | 'medium' | 'high',
  status: 'pending' | 'completed',
  dueDate: Date,
  createdAt: Date
}
```

**Endpoints**:
```
GET    /api/tasks              # Liste avec filtres
GET    /api/tasks/:id          # Détails
POST   /api/tasks              # Créer
PUT    /api/tasks/:id          # Modifier
DELETE /api/tasks/:id          # Supprimer
GET    /api/tasks/stats/:userId # Statistiques
```

### 3. Dashboard
**Statistiques affichées**:
- Nombre total de tâches
- Tâches terminées
- Tâches en cours
- Tâches en retard
- Barre de progression globale

**Graphiques**:
- BarChart: Tâches par matière
- PieChart: Répartition par priorité

**Composants**:
- StatCard: Cartes de statistiques
- ProgressBar: Barre de progression
- UrgentTasks: Liste des tâches urgentes

### 4. Filtres et Recherche
**Types de filtres**:
- Recherche textuelle (titre, description, matière)
- Filtrage par statut
- Filtrage par priorité
- Filtrage par matière

**Implémentation**: Côté client (React)

---

## 🎨 Design et UX

### Palette de couleurs
```css
Primary:   #16a34a (Vert académique)
Success:   #22c55e (Vert)
Warning:   #f59e0b (Orange)
Danger:    #ef4444 (Rouge)
Gray:      #6b7280 (Neutre)
```

### Animations
**Framer Motion**:
- Fade in: Apparition progressive
- Slide up: Glissement vers le haut
- Scale: Agrandissement au survol
- Exit: Animation de sortie

### Responsive Design
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

**Approche**: Mobile-first avec Tailwind CSS

---

## 🔐 Sécurité et Validation

### Côté Backend
- Validation des entrées (middleware)
- Gestion des erreurs centralisée
- Messages d'erreur clairs
- Vérification des types de données

### Côté Frontend
- Validation des formulaires
- Affichage des erreurs
- Routes protégées (PrivateRoute)
- Gestion des états de chargement

**⚠️ Note**: Authentication simulée (pas de JWT/bcrypt)

---

## 📊 Base de Données

**Type**: JSON File Storage  
**Fichier**: `backend/data/db.json`

**Structure**:
```json
{
  "users": [...],
  "tasks": [...]
}
```

**⚠️ Limitations**:
- Pas de relations complexes
- Lecture/écriture synchrone
- Pas de transactions
- Fichier unique

**💡 Alternative production**: MongoDB, PostgreSQL

---

## 🚢 Déploiement

### Backend
**Options**:
- Heroku
- Railway.app
- Render
- DigitalOcean

### Frontend
**Options**:
- Vercel (recommandé)
- Netlify
- GitHub Pages
- Cloudflare Pages

### Variables d'environnement
**Backend (.env)**:
```
PORT=5000
NODE_ENV=production
```

**Frontend**:
- Configurer l'URL de l'API en production

---

## 📈 Performance

### Optimisations Frontend
- Code splitting avec React.lazy
- Memoization avec React.memo
- Debouncing sur la recherche
- Images optimisées

### Optimisations Backend
- Middleware de cache (possible)
- Compression des réponses
- Limitation du taux de requêtes

---

## 🧪 Tests (Non implémenté)

### Tests recommandés
**Backend**:
- Tests unitaires (Jest)
- Tests d'intégration API

**Frontend**:
- Tests unitaires (Vitest)
- Tests de composants (React Testing Library)
- Tests E2E (Playwright, Cypress)

---

## 📚 Documentation API

### Format de réponse standard
```json
{
  "success": true,
  "message": "...",
  "data": {...}
}
```

### Codes HTTP utilisés
- 200 OK - Succès
- 201 Created - Création réussie
- 400 Bad Request - Données invalides
- 401 Unauthorized - Non autorisé
- 404 Not Found - Ressource non trouvée
- 409 Conflict - Conflit (ex: utilisateur existant)
- 500 Internal Server Error - Erreur serveur

---

## 🎓 Concepts Avancés Utilisés

### React
- ✅ Hooks (useState, useEffect, useContext)
- ✅ Context API (AuthContext)
- ✅ Custom Hooks
- ✅ React Router (navigation)
- ✅ Conditional Rendering
- ✅ Component Composition

### JavaScript
- ✅ ES6+ (arrow functions, destructuring, spread)
- ✅ Async/Await
- ✅ Promises
- ✅ Array methods (map, filter, reduce)
- ✅ Modules (import/export)

### CSS
- ✅ Flexbox
- ✅ Grid
- ✅ Animations CSS
- ✅ Responsive design
- ✅ Utility-first (Tailwind)

---

## 🔄 Workflow de Développement

### Installation
```bash
# Backend
cd backend && npm install && npm start

# Frontend (nouveau terminal)
cd frontend && npm install && npm run dev
```

### Git Workflow
```bash
git checkout -b feature/nom-feature
git add .
git commit -m "Add feature"
git push origin feature/nom-feature
```

---

## 📝 Livrables

1. ✅ Code source complet (Frontend + Backend)
2. ✅ README.md détaillé
3. ✅ Documentation technique
4. ✅ Base de données avec données de test
5. ✅ Application fonctionnelle
6. 📄 Rapport de projet (à rédiger)
7. 🎤 Présentation (à préparer)

---

## 🎯 Points Forts du Projet

1. **Architecture professionnelle** - Séparation claire
2. **Code modulaire** - Réutilisable et maintenable
3. **Design moderne** - UI/UX soignée
4. **Animations fluides** - Expérience utilisateur agréable
5. **Responsive** - Fonctionne sur tous les appareils
6. **API REST** - Standards de l'industrie
7. **Documentation complète** - Facile à comprendre

---

## 💡 Démonstration Orale

### Points à présenter
1. Contexte et problématique
2. Architecture et choix techniques
3. Démonstration des fonctionnalités
4. Code significatif (extraits)
5. Difficultés rencontrées
6. Améliorations futures

### Durée recommandée
- Présentation: 10-15 minutes
- Démonstration: 5-10 minutes
- Questions: 5 minutes

---

**Document créé le 14 février 2026**  
**Version 1.0.0**
