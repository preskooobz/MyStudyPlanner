#  Structure Complète du Projet MyStudyPlanner

```
MyStudyPlanner/
│
├──  README.md                      # Documentation principale
├──  FICHE_TECHNIQUE.md             # Fiche technique détaillée
├──  GUIDE_DEMARRAGE.md             # Guide de démarrage rapide
├──  CHECKLIST_PRESENTATION.md      # Checklist pour la présentation
├──  .gitignore                     # Fichiers à ignorer par Git
├──  start.bat                      # Script de démarrage Windows
├──  package.json                   # Configuration workspace
│
├── 📂 backend/                       #  API REST (Node.js + Express)
│   │
│   ├──  package.json               # Dépendances backend
│   ├──  server.js                  # Point d'entrée serveur
│   ├──  .env                       # Variables d'environnement
│   ├──  .gitignore                 # Ignore backend
│   ├──  README.md                  # Documentation backend
│   │
│   ├── 📂 controllers/               # Logique métier
│   │   ├── authController.js         # Contrôleur auth (login/register)
│   │   └── taskController.js         # Contrôleur tâches (CRUD + stats)
│   │
│   ├── 📂 routes/                    # Routes API
│   │   ├── authRoutes.js             # Routes authentification
│   │   └── taskRoutes.js             # Routes tâches
│   │
│   ├── 📂 models/                    # Modèles de données
│   │   └── database.js               # Accès fichier JSON
│   │
│   ├── 📂 middleware/                # Middleware personnalisés
│   │   ├── errorHandler.js           # Gestion erreurs
│   │   └── validateTask.js           # Validation tâches
│   │
│   └── 📂 data/                      # Base de données
│       └── db.json                   # Fichier JSON (users + tasks)
│
└── 📂 frontend/                      #  Interface utilisateur (React)
    │
    ├──  package.json               # Dépendances frontend
    ├──  vite.config.js             # Configuration Vite
    ├──  tailwind.config.js         # Configuration Tailwind CSS
    ├──  postcss.config.js          # Configuration PostCSS
    ├──  eslint.config.js           # Configuration ESLint
    ├──  index.html                 # HTML principal
    ├──  .gitignore                 # Ignore frontend
    ├──  README.md                  # Documentation frontend
    │
    ├── 📂 public/                    # Assets statiques
    │
    └── 📂 src/                       # Code source React
        │
        ├──  main.jsx               # Point d'entrée React
        ├──  App.jsx                # Composant racine + routing
        ├──  index.css              # Styles globaux (Tailwind)
        │
        ├── 📂 api/                   #  Gestion API
        │   ├── axios.js              # Configuration Axios
        │   ├── authAPI.js            # Endpoints authentification
        │   └── tasksAPI.js           # Endpoints tâches
        │
        ├── 📂 context/               #  Context API
        │   └── AuthContext.jsx       # Context authentification
        │
        ├── 📂 routes/                #  Configuration routes
        │   └── PrivateRoute.jsx      # Route protégée
        │
        ├── 📂 layouts/               # 📐 Layouts
        │   └── DashboardLayout.jsx   # Layout principal avec sidebar
        │
        ├── 📂 pages/                 #  Pages de l'application
        │   ├── LoginPage.jsx         # Page connexion
        │   ├── DashboardPage.jsx     # Dashboard (stats + graphiques)
        │   ├── TasksPage.jsx         # Liste des tâches
        │   ├── CreateTaskPage.jsx    # Création tâche
        │   ├── EditTaskPage.jsx      # Modification tâche
        │   └── NotFoundPage.jsx      # Page 404
        │
        ├── 📂 components/            #  Composants réutilisables
        │   │
        │   ├── 📂 ui/                # Composants UI de base
        │   │   ├── Card.jsx          # Carte container
        │   │   ├── Button.jsx        # Bouton avec variants
        │   │   ├── Input.jsx         # Champ de saisie
        │   │   ├── Select.jsx        # Liste déroulante
        │   │   └── Badge.jsx         # Badge/Étiquette
        │   │
        │   ├── 📂 tasks/             # Composants tâches
        │   │   ├── TaskCard.jsx      # Carte de tâche
        │   │   ├── TaskForm.jsx      # Formulaire tâche
        │   │   └── TaskFilters.jsx   # Filtres tâches
        │   │
        │   ├── 📂 dashboard/         # Composants dashboard
        │   │   └── StatCard.jsx      # Carte statistique
        │   │
        │   ├── Card.jsx              # (legacy)
        │   ├── Button.jsx            # (legacy)
        │   ├── Input.jsx             # (legacy)
        │   ├── Select.jsx            # (legacy)
        │   ├── TaskCard.jsx          # (legacy)
        │   ├── StatCard.jsx          # (legacy)
        │   └── SearchBar.jsx         # Barre de recherche
        │
        ├── 📂 utils/                 #  Fonctions utilitaires
        │   └── helpers.js            # Helpers (dates, couleurs, etc.)
        │
        └── 📂 assets/                #  Images et ressources
```

