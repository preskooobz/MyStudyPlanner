# Changelog - MyStudyPlanner

## Version 2.0.0 - 15 Février 2026

### Nouvelles fonctionnalités

#### Mode Sombre/Clair
- Ajout d'un système de thèmes avec support du mode sombre
- Détection automatique des préférences système (prefers-color-scheme)
- Bouton de bascule dans le header de la sidebar
- Sauvegarde de la préférence dans localStorage
- Application du thème sur tous les composants
- Animations fluides lors du changement de thème

#### Système de Notifications
- Centre de notifications intelligent avec rappels automatiques
- Détection des tâches en retard (après date limite)
- Détection des tâches à venir (dans les 24 prochaines heures)
- Vérification automatique toutes les 5 minutes
- Badge avec compteur de notifications non lues
- Actions: marquer comme lu, supprimer, tout effacer
- Navigation vers la page des tâches au clic
- Format de date en français

#### Gestion des Cookies
- Système d'authentification basé sur les cookies
- Bannière de consentement GDPR
- Support httpOnly, secure et sameSite
- Synchronisation avec localStorage
- Endpoint de vérification de session

#### Gestion des Rôles
- Système de rôles admin/étudiant
- Administrateurs voient toutes les tâches
- Étudiants voient uniquement leurs tâches
- Badges visuels pour identifier les rôles
- Middleware de contrôle d'accès

### Améliorations

#### Interface
- Toute l'interface est compatible mode sombre
- Amélioration du contraste et de la lisibilité
- Animations plus fluides avec Framer Motion
- Meilleure organisation du header de la sidebar

#### Backend
- Ajout du middleware cookie-parser
- Configuration CORS avec credentials
- Nouveaux endpoints d'authentification
- Support des filtres par rôle

#### Frontend
- 3 nouveaux contexts (Theme, Notification, Toast)
- 2 nouveaux composants (ThemeToggle, NotificationCenter)
- Configuration Tailwind CSS avec darkMode
- Amélioration de la gestion d'état

#### Documentation
- Nettoyage de tous les emojis des fichiers markdown
- Nouveau fichier NOUVELLES_FONCTIONNALITES.md
- Mise à jour du README principal
- Ajout de ce changelog

### Corrections de bugs
- Correction des filtres par rôle
- Amélioration de la gestion des erreurs
- Meilleure synchronisation des données

### Technique
- React 19.2.0
- Tailwind CSS 3.4.1 avec dark mode
- Cookie-parser 2.0.0
- Nouveaux utilitaires pour les cookies
- Architecture plus modulaire

---

## Version 1.0.0 - 14 Février 2026

### Fonctionnalités initiales

#### Backend
- API REST avec Node.js 18+ et Express 4.18+
- 12 endpoints RESTful
- Authentification simulée
- Base de données JSON
- Middleware CORS
- Gestion des erreurs

#### Frontend
- Application React 19
- Navigation avec React Router DOM 6
- Design avec Tailwind CSS 3.4
- Animations avec Framer Motion 11
- Graphiques avec Recharts 2.12
- Icônes avec Lucide React

#### Fonctionnalités
- Authentification utilisateur
- Dashboard avec statistiques
- Gestion complète des tâches (CRUD)
- Filtres par statut, priorité, matière
- Recherche textuelle
- Graphiques interactifs (BarChart, PieChart)
- Design responsive
- Routes protégées

#### Pages
- LoginPage - Connexion
- DashboardPage - Tableau de bord
- TasksPage - Liste des tâches
- CreateTaskPage - Créer une tâche
- EditTaskPage - Modifier une tâche
- ProfilePage - Profil utilisateur
- NotFoundPage - Page 404

#### Composants
- 20+ composants réutilisables
- Layout DashboardLayout
- Composants UI (Button, Input, Card, Select, Badge)
- Composants métier (TaskCard, StatCard, SearchBar)

#### Documentation
- README.md complet
- Guide de démarrage
- Fiche technique
- Instructions de test
- Structure du projet
- Checklist de présentation

---

## Notes de Migration

### De 1.0.0 à 2.0.0

#### Base de données
Aucune migration nécessaire. La structure des données reste identique.

#### Configuration
1. Installer les nouvelles dépendances backend:
```bash
cd backend
npm install
```

2. Installer les nouvelles dépendances frontend:
```bash
cd frontend
npm install
```

3. Le fichier `tailwind.config.js` a été mis à jour avec `darkMode: 'class'`

#### Code
- Les nouveaux contexts sont automatiquement intégrés dans App.jsx
- ThemeToggle et NotificationCenter sont ajoutés au DashboardLayout
- Aucune modification nécessaire dans les composants existants
- Les cookies sont gérés automatiquement par le backend

#### Compatibilité
- Compatible avec toutes les fonctionnalités de la v1.0.0
- Aucune rupture d'API
- Migration transparente pour les utilisateurs

---

## Roadmap Future

### Version 2.1.0 (Prévu)
- Notifications push navigateur
- Son de notification
- Snooze pour reporter les rappels
- Calendrier intégré
- Export PDF du planning

### Version 3.0.0 (Prévu)
- Backend avec base de données réelle (MongoDB/PostgreSQL)
- Authentification JWT sécurisée
- API GraphQL en option
- Application mobile (React Native)
- Collaboration en temps réel
- Intégration Google Calendar

---

## Support

Pour toute question ou problème:
1. Consulter la documentation dans le dossier docs/
2. Lire les fichiers GUIDE_DEMARRAGE.md et INSTRUCTIONS_TEST.md
3. Ouvrir une issue sur le repository GitHub

---

Dernière mise à jour: 15 Février 2026
