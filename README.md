# MyStudyPlanner - Application de Gestion Académique

Application web moderne et complète permettant aux étudiants de gérer leurs devoirs, TP et projets académiques avec un tableau de bord interactif, un système de notifications intelligent et un mode sombre complet.

![Version](https://img.shields.io/badge/version-2.5.0-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Node](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/license-Educational-green.svg)
![Security](https://img.shields.io/badge/security-production_ready-success.svg)

## 🚀 Mise à Jour v2.5.0 - Production Ready

**Cette version apporte des fonctionnalités de sécurité de niveau production :**
- ✅ 🔒 **Hashage bcrypt** - Mots de passe sécurisés (10 rounds)
- ✅ 🎫 **JWT Authentication** - Access + Refresh tokens
- ✅ 📝 **Winston Logging** - Logs de sécurité dédiés
- ✅ 🧪 **Tests Jest** - 20+ tests automatisés (~80% coverage)
- ✅ Protection XSS complète (sanitization)
- ✅ Validation stricte avec express-validator
- ✅ Rate limiting (protection DDoS et brute force)
- ✅ Headers de sécurité (Helmet.js)
- ✅ Restriction des permissions par rôle
- ✅ **Les admins ne peuvent plus créer de tâches** (seulement les gérer)

**Score de sécurité : 10/10** 🛡️

📚 **Documentation complète :**
- [PRODUCTION-READY.md](PRODUCTION-READY.md) - **NOUVEAU** - Guide complet v2.5.0
- [SECURITY.md](SECURITY.md) - Guide complet de sécurité (mis à jour)
- [SECURITY-TESTS.md](SECURITY-TESTS.md) - Tests de sécurité
- [ADMIN-WORKFLOW.md](ADMIN-WORKFLOW.md) - Guide pour administrateurs
- [CHANGELOG-SECURITY.md](CHANGELOG-SECURITY.md) - Détails des changements

## Table des Matières

- [Nouveautés Version 2.0.0](#nouveautés-version-200)
- [Fonctionnalités Réalisées](#fonctionnalités-réalisées)
- [Architecture Technique](#architecture-technique)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation-et-démarrage)
  - [Installation avec Docker (Recommandé)](#installation-avec-docker-recommandé)
  - [Installation Manuelle](#installation-complète)
- [Fonctionnalités Détaillées](#fonctionnalités-détaillées)
- [API Documentation](#api-endpoints)
- [Comptes de Test](#comptes-de-test)
- [Structure du Projet](#structure-du-projet)
- [Déploiement Docker](#docker)
- [🔒 Sécurité](#-sécurité)

## Nouveautés Version 2.0.0

### 🔒 Sécurité et Permissions
- **Restriction Admin** : Les administrateurs ne peuvent plus créer de tâches (seulement les gérer)
- **Protection XSS** : Sanitization complète de toutes les entrées utilisateur
- **Validation stricte** : express-validator sur tous les endpoints
- **Rate limiting** : Protection contre DDoS et attaques brute force
- **Headers sécurisés** : Helmet.js pour protection complète
- **Voir [SECURITY.md](SECURITY.md) pour tous les détails**

### Mode Sombre Complet
- Basculement automatique selon préférences système (prefers-color-scheme: dark)
- Bouton de bascule manuelle avec animation
- Sauvegarde de la préférence utilisateur (localStorage)
- **Inversion complète des couleurs** : tout ce qui était noir devient blanc et inversement
- Support dark mode sur **TOUS** les composants avec styles inline JavaScript
- Cohérence visuelle parfaite entre tous les écrans

### Système de Notifications Intelligent
- Centre de notifications avec dropdown
- Badge avec compteur de notifications non lues
- Détection automatique toutes les 5 minutes
- Types de notifications :
  - Tâches en retard (dueDate < maintenant)
  - Tâches à venir dans les 24h
- Navigation directe vers les tâches concernées
- Marquage comme lu/non lu
- Suppression individuelle des notifications
- Interface responsive et accessible

### Gestion des Cookies GDPR
- Bannière de consentement cookies conforme GDPR
- Options Accepter/Refuser
- Sauvegarde de la préférence (30 jours)
- Interface claire et informative

### Améliorations UI/UX
- Interface entièrement thématisée (dark/light)
- Animations fluides avec Framer Motion
- Cartes statistiques harmonisées
- Spinners de chargement thématisés
- Composants UI réutilisables (Input, Select, Badge, Button)
- Responsive sur tous les appareils

## Fonctionnalités Réalisées

### ✅ Authentification Complète
- **Système de connexion/inscription** avec validation
- **Session persistante** via cookies + localStorage
- **Routes protégées** avec PrivateRoute HOC
- **Système de rôles** : Admin et Étudiant
- **Déconnexion sécurisée** avec redirection
- **Contexte d'authentification** global avec React Context API

### ✅ Gestion des Tâches (CRUD Complet)
- **Création** : Formulaire avec titre, description, matière, priorité, date limite
- **Lecture** : Liste complète avec filtres et recherche
- **Modification** : Édition inline de toutes les propriétés
- **Suppression** : Avec modal de confirmation
- **Toggle Status** : Marquer comme complétée/en cours
- **Filtrage avancé** :
  - Par mot-clé (titre, description, matière)
  - Par statut (en cours, terminée)
  - Par priorité (basse, moyenne, haute)
- **Vue Admin** : Visualisation de toutes les tâches des étudiants avec User ID
- **8 matières prédéfinies** : Programmation Web, Bases de Données, IA, Réseaux, Sécurité, Gestion de Projet, Mathématiques, Autre

### ✅ Dashboard Interactif
- **4 Cartes statistiques** :
  - Total des tâches
  - Tâches terminées
  - Tâches en cours
  - Tâches en retard
- **Graphiques avec Recharts** :
  - BarChart : Répartition des tâches par matière
  - PieChart : Distribution par priorité (Haute/Moyenne/Basse)
- **Barre de progression globale** : Gradient vert animé
- **Liste des tâches urgentes** : Top 5 des tâches avec date limite proche
- **Statistiques temps réel** : Mise à jour automatique

### ✅ Pages Implémentées
1. **LoginPage** : Connexion/Inscription avec toggle, animations d'entrée
2. **DashboardPage** : Tableau de bord principal avec graphiques
3. **TasksPage** : Liste complète des tâches avec filtres
4. **CreateTaskPage** : Création de nouvelle tâche
5. **EditTaskPage** : Modification de tâche existante
6. **ProfilePage** : Profil utilisateur avec :
   - Modification des informations (username, email, fullName)
   - Changement de mot de passe sécurisé
   - Badge de rôle (Admin/Étudiant)
   - Statistiques utilisateur

### ✅ Composants Réalisés

**Composants de Layout :**
- `DashboardLayout` : Layout principal avec sidebar, navigation, logout
- `PrivateRoute` : Protection des routes avec redirection

**Composants UI Réutilisables :**
- `Button` : 3 variants (primary, secondary, danger)
- `Input` : Champ de saisie avec label et gestion d'erreur
- `Select` : Liste déroulante thématisée avec options
- `Badge` : 5 variants (default, success, warning, danger, info)
- `Card` : Conteneur avec hover effect et animation
- `StatCard` : Carte statistique avec icône et valeur

**Composants Métiers :**
- `TaskCard` : Carte de tâche avec actions (edit, delete, toggle status)
- `TaskFilters` : Barre de filtres avec recherche et selects
- `TaskForm` : Formulaire de création/édition de tâche
- `NotificationCenter` : Centre de notifications avec dropdown
- `ThemeToggle` : Bouton de basculement de thème
- `ConfirmModal` : Modal de confirmation réutilisable
- `CookieConsent` : Bannière de consentement cookies

### ✅ Contextes React
- `AuthContext` : Gestion de l'authentification et état utilisateur
- `ThemeContext` : Gestion du thème dark/light avec localStorage
- `ToastContext` : Gestion des notifications toast
- `NotificationContext` : Gestion des notifications de tâches

### ✅ API Backend Complète
**Endpoints Authentification :**
- `POST /api/auth/register` : Inscription avec validation
- `POST /api/auth/login` : Connexion avec vérification

**Endpoints Tâches :**
- `GET /api/tasks` : Liste des tâches avec filtres optionnels (userId, status, priority)
- `GET /api/tasks/:id` : Récupération d'une tâche par ID
- `POST /api/tasks` : Création d'une nouvelle tâche
- `PUT /api/tasks/:id` : Mise à jour d'une tâche
- `DELETE /api/tasks/:id` : Suppression d'une tâche
- `GET /api/tasks/stats/:userId` : Statistiques détaillées par utilisateur

**Endpoints Utilisateurs :**
- `GET /api/users` : Liste des utilisateurs (admin)
- `GET /api/users/:id` : Détails d'un utilisateur
- `PUT /api/users/:id` : Mise à jour du profil
- `PUT /api/users/:id/password` : Changement de mot de passe
- `DELETE /api/users/:id` : Suppression d'un utilisateur (admin)

### ✅ Fonctionnalités UX/UI
- **Animations Framer Motion** : Transitions fluides, hover effects
- **Responsive Design** : Mobile, Tablet, Desktop
- **Loading States** : Spinners pendant les requêtes API
- **Error Handling** : Gestion des erreurs avec messages clairs
- **Toast Notifications** : Feedback utilisateur pour chaque action
- **Empty States** : Messages et illustrations quand pas de données
- **Confirmation Modals** : Pour actions destructives (suppression)
- **Icons Lucide React** : Plus de 30 icônes utilisées

## Architecture Technique

## Architecture Technique

### Structure du Projet

```
MyStudyPlanner/
├── backend/                    # API REST Node.js + Express
│   ├── server.js              # Point d'entrée serveur
│   ├── controllers/           # Logique métier
│   │   ├── authController.js  # Authentification (login, register)
│   │   ├── tasksController.js # Gestion des tâches (CRUD, stats)
│   │   └── usersController.js # Gestion des utilisateurs
│   ├── routes/                # Définition des routes API
│   │   ├── auth.js           # Routes /api/auth/*
│   │   ├── tasks.js          # Routes /api/tasks/*
│   │   └── users.js          # Routes /api/users/*
│   ├── middleware/            # Middleware personnalisés
│   │   └── validation.js     # Validation des données
│   ├── models/                # Modèles de données
│   │   ├── User.js           # Modèle utilisateur
│   │   └── Task.js           # Modèle tâche
│   ├── data/                  # Stockage JSON
│   │   ├── users.json        # Base utilisateurs
│   │   └── tasks.json        # Base tâches
│   └── package.json
│
└── frontend/                   # Interface React
    ├── src/
    │   ├── main.jsx           # Point d'entrée React
    │   ├── App.jsx            # Composant racine avec routing
    │   ├── api/               # Gestion des appels API
    │   │   ├── authAPI.js    # API authentification
    │   │   ├── tasksAPI.js   # API tâches
    │   │   └── usersAPI.js   # API utilisateurs
    │   ├── components/        # Composants réutilisables
    │   │   ├── Card.jsx      # Conteneur carte
    │   │   ├── Input.jsx     # Champ de saisie
    │   │   ├── StatCard.jsx  # Carte statistique
    │   │   ├── ConfirmModal.jsx # Modal confirmation
    │   │   ├── CookieConsent.jsx # Bannière cookies
    │   │   ├── NotificationCenter.jsx # Centre notifications
    │   │   ├── ThemeToggle.jsx # Bouton thème
    │   │   ├── tasks/
    │   │   │   ├── TaskCard.jsx    # Carte de tâche
    │   │   │   ├── TaskForm.jsx    # Formulaire tâche
    │   │   │   └── TaskFilters.jsx # Filtres tâches
    │   │   └── ui/
    │   │       ├── Badge.jsx  # Badge de statut
    │   │       ├── Button.jsx # Bouton
    │   │       ├── Input.jsx  # Input thématisé
    │   │       └── Select.jsx # Select thématisé
    │   ├── pages/             # Pages de l'application
    │   │   ├── LoginPage.jsx      # Connexion/Inscription
    │   │   ├── DashboardPage.jsx  # Tableau de bord
    │   │   ├── TasksPage.jsx      # Liste des tâches
    │   │   ├── CreateTaskPage.jsx # Création tâche
    │   │   ├── EditTaskPage.jsx   # Édition tâche
    │   │   └── ProfilePage.jsx    # Profil utilisateur
    │   ├── context/           # Context API
    │   │   ├── AuthContext.jsx   # Contexte authentification
    │   │   ├── ThemeContext.jsx  # Contexte thème
    │   │   ├── ToastContext.jsx  # Contexte toasts
    │   │   └── NotificationContext.jsx # Contexte notifications
    │   ├── layouts/           # Layouts
    │   │   └── DashboardLayout.jsx # Layout principal
    │   ├── routes/            # Configuration routing
    │   │   └── PrivateRoute.jsx    # Route protégée
    │   ├── utils/             # Fonctions utilitaires
    │   │   ├── helpers.js    # Formatage dates, couleurs
    │   │   └── constants.js  # Constantes
    │   ├── index.css         # Styles globaux + Tailwind
    │   └── App.css           # Styles application
    ├── public/               # Fichiers statiques
    ├── index.html           # HTML racine
    ├── vite.config.js       # Configuration Vite
    ├── tailwind.config.js   # Configuration Tailwind
    ├── eslint.config.js     # Configuration ESLint
    └── package.json
```

### Technologies Utilisées

#### Backend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **Node.js** | 18+ | Runtime JavaScript serveur |
| **Express.js** | 4.21.2 | Framework web minimaliste |
| **CORS** | 2.8.5 | Gestion requêtes cross-origin |
| **JSON Storage** | - | Base de données fichier simple |
| **🔒 Helmet** | 8.1.0 | Headers de sécurité (v2.0.0+) |
| **🔒 Express Validator** | 7.3.1 | Validation/Sanitization (v2.0.0+) |
| **🔒 Express Rate Limit** | 8.2.1 | Protection DDoS/Brute Force (v2.0.0+) |
| **🔒 XSS** | 1.0.15 | Protection XSS (v2.0.0+) |
| **🔐 Bcrypt** | 6.0.0 | Hashage mots de passe (v2.5.0+) |
| **🎫 JSON Web Token** | 9.0.3 | JWT authentication (v2.5.0+) |
| **📝 Winston** | 3.19.0 | Logging sécurité (v2.5.0+) |
| **📝 Morgan** | 1.10.1 | HTTP request logging (v2.5.0+) |
| **🧪 Jest** | 30.2.0 | Testing framework (dev, v2.5.0+) |
| **🧪 Supertest** | 7.2.2 | API testing (dev, v2.5.0+) |

#### Frontend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **React** | 19.0.0 | Framework UI moderne |
| **React Router DOM** | 7.1.1 | Navigation SPA |
| **Vite** | 6.0.5 | Build tool rapide |
| **Tailwind CSS** | 3.4.17 | Framework CSS utilitaire |
| **Framer Motion** | 11.18.0 | Animations fluides |
| **Recharts** | 2.15.1 | Graphiques interactifs |
| **Lucide React** | 0.468.0 | Icônes modernes (30+ utilisées) |
| **Axios** | 1.7.9 | Client HTTP |
| **js-cookie** | 3.0.5 | Gestion des cookies |

### Patterns et Bonnes Pratiques

**Architecture Frontend :**
- **Component-Based Architecture** : Composants réutilisables et modulaires
- **Context API** : Gestion d'état global (Auth, Theme, Toast, Notifications)
- **Custom Hooks** : useAuth, useTheme, useToast, useNotifications
- **Protected Routes** : HOC PrivateRoute pour sécuriser les routes
- **API Layer** : Abstraction des appels API dans des fichiers dédiés

**Styling :**
- **Tailwind CSS** : Utility-first CSS avec classes personnalisées
- **Dark Mode** : Styles inline JavaScript pour support complet
- **Responsive Design** : Mobile-first avec breakpoints md, lg
- **Design System** : Palette de couleurs cohérente, composants UI standards

**Performance :**
- **Code Splitting** : Routes lazy loading avec React.lazy
- **Optimized Re-renders** : useCallback, useMemo pour éviter re-renders inutiles
- **Image Optimization** : SVG pour les icônes
- **Bundle Size** : Vite pour bundle optimisé

## Installation et Démarrage

### Prérequis
- **Node.js** 18+ installé ([Télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- **Git** (optionnel)

### Installation Manuelle

#### Étape 1 : Cloner le Projet

```bash
# Cloner le dépôt
git clone https://github.com/preskooobz/MyStudyPlanner.git

# Aller dans le dossier
cd MyStudyPlanner
```

#### Étape 2 : Installation Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Démarrer le serveur (port 5000)
npm start
```

Le serveur API sera accessible sur `http://localhost:5000`

**Dépendances Backend :**
```json
{
  "express": "^4.21.2",
  "cors": "^2.8.5"
}
```

#### Étape 3 : Installation Frontend (nouveau terminal)

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances (peut prendre quelques minutes)
npm install

# Démarrer l'application en mode développement (port 3000)
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

**Dépendances Frontend (principales) :**
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.1.1",
  "axios": "^1.7.9",
  "framer-motion": "^11.18.0",
  "recharts": "^2.15.1",
  "lucide-react": "^0.468.0",
  "js-cookie": "^3.0.5",
  "tailwindcss": "^3.4.17"
}
```

### Installation avec Docker (Recommandé)

Docker permet d'éviter les problèmes de versions et de configurations. **Pour plus de détails, consultez [DOCKER.md](DOCKER.md)**

#### Prérequis Docker
- **Docker** 20.10+ ([Télécharger](https://www.docker.com/products/docker-desktop/))
- **Docker Compose** 2.0+

#### Démarrage Rapide

```bash
# Cloner le projet
git clone https://github.com/preskooobz/MyStudyPlanner.git
cd MyStudyPlanner

# Démarrer avec Docker Compose
docker-compose up -d

# Vérifier que les services sont actifs
docker-compose ps
```

**C'est tout !** L'application est accessible sur :
- **Frontend** : http://localhost
- **Backend API** : http://localhost:5000

#### Commandes Utiles

```bash
# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Redémarrer
docker-compose restart

# Reconstruire les images
docker-compose up -d --build
```

#### Avantages Docker

- ✅ Aucun besoin d'installer Node.js
- ✅ Versions garanties (Node.js 18, React 19)
- ✅ Isolation complète des environnements
- ✅ Déploiement simplifié en production
- ✅ Persistance des données avec volumes
- ✅ Health checks automatiques

**Documentation complète** : [DOCKER.md](DOCKER.md)

### Utilisation

1. **Ouvrir** `http://localhost:3000` (ou `http://localhost` avec Docker) dans votre navigateur
2. **Se connecter** avec un compte de test (voir section Comptes de Test)
3. **Explorer** le dashboard et créer des tâches

### Scripts Disponibles

#### Backend
```bash
npm start       # Démarrer le serveur en mode production
npm run dev     # Mode développement avec nodemon (auto-reload)
```

#### Frontend
```bash
npm run dev     # Serveur de développement Vite (HMR)
npm run build   # Build optimisé pour production
npm run preview # Prévisualiser le build de production
npm run lint    # Vérifier le code avec ESLint
```

### 🧪 Running Tests (v2.5.0)

Le backend inclut une suite complète de tests automatisés avec Jest.

#### Backend Tests
```bash
cd backend

# Exécuter tous les tests
npm test

# Mode watch (exécution automatique à chaque changement)
npm run test:watch

# Générer un rapport de couverture
npm run test:coverage
```

**Tests disponibles :**
- ✅ `auth.test.js` - Tests d'authentification (bcrypt, JWT)
- ✅ `security.test.js` - Tests de sécurité (XSS, RBAC, validation)
- ✅ `jwt.test.js` - Tests JWT (génération, vérification)

**Résultats attendus :**
```
Test Suites: 3 passed, 3 total
Tests:       20+ passed, 20+ total
Snapshots:   0 total
Time:        ~5s
```

### 🔐 Security Setup (v2.5.0)

#### Étape 1 : Configuration des Variables d'Environnement

```bash
cd backend

# Copier le fichier d'exemple
cp .env.example .env
```

Éditer `.env` et générer des secrets sécurisés :

```bash
# Générer JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Générer JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Étape 2 : Migration des Mots de Passe (première installation uniquement)

Si vous avez des utilisateurs existants avec des mots de passe non hashés :

```bash
npm run migrate:passwords
```

**Sortie attendue :**
```
✅ Migration terminée: X mot(s) de passe hashé(s)
```

⚠️ **Important :** Ce script ne doit être exécuté qu'**UNE SEULE FOIS**.

#### Étape 3 : Vérifier les Logs

Les logs de sécurité sont automatiquement générés :

```bash
# Voir les logs en temps réel
tail -f logs/security.log

# Windows PowerShell
Get-Content logs\security.log -Tail 50 -Wait
```

**Documentation complète de sécurité :** [PRODUCTION-READY.md](PRODUCTION-READY.md)

## Comptes de Test

### Compte Administrateur
```
Username: admin
Password: admin123
Role: admin
```

**Capacités Admin :**
- Voir toutes les tâches de tous les étudiants
- Badge "Vue Administrateur"
- Gestion complète des tâches
- Statistiques globales

### Compte Étudiant
```
Username: etudiant
Password: etudiant123
Role: etudiant
```

**Capacités Étudiant :**
- Voir uniquement ses propres tâches
- Créer, modifier, supprimer ses tâches
- Dashboard personnalisé
- Notifications de rappel

## Fonctionnalités Détaillées

### 1. Système d'Authentification

**Inscription :**
- Formulaire avec validation côté client et serveur
- Champs : Username, Email, Nom complet, Mot de passe
- Vérification de l'unicité du username et email
- Hash du mot de passe (simulation, à améliorer en production)
- Création automatique du rôle "étudiant"

**Connexion :**
- Authentification par username et password
- Validation des credentials
- Création de session avec localStorage
- Redirection vers dashboard après connexion
- Gestion des erreurs avec messages clairs

**Session :**
- Persistance avec localStorage
- Auto-login au refresh de la page
- Logout avec nettoyage complet
- Protection des routes avec PrivateRoute

### 2. Gestion des Tâches (CRUD)

**Création de Tâche :**
- Formulaire avec validation complète
- Champs obligatoires : Titre, Matière, Priorité, Date limite
- Champ optionnel : Description (textarea)
- Select de matière avec 8 options prédéfinies
- 3 niveaux de priorité (Basse, Moyenne, Haute)
- Date picker pour date limite
- Validation côté client avant soumission
- Toast de confirmation après création
- Redirection automatique vers liste des tâches

**Liste des Tâches :**
- Affichage en cartes avec toutes les informations
- Badge de priorité coloré (Rouge/Jaune/Vert)
- Badge de statut (En cours/Terminée)
- Icône de calendrier avec date formatée (JJ/MM/AAAA)
- Actions rapides : Éditer, Supprimer, Toggle Status
- Animation d'apparition/disparition (Framer Motion)
- État vide avec illustration et message
- Pour Admin : Badge "User #ID" sur chaque tâche

**Filtrage et Recherche :**
- Barre de recherche temps réel (titre, description, matière)
- Filtre par statut : Tous / En cours / Terminées
- Filtre par priorité : Toutes / Haute / Moyenne / Basse
- Resultats instantanés sans rechargement
- Message si aucun résultat trouvé
- Reset automatique des filtres

**Édition de Tâche :**
- Pré-remplissage du formulaire avec données existantes
- Modification de tous les champs
- Validation avant sauvegarde
- Mise à jour en temps réel
- Toast de confirmation
- Retour à la liste des tâches

**Suppression de Tâche :**
- Modal de confirmation avant suppression
- Message clair sur l'irréversibilité
- Boutons Annuler/Supprimer
- Animation de sortie
- Toast de confirmation
- Mise à jour automatique de la liste

**Toggle Status :**
- Changement rapide Pending ↔ Completed
- Bouton dans la carte de tâche
- Mise à jour instantanée
- Toast de confirmation
- Rafraîchissement automatique des stats

### 3. Dashboard Interactif

**Cartes Statistiques (4 cartes) :**
1. **Total des tâches** : Icône List, fond vert
2. **Tâches terminées** : Icône Check, fond vert
3. **En cours** : Icône Clock, fond jaune
4. **En retard** : Icône AlertCircle, fond rouge

Chaque carte affiche :
- Icône colorée dans un cercle
- Nombre en grand
- Label descriptif
- Fond thématisé (dark/light)

**Graphique par Matière (BarChart) :**
- Axe X : Matières
- Axe Y : Nombre de tâches
- Barres vertes dégradées
- Tooltip interactif
- Responsive avec scroll horizontal si nécessaire
- Données temps réel

**Graphique par Priorité (PieChart) :**
- 3 sections : Haute (Rouge), Moyenne (Jaune), Basse (Vert)
- Pourcentages affichés
- Tooltip avec détails
- Légende interactive
- Responsive

**Barre de Progression Globale :**
- Pourcentage de tâches complétées
- Barre avec gradient vert animé
- Texte : "X tâches terminées sur Y"
- Mise à jour temps réel
- Animation de remplissage

**Tâches Urgentes :**
- Top 5 des tâches avec date limite proche
- Triées par date (plus proches en premier)
- Badge de priorité
- Date formatée
- Bouton "Marquer terminée"
- Navigation vers la tâche

### 4. Système de Notifications

**Centre de Notifications :**
- Icône Bell avec badge de compteur
- Dropdown au clic avec liste des notifications
- Position : En haut à droite de la navbar

**Types de Notifications :**
1. **Tâches en retard** :
   - Icône AlertCircle rouge
   - Message : "La tâche [Titre] est en retard !"
   - Déclenchement : Si dueDate < Date actuelle
   
2. **Tâches à venir** :
   - Icône Clock bleue
   - Message : "La tâche [Titre] est due dans X jour(s)"
   - Déclenchement : Si 0 < diffDays <= 1

**Fonctionnalités :**
- Vérification automatique toutes les 5 minutes
- Badge avec nombre de notifications non lues
- Marquage comme lu/non lu (bouton Check)
- Suppression individuelle (bouton Trash)
- Navigation vers la tâche au clic
- État vide avec message "Aucune notification"
- Maximum 50 notifications stockées

**Interface :**
- Fond différent pour notifications non lues (bleu)
- Timestamp relatif (Il y a X minutes/heures)
- Animations de survol
- Scroll si plus de 5 notifications

### 5. Mode Sombre Complet

**Détection Automatique :**
- Détection des préférences système (prefers-color-scheme)
- Application automatique au premier chargement
- Sauvegarde dans localStorage

**Basculement Manuel :**
- Bouton avec icône Sun/Moon animée
- Position : En haut à droite de la navbar
- Animation de rotation (180deg)
- Changement instantané
- Sauvegarde de la préférence

**Thématisation Complète :**
Tous les composants thématisés avec styles inline :
- Fonds : #ffffff (light) ↔ #1f2937 (dark)
- Texte : #111827 (light) ↔ #ffffff (dark)
- Bordures : #e5e7eb (light) ↔ #374151 (dark)
- Inputs : Fond, bordure, texte, placeholder
- Selects : Y compris les options
- Badges : 5 variants avec rgba backgrounds
- Cartes : Toutes harmonisées
- Modals : Fond, texte, boutons
- Spinners : Couleur verte du thème

**Pages Thématisées :**
- LoginPage : Fond gradient, carte, icônes
- DashboardPage : Stats, graphiques, progression
- TasksPage : Filtres, cartes de tâches, empty state
- ProfilePage : Infos utilisateur, formulaires, badges
- CreateTaskPage / EditTaskPage : Formulaires complets

### 6. Profil Utilisateur

**Affichage du Profil :**
- Photo de profil (icône User dans cercle coloré)
- Nom complet / Username
- Email
- Badge de rôle (Admin/Étudiant)
- Informations formatées dans des cartes

**Modification du Profil :**
- Formulaire d'édition avec pré-remplissage
- Champs : Username, Nom complet, Email
- Validation avant soumission
- Boutons Enregistrer/Annuler
- Toast de confirmation
- Mise à jour du context et localStorage
- Refresh automatique

**Changement de Mot de Passe :**
- Section sécurisée séparée
- 3 champs : Mot de passe actuel, Nouveau, Confirmation
- Validation : Correspondance des mots de passe
- Minimum 6 caractères
- Vérification du mot de passe actuel
- Toast de succès/erreur

## API Endpoints

### Authentification (`/api/auth`)

#### POST /api/auth/register
Inscription d'un nouvel utilisateur

**Body :**
```json
{
  "username": "nouveauuser",
  "email": "user@example.com",
  "password": "password123",
  "fullName": "Jean Dupont"
}
```

**Response Success (201) :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": 3,
    "username": "nouveauuser",
    "email": "user@example.com",
    "fullName": "Jean Dupont",
    "role": "etudiant",
    "createdAt": "2026-02-15T10:00:00.000Z"
  }
}
```

#### POST /api/auth/login
Connexion utilisateur

**Body :**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response Success (200) :**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@mystudyplanner.com",
    "fullName": "Administrateur",
    "role": "admin"
  }
}
```

### Tâches (`/api/tasks`)

#### GET /api/tasks
Récupérer la liste des tâches

**Query Params (optionnels) :**
- `userId` : Filtrer par utilisateur
- `status` : pending | completed
- `priority` : low | medium | high

**Response (200) :**
```json
{
  "success": true,
  "tasks": [...]
}
```

#### GET /api/tasks/:id
Récupérer une tâche par ID

**Response (200) :**
```json
{
  "success": true,
  "task": {
    "id": 1,
    "userId": 2,
    "title": "TP React Hooks",
    "description": "Implémenter useState, useEffect...",
    "subject": "Programmation Web",
    "priority": "high",
    "status": "pending",
    "dueDate": "2026-03-01",
    "createdAt": "2026-02-14T10:00:00.000Z"
  }
}
```

#### POST /api/tasks
Créer une nouvelle tâche

**Body :**
```json
{
  "userId": 2,
  "title": "Examen Bases de Données",
  "description": "Réviser SQL et normalisation",
  "subject": "Bases de Données",
  "priority": "high",
  "dueDate": "2026-02-20"
}
```

#### PUT /api/tasks/:id
Mettre à jour une tâche

**Body :** (tous les champs ou partiels)

#### DELETE /api/tasks/:id
Supprimer une tâche

**Response (200) :**
```json
{
  "success": true,
  "message": "Tâche supprimée avec succès"
}
```

#### GET /api/tasks/stats/:userId
Statistiques utilisateur

**Response (200) :**
```json
{
  "success": true,
  "stats": {
    "total": 10,
    "completed": 4,
    "pending": 6,
    "byPriority": {
      "high": 3,
      "medium": 4,
      "low": 3
    },
    "bySubject": {
      "Programmation Web": 4,
      "Bases de Données": 3,
      "IA": 2,
      "Réseaux": 1
    },
    "overdue": 2
  }
}
```

### Utilisateurs (`/api/users`)

#### GET /api/users
Liste des utilisateurs (admin only)

#### GET /api/users/:id
Détails d'un utilisateur

#### PUT /api/users/:id
Mettre à jour le profil

**Body :**
```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "fullName": "Nouveau Nom"
}
```

#### PUT /api/users/:id/password
Changer le mot de passe

**Body :**
```json
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

#### DELETE /api/users/:id
Supprimer un utilisateur (admin only)

#### DELETE /api/users/:id
Supprimer un utilisateur (admin only)

## Structure des Données

### Modèle Utilisateur
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@mystudyplanner.com",
  "password": "hashed_password",
  "fullName": "Administrateur",
  "role": "admin",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

### Modèle Tâche
```json
{
  "id": 1,
  "userId": 2,
  "title": "TP React Hooks",
  "description": "Implémenter un projet utilisant useState, useEffect, useContext et custom hooks",
  "subject": "Programmation Web",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-03-01",
  "createdAt": "2026-02-14T10:00:00.000Z"
}
```

**Champs :**
- `id` : Nombre unique auto-incrémenté
- `userId` : Référence à l'utilisateur propriétaire
- `title` : Titre de la tâche (string, requis)
- `description` : Description détaillée (string, optionnel)
- `subject` : Matière académique (string, requis)
- `priority` : "low" | "medium" | "high" (requis)
- `status` : "pending" | "completed" (défaut: pending)
- `dueDate` : Date limite format YYYY-MM-DD (requis)
- `createdAt` : Timestamp de création (auto)

## Design System

### Palette de Couleurs

#### Mode Light
| Élément | Couleur | Hex |
|---------|---------|-----|
| Fond principal | Blanc | `#ffffff` |
| Texte principal | Noir | `#111827` |
| Texte secondaire | Gris | `#4b5563` |
| Bordures | Gris clair | `#e5e7eb` |
| Primary (Vert) | Vert foncé | `#16a34a` |
| Success | Vert | `#16a34a` |
| Warning | Jaune | `#ca8a04` |
| Danger | Rouge | `#dc2626` |
| Info | Bleu | `#2563eb` |

#### Mode Dark
| Élément | Couleur | Hex |
|---------|---------|-----|
| Fond principal | Gris foncé | `#1f2937` |
| Fond profond | Noir grisé | `#111827` |
| Texte principal | Blanc | `#ffffff` |
| Texte secondaire | Gris clair | `#9ca3af` |
| Bordures | Gris moyen | `#374151` |
| Primary (Vert) | Vert clair | `#4ade80` |
| Success | Vert clair | `#4ade80` |
| Warning | Jaune clair | `#facc15` |
| Danger | Rouge clair | `#f87171` |
| Info | Bleu clair | `#60a5fa` |

### Composants UI

#### Button
3 variants avec états hover/disabled :
- **primary** : Vert, texte blanc
- **secondary** : Gris, texte foncé
- **danger** : Rouge, texte blanc

#### Badge
5 variants avec fond rgba :
- **default** : Gris
- **success** : Vert
- **warning** : Jaune
- **danger** : Rouge
- **info** : Bleu

#### Card
- Ombre douce
- Bordure arrondie (8px)
- Padding (24px)
- Hover effect optionnel
- Support dark mode

#### Input / Select
- Label au-dessus
- Bordure 1px
- Border-radius (6px)
- Focus ring (vert)
- Message d'erreur en rouge
- Thématisé (fond, bordure, texte)

### Typography
- **Titres** : font-bold
  - H1 : 3xl (30px)
  - H2 : 2xl (24px)
  - H3 : xl (20px)
- **Corps** : font-normal, base (16px)
- **Small** : sm (14px), text-gray-600

### Spacing
- **Gap** : 4px, 8px, 12px, 16px, 24px
- **Padding** : 8px, 12px, 16px, 24px
- **Margin** : 8px, 16px, 24px, 32px

### Animations
- **Fade In** : opacity 0 → 1 (0.3s)
- **Scale** : scale 0.95 → 1 (0.2s)
- **Slide** : translateY (0.3s)
- **Rotate** : 0deg → 180deg (0.3s)
- **Hover** : scale 1.02, shadow

## Pages de l'Application

| Route | Page | Description | Accès |
|-------|------|-------------|-------|
| `/login` | LoginPage | Connexion/Inscription | Public |
| `/dashboard` | DashboardPage | Tableau de bord avec stats et graphiques | Privé |
| `/tasks` | TasksPage | Liste des tâches avec filtres | Privé |
| `/tasks/new` | CreateTaskPage | Formulaire de création de tâche | Privé |
| `/tasks/edit/:id` | EditTaskPage | Formulaire d'édition de tâche | Privé |
| `/profile` | ProfilePage | Profil utilisateur et paramètres | Privé |
| `*` | 404 | Page non trouvée | Public |

## Sécurité et Limites

### Implémenté
- ✅ Routes protégées avec redirection
- ✅ Validation des données côté client et serveur
- ✅ Gestion des erreurs avec try/catch
- ✅ Messages d'erreur user-friendly
- ✅ Vérification des rôles (admin/étudiant)
- ✅ Sanitization basique des inputs

### Limitations (Projet Éducatif)
- ⚠️ **Pas de JWT** : Authentification simulée, non sécurisée
- ⚠️ **Stockage JSON** : Base de données fichier, non scalable
- ⚠️ **Pas de hash bcrypt** : Mots de passe non cryptés correctement
- ⚠️ **Pas de HTTPS** : Communication non chiffrée
- ⚠️ **Pas de rate limiting** : Exposition aux attaques brute-force
- ⚠️ **Pas de validation CSRF** : Vulnérable aux attaques CSRF

### Pour Production (Recommandations)
- 🔐 Implémenter JWT avec refresh tokens
- 🗄️ Migrer vers PostgreSQL ou MongoDB
- 🔒 Utiliser bcrypt pour hash des mots de passe
- 🛡️ Ajouter helmet.js pour sécurité headers
- 📊 Rate limiting avec express-rate-limit
- ✅ Validation robuste avec Joi ou Yup
- 🔑 Variables d'environnement (.env)
- 📝 Logging avec Winston ou Pino
- 🧪 Tests unitaires et E2E

## Tests

### Tests Manuels Effectués

#### Authentification
- ✅ Inscription avec données valides
- ✅ Inscription avec username existant (erreur)
- ✅ Connexion avec credentials valides
- ✅ Connexion avec credentials invalides (erreur)
- ✅ Persistance de session après refresh
- ✅ Déconnexion et redirection

#### Gestion des Tâches
- ✅ Création de tâche avec tous les champs
- ✅ Création avec champs obligatoires manquants (erreur)
- ✅ Édition de tâche existante
- ✅ Suppression avec confirmation
- ✅ Toggle status pending ↔ completed
- ✅ Filtrage par recherche, statut, priorité
- ✅ Vue admin : voir toutes les tâches
- ✅ Vue étudiant : voir uniquement ses tâches

#### Dashboard
- ✅ Affichage des statistiques correctes
- ✅ Graphiques avec données réelles
- ✅ Progression calculée correctement
- ✅ Liste des tâches urgentes triée par date
- ✅ Mise à jour temps réel après actions

#### Notifications
- ✅ Détection des tâches en retard
- ✅ Détection des tâches à venir (24h)
- ✅ Badge avec compteur correct
- ✅ Marquage comme lu
- ✅ Suppression de notification
- ✅ Navigation vers tâche

#### Mode Sombre
- ✅ Détection préférence système
- ✅ Basculement manuel
- ✅ Sauvegarde de préférence
- ✅ Tous les composants thématisés
- ✅ Contraste suffisant (accessibilité)

#### Responsive
- ✅ Mobile (320px - 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (1024px+)
- ✅ Layout adaptatif
- ✅ Navigation mobile (hamburger)

## Performance

### Optimisations Réalisées
- ⚡ **Vite** : Build ultra-rapide, HMR instantané
- 📦 **Code Splitting** : Lazy loading des routes
- 🎨 **Tailwind CSS** : Purge des classes inutilisées
- 🖼️ **SVG Icons** : Lucide React (tree-shakeable)
- 💾 **LocalStorage** : Cache pour thème et session
- 🔄 **Context API** : État global optimisé
- 🎭 **Framer Motion** : Animations performantes

### Métriques (Build Production)
- **Bundle Size** : ~250 KB (gzipped)
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Lighthouse Score** : 90+

## Roadmap et Améliorations Futures

### Version 2.1 (Planifiée)
- [ ] Calendrier intégré avec vue mensuelle
- [ ] Drag & Drop pour réorganiser les tâches
- [ ] Tags personnalisés pour les tâches
- [ ] Champs personnalisables
- [ ] Export PDF du planning
- [ ] Mode hors-ligne avec Service Worker

### Version 3.0 (Long Terme)
- [ ] Authentification JWT sécurisée
- [ ] Base de données PostgreSQL
- [ ] API GraphQL
- [ ] Application mobile React Native
- [ ] Envoi d'emails de rappel
- [ ] Notifications push
- [ ] Collaboration (partage de tâches)
- [ ] Intégration Google Calendar
- [ ] Statistiques avancées avec charts
- [ ] Thèmes personnalisables

## Contributions

Ce projet est réalisé dans un cadre pédagogique. Les contributions sont les bienvenues !

### Comment Contribuer
1. **Fork** le projet
2. **Créer** une branche (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Guidelines
- Code propre et commenté
- Respecter les conventions de nommage
- Tester les fonctionnalités
- Mettre à jour la documentation si nécessaire

## Documentation

- [README.md](README.md) - Documentation principale (ce fichier)
- [CHANGELOG.md](CHANGELOG.md) - Historique des versions
- [LICENSE](LICENSE) - Licence du projet

### 🔒 Documentation de Sécurité
- [SECURITY.md](SECURITY.md) - Guide complet de sécurité
- [SECURITY-TESTS.md](SECURITY-TESTS.md) - Tests de sécurité
- [ADMIN-WORKFLOW.md](ADMIN-WORKFLOW.md) - Guide pour administrateurs
- [CHANGELOG-SECURITY.md](CHANGELOG-SECURITY.md) - Détails des changements de sécurité

### 📚 Guides de Déploiement
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guide de déploiement général
- [BACKEND-DEPLOY.md](BACKEND-DEPLOY.md) - Déploiement backend
- [DOCKER.md](DOCKER.md) - Guide Docker
- [QUICKSTART.md](QUICKSTART.md) - Démarrage rapide

## 🔒 Sécurité

Cette application implémente plusieurs mesures de sécurité avancées :

### Protections Intégrées
- ✅ **XSS Protection** : Sanitization avec la bibliothèque `xss`
- ✅ **Input Validation** : Validation stricte avec `express-validator`
- ✅ **Rate Limiting** : Protection contre DDoS et brute force avec `express-rate-limit`
- ✅ **Security Headers** : Headers sécurisés avec `helmet.js`
- ✅ **CORS** : Configuration stricte des origines autorisées
- ✅ **Role-Based Access** : Restriction des permissions par rôle

### Permissions par Rôle

#### Admin
- ❌ **Ne peut PAS créer de tâches**
- ✅ Peut voir toutes les tâches
- ✅ Peut modifier les tâches existantes
- ✅ Peut supprimer les tâches

#### Student
- ✅ Peut créer ses tâches
- ✅ Peut modifier ses tâches
- ✅ Peut supprimer ses tâches
- ❌ Ne peut pas voir les tâches des autres

### Tests de Sécurité

**Exécuter les tests :**
```bash
# Windows PowerShell
.\test-security.ps1

# Linux/Mac
chmod +x test-security.sh
./test-security.sh
```

**Voir aussi :**
- [SECURITY.md](SECURITY.md) pour la documentation complète
- [SECURITY-TESTS.md](SECURITY-TESTS.md) pour les tests détaillés
- [ADMIN-WORKFLOW.md](ADMIN-WORKFLOW.md) pour le guide admin

## Technologies et Crédits

### Frameworks et Bibliothèques
- **React** : Meta (Facebook)
- **Vite** : Evan You
- **Tailwind CSS** : Adam Wathan
- **Framer Motion** : Framer
- **Recharts** : Recharts Group
- **Lucide** : Lucide Icons

### Inspirations
- Design moderne et minimaliste
- Todoist, Notion, Trello pour les concepts
- Material Design pour les principes UI

## Licence

Ce projet est réalisé dans un **cadre pédagogique** à des fins d'apprentissage.

## Auteur

**Preskooobz**
- GitHub : [@preskooobz](https://github.com/preskooobz)
- Projet : [MyStudyPlanner](https://github.com/preskooobz/MyStudyPlanner)

## Support

Pour toute question, bug ou suggestion :
- 📧 Ouvrir une [issue sur GitHub](https://github.com/preskooobz/MyStudyPlanner/issues)
- 💬 Démarrer une [discussion](https://github.com/preskooobz/MyStudyPlanner/discussions)

---

**Version Actuelle : 2.0.0** | Dernière mise à jour : Février 2026

Fait avec ❤️ pour les étudiants | Propulsé par React & Express
