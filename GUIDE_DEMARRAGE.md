# Guide de Démarrage Rapide - MyStudyPlanner

## Installation Initiale

### 1. Backend
```bash
cd backend
npm install
```

### 2. Frontend
```bash
cd frontend
npm install
```

## Démarrage de l'Application

### Démarrage Rapide (2 terminaux)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
API démarrée sur `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Application démarrée sur `http://localhost:3000`

## Connexion

Ouvrez http://localhost:3000 dans votre navigateur

**Comptes de test:**
- Username: `admin` / Password: `admin123`
- Username: `etudiant` / Password: `etudiant123`

## Vérification

1. Backend: http://localhost:5000/api (doit retourner un message JSON)
2. Frontend: http://localhost:3000 (doit afficher la page de connexion)

## Commandes Utiles

### Backend
```bash
npm start       # Démarrer le serveur
npm run dev     # Mode dev avec auto-reload
```

### Frontend
```bash
npm run dev     # Serveur de dev
npm run build   # Build production
npm run preview # Prévisualiser le build
```

## Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 5000 est libre
- Vérifiez que Node.js est installé: `node --version`

### Le frontend ne démarre pas
- Vérifiez que les dépendances sont installées
- Supprimez `node_modules` et réinstallez: `npm install`

### Erreur de connexion à l'API
- Vérifiez que le backend est démarré
- Vérifiez l'URL de l'API dans vite.config.js

## Accès depuis un autre appareil

1. Trouvez votre IP locale: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
2. Frontend: Vite affichera automatiquement l'URL réseau
3. Backend: Remplacez localhost par votre IP dans la config

## Prochaines Étapes

1. Se connecter avec un compte de test
2. Explorer le dashboard
3. Créer votre première tâche
4. Tester les filtres et la recherche
5. Voir les statistiques en temps réel

Bon développement !
