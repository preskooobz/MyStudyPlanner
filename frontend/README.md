# MyStudyPlanner Frontend

Interface React moderne pour l'application MyStudyPlanner.

## Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## Technologies

- **React 19** - Framework UI
- **React Router** - Navigation
- **Tailwind CSS** - Styling moderne
- **Framer Motion** - Animations fluides
- **Recharts** - Graphiques interactifs
- **Lucide React** - Icônes
- **Axios** - Requêtes HTTP

## Structure du projet

```
frontend/
├── src/
│   ├── api/              # Configuration API et endpoints
│   ├── components/       # Composants réutilisables
│   │   ├── ui/          # Composants UI de base
│   │   ├── tasks/       # Composants tâches
│   │   └── dashboard/   # Composants dashboard
│   ├── context/         # Context API (Auth)
│   ├── hooks/           # Custom hooks
│   ├── layouts/         # Layouts (DashboardLayout)
│   ├── pages/           # Pages de l'application
│   ├── routes/          # Configuration des routes
│   ├── utils/           # Fonctions utilitaires
│   ├── App.jsx          # Composant principal
│   └── main.jsx         # Point d'entrée
```

## Fonctionnalités

- Authentification utilisateur
- Dashboard avec statistiques
- Gestion complète des tâches (CRUD)
- Filtres et recherche
- Graphiques interactifs
- Animations fluides
- Design responsive
- Routes protégées

## Configuration

Le fichier `vite.config.js` est configuré pour proxy les requêtes API vers `http://localhost:5000`.

Assurez-vous que le backend est démarré avant de lancer le frontend.

## Pages

- `/login` - Connexion
- `/dashboard` - Tableau de bord
- `/tasks` - Liste des tâches
- `/tasks/new` - Créer une tâche
- `/tasks/edit/:id` - Modifier une tâche

## Design System

### Couleurs principales
- Primary: Vert (#16a34a)
- Success: Vert
- Warning: Jaune
- Danger: Rouge

### Composants UI
- Card
- Button (primary, secondary, danger)
- Input
- Select
- Badge
- StatCard
- TaskCard