##  Statistiques du Projet

### Backend
- **Fichiers**: ~12 fichiers
- **Lignes de code**: ~800 lignes
- **Endpoints API**: 8 routes
- **Contrôleurs**: 2
- **Middleware**: 2

### Frontend
- **Fichiers**: ~35+ fichiers
- **Lignes de code**: ~2500+ lignes
- **Pages**: 6 pages
- **Composants**: 20+ composants
- **Context**: 1 (Auth)

### Total
- **Fichiers totaux**: ~50+ fichiers
- **Lignes de code**: ~3500+ lignes
- **Technologies**: 15+

##  Points d'Entrée

### Backend
- **Fichier principal**: `backend/server.js`
- **Port**: 5000
- **Commande**: `npm start`

### Frontend
- **Fichier principal**: `frontend/src/main.jsx`
- **Port**: 3000
- **Commande**: `npm run dev`

##  Dépendances Principales

### Backend (5 packages)
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### Frontend (10+ packages)
```json
{
  "react": "^19.2.0",
  "react-router-dom": "^6.22.0",
  "axios": "^1.6.7",
  "framer-motion": "^11.0.5",
  "recharts": "^2.12.0",
  "lucide-react": "^0.323.0",
  "tailwindcss": "^3.4.1",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.1"
}
```

##  Fichiers Clés à Connaître

### Configuration
1. `backend/.env` - Variables d'environnement
2. `frontend/vite.config.js` - Config Vite + proxy API
3. `frontend/tailwind.config.js` - Personnalisation Tailwind

### Backend Core
4. `backend/server.js` - Serveur Express
5. `backend/data/db.json` - Base de données
6. `backend/controllers/taskController.js` - Logique tâches

### Frontend Core
7. `frontend/src/App.jsx` - Routing
8. `frontend/src/context/AuthContext.jsx` - Auth state
9. `frontend/src/pages/DashboardPage.jsx` - Dashboard principal
10. `frontend/src/api/tasksAPI.js` - API client

##  Composants Principaux

### Layout
- **DashboardLayout**: Layout avec sidebar + header

### Pages
- **LoginPage**: Authentification
- **DashboardPage**: Stats + graphiques
- **TasksPage**: Liste CRUD
- **CreateTaskPage**: Formulaire création
- **EditTaskPage**: Formulaire édition

### UI Components
- **Card**: Container stylisé
- **Button**: Bouton avec variants
- **Input/Select**: Champs formulaire
- **Badge**: Labels colorés
- **StatCard**: Carte de statistique
- **TaskCard**: Carte de tâche

##  Flux de Données

```
User Action (Frontend)
    ↓
Component Event Handler
    ↓
API Call (axios)
    ↓
Backend Route
    ↓
Controller Logic
    ↓
Database (JSON)
    ↓
Response to Frontend
    ↓
State Update (React)
    ↓
UI Re-render
```

##  Routes de l'Application

### Frontend Routes
```
/login                  → LoginPage
/dashboard              → DashboardPage (protected)
/tasks                  → TasksPage (protected)
/tasks/new              → CreateTaskPage (protected)
/tasks/edit/:id         → EditTaskPage (protected)
*                       → NotFoundPage
```

### API Routes
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/stats/:userId
```

##  Base de Données

### Structure
```json
{
  "users": [
    { id, username, email, password, fullName, createdAt }
  ],
  "tasks": [
    { id, userId, title, description, subject, priority, status, dueDate, createdAt }
  ]
}
```

##  Architecture en Image

```
┌─────────────────────────────────────────┐
│           FRONTEND (React)              │
│  ┌───────────────────────────────────┐  │
│  │  Pages → Components → API Calls   │  │
│  └───────────────────────────────────┘  │
└─────────────────┬───────────────────────┘
                  │ HTTP/JSON
                  ↓
┌─────────────────────────────────────────┐
│           BACKEND (Express)             │
│  ┌───────────────────────────────────┐  │
│  │  Routes → Controllers → Database  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

**Document créé le 14 février 2026**  
**Version 1.0.0**
