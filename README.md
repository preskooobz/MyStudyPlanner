# 📚 MyStudyPlanner - Application de Gestion Académique

Application web moderne permettant aux étudiants de gérer leurs devoirs, TP et projets académiques avec un tableau de bord interactif.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Node](https://img.shields.io/badge/Node.js-18+-green.svg)

## 🎯 Objectif du Projet

Développer une application web complète de gestion académique permettant aux étudiants de :
- ✅ Organiser leurs tâches par matière
- ✅ Suivre leur progression
- ✅ Visualiser des statistiques
- ✅ Gérer les priorités et deadlines

## 🏗️ Architecture

```
mystudyplanner/
├── backend/          # API REST Node.js + Express
│   ├── controllers/  # Logique métier
│   ├── routes/       # Routes API
│   ├── models/       # Modèles de données
│   ├── middleware/   # Middleware personnalisés
│   └── data/         # Base de données JSON
│
└── frontend/         # Interface React
    ├── src/
    │   ├── api/      # Gestion des appels API
    │   ├── components/  # Composants réutilisables
    │   ├── pages/    # Pages de l'application
    │   ├── context/  # Context API (Auth)
    │   ├── layouts/  # Layouts
    │   ├── routes/   # Routes protégées
    │   └── utils/    # Fonctions utilitaires
```

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Gestion des requêtes cross-origin
- **JSON Storage** - Base de données fichier

### Frontend
- **React 19** - Framework UI moderne
- **React Router DOM** - Navigation SPA
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Recharts** - Graphiques interactifs
- **Lucide React** - Icônes modernes
- **Axios** - Client HTTP

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ installé
- npm (inclus avec Node.js)

### Installation Complète

#### 1️⃣ Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Démarrer le serveur (port 5000)
npm start
```

Le serveur API sera accessible sur `http://localhost:5000`

#### 2️⃣ Frontend

```bash
# Aller dans le dossier frontend (dans un nouveau terminal)
cd frontend

# Installer les dépendances
npm install

# Démarrer l'application (port 3000)
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📡 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

### Tâches
- `GET /api/tasks` - Liste des tâches (avec filtres)
- `GET /api/tasks/:id` - Détails d'une tâche
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Modifier une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche
- `GET /api/tasks/stats/:userId` - Statistiques utilisateur

## 👤 Comptes de Test

```
Username: admin
Password: admin123

Username: etudiant
Password: etudiant123
```

## 🎨 Fonctionnalités Principales

### 🔐 Authentification
- Connexion / Déconnexion
- Session persistante (localStorage)
- Routes protégées

### 📝 Gestion des Tâches
- Création, modification, suppression
- Statut : En cours / Terminée
- Priorité : Basse / Moyenne / Haute
- Date limite
- Organisation par matière

### 📊 Dashboard Interactif
- Statistiques globales
- Graphique par matière (BarChart)
- Répartition par priorité (PieChart)
- Tâches urgentes
- Barre de progression

### 🔍 Filtres et Recherche
- Recherche par mots-clés
- Filtrage par statut
- Filtrage par priorité
- Filtrage par matière

### 🎯 Design Moderne
- Interface responsive (Mobile/Tablet/Desktop)
- Animations fluides avec Framer Motion
- Palette de couleurs académique (vert)
- Dark patterns ready

## 📂 Structure des Données

### Tâche
```json
{
  "id": 1,
  "userId": 1,
  "title": "TP React Hooks",
  "description": "Faire un projet utilisant useState, useEffect...",
  "subject": "Programmation Web",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-03-01",
  "createdAt": "2026-02-14T10:00:00.000Z"
}
```

## 🎨 Design System

### Couleurs
- **Primary**: Vert #16a34a (académique)
- **Success**: Vert
- **Warning**: Jaune/Orange
- **Danger**: Rouge

### Composants UI
- Card - Conteneur avec ombre
- Button (primary/secondary/danger)
- Input - Champ de saisie
- Select - Liste déroulante
- Badge - Étiquette de statut
- StatCard - Carte statistique
- TaskCard - Carte de tâche

## 📱 Pages de l'Application

| Route | Description |
|-------|-------------|
| `/login` | Page de connexion |
| `/dashboard` | Tableau de bord principal |
| `/tasks` | Liste des tâches |
| `/tasks/new` | Créer une nouvelle tâche |
| `/tasks/edit/:id` | Modifier une tâche |
| `*` | Page 404 |

## 🔒 Sécurité

- Routes protégées avec PrivateRoute
- Validation des données côté serveur
- Gestion des erreurs
- Messages d'erreur clairs
- ⚠️ Note: Authentification simulée (pas de JWT en production)

## 📦 Scripts Disponibles

### Backend
```bash
npm start       # Démarrer le serveur
npm run dev     # Mode développement avec watch
```

### Frontend
```bash
npm run dev     # Serveur de développement
npm run build   # Build production
npm run preview # Prévisualiser le build
npm run lint    # Vérifier le code
```

## 🚀 Améliorations Possibles (Bonus)

- 🔔 Système de notifications
- 📅 Calendrier intégré (react-calendar)
- 🌙 Mode sombre
- 📥 Export PDF du planning
- 📌 Drag & Drop des tâches
- 📧 Envoi d'emails de rappel
- 🔐 JWT Authentication
- 📱 Application mobile (React Native)
- 🗄️ Base de données réelle (MongoDB/PostgreSQL)

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique.

## 👨‍💻 Développement

Pour contribuer au projet :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Fait avec ❤️ pour les étudiants**
