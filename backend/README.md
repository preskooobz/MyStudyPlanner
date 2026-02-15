# MyStudyPlanner Backend API

Backend API REST pour l'application MyStudyPlanner.

## Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start

# Mode développement (avec watch)
npm run dev
```

## Endpoints API

### Authentification

#### POST /api/auth/login
Connexion utilisateur
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### POST /api/auth/register
Inscription utilisateur
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "fullName": "New User"
}
```

### Tâches

#### GET /api/tasks
Récupérer toutes les tâches
- Query params: `userId`, `status`, `priority`, `subject`

#### GET /api/tasks/:id
Récupérer une tâche par ID

#### POST /api/tasks
Créer une nouvelle tâche
```json
{
  "userId": 1,
  "title": "Nouvelle tâche",
  "description": "Description",
  "subject": "Matière",
  "priority": "high",
  "dueDate": "2026-03-01"
}
```

#### PUT /api/tasks/:id
Mettre à jour une tâche
```json
{
  "title": "Titre modifié",
  "status": "completed"
}
```

#### DELETE /api/tasks/:id
Supprimer une tâche

#### GET /api/tasks/stats/:userId
Récupérer les statistiques d'un utilisateur

## Technologies

- Node.js
- Express.js
- JSON File Storage
- CORS

## Utilisateurs de test

```
Username: admin
Password: admin123

Username: etudiant
Password: etudiant123
```
