# Guide Docker - MyStudyPlanner

Ce guide explique comment déployer MyStudyPlanner avec Docker pour éviter les problèmes de versions et faciliter le déploiement.

## Table des matières

- [Prérequis](#prérequis)
- [Architecture Docker](#architecture-docker)
- [Installation](#installation)
- [Commandes Docker](#commandes-docker)
- [Configuration](#configuration)
- [Volumes et persistance](#volumes-et-persistance)
- [Dépannage](#dépannage)
- [Production](#production)

## Prérequis

- Docker version 20.10 ou supérieure
- Docker Compose version 2.0 ou supérieure

### Installation de Docker

**Windows:**
```bash
# Télécharger Docker Desktop depuis:
https://www.docker.com/products/docker-desktop/

# Vérifier l'installation
docker --version
docker-compose --version
```

**Linux:**
```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Installer Docker Compose
sudo apt-get install docker-compose-plugin

# Vérifier l'installation
docker --version
docker compose version
```

**macOS:**
```bash
# Télécharger Docker Desktop depuis:
https://www.docker.com/products/docker-desktop/

# Ou via Homebrew
brew install --cask docker
```

## Architecture Docker

Le projet utilise une architecture multi-conteneurs :

```
┌─────────────────────────────────────┐
│         docker-compose.yml          │
└─────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼───────┐   ┌───────▼────┐
│  Backend  │   │  Frontend  │
│ (Node.js) │   │   (Nginx)  │
│   :5000   │   │    :80     │
└───────────┘   └────────────┘
     │
┌────▼──────┐
│  Volume   │
│ (db.json) │
└───────────┘
```

### Services

1. **Backend** (`mystudyplanner-backend`)
   - Image: Node.js 18 Alpine
   - Port: 5000
   - Rôle: API JSON Server
   - Persistance: Volume pour `data/db.json`

2. **Frontend** (`mystudyplanner-frontend`)
   - Image: Nginx Alpine
   - Port: 80
   - Rôle: Application React avec Nginx
   - Build: Multi-stage (Node.js → Nginx)

3. **Network** (`mystudyplanner-network`)
   - Type: Bridge
   - Communication interne entre services

4. **Volume** (`backend-data`)
   - Persistance de la base de données JSON

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/preskooobz/MyStudyPlanner.git
cd MyStudyPlanner
```

### 2. Démarrage rapide

```bash
# Construire et démarrer tous les services
docker-compose up -d

# Attendre que les services soient prêts (environ 30 secondes)
docker-compose ps
```

### 3. Accéder à l'application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **Test de santé**: 
  - Frontend: http://localhost
  - Backend: http://localhost:5000/users

### 4. Comptes de test

```
Admin:
- Username: admin
- Email: admin@mystudyplanner.com
- Password: admin123

Étudiant:
- Username: etudiant
- Email: etudiant@mystudyplanner.com
- Password: etudiant123
```

## Commandes Docker

### Gestion des conteneurs

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Redémarrer les services
docker-compose restart

# Voir les logs
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend

# Voir l'état des services
docker-compose ps

# Reconstruire les images
docker-compose build

# Reconstruire et redémarrer
docker-compose up -d --build
```

### Gestion des volumes

```bash
# Voir les volumes
docker volume ls

# Inspecter le volume des données
docker volume inspect mystudyplanner_backend-data

# Supprimer les volumes (ATTENTION: perte de données)
docker-compose down -v

# Backup du volume
docker run --rm -v mystudyplanner_backend-data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# Restaurer le volume
docker run --rm -v mystudyplanner_backend-data:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data
```

### Accès aux conteneurs

```bash
# Exécuter une commande dans un conteneur
docker-compose exec backend sh
docker-compose exec frontend sh

# Voir les fichiers du backend
docker-compose exec backend ls -la /app

# Voir les fichiers du frontend
docker-compose exec frontend ls -la /usr/share/nginx/html
```

### Nettoyage

```bash
# Arrêter et supprimer tout
docker-compose down -v --rmi all

# Nettoyer les ressources Docker inutilisées
docker system prune -a --volumes

# Supprimer uniquement les conteneurs arrêtés
docker container prune

# Supprimer les images non utilisées
docker image prune -a
```

## Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Backend
BACKEND_PORT=5000
NODE_ENV=production

# Frontend
FRONTEND_PORT=80

# Compose
COMPOSE_PROJECT_NAME=mystudyplanner
```

Utiliser dans `docker-compose.yml` :

```yaml
services:
  backend:
    ports:
      - "${BACKEND_PORT:-5000}:5000"
```

### Personnaliser les ports

```bash
# Changer le port du frontend
FRONTEND_PORT=8080 docker-compose up -d

# Changer le port du backend
BACKEND_PORT=3000 docker-compose up -d
```

### Configuration Nginx

Modifier [frontend/nginx.conf](frontend/nginx.conf) pour personnaliser :
- Cache
- Compression
- Headers de sécurité
- Redirections

## Volumes et persistance

### Location du volume

```bash
# Windows (Docker Desktop)
\\wsl$\docker-desktop-data\data\docker\volumes\mystudyplanner_backend-data

# Linux
/var/lib/docker/volumes/mystudyplanner_backend-data

# macOS
~/Library/Containers/com.docker.docker/Data/vms/0/
```

### Accéder aux données

```bash
# Copier db.json depuis le conteneur
docker-compose cp backend:/app/data/db.json ./backup-db.json

# Copier vers le conteneur
docker-compose cp ./backup-db.json backend:/app/data/db.json

# Voir le contenu de db.json
docker-compose exec backend cat /app/data/db.json
```

### Backup automatique

```bash
# Script de backup quotidien (Linux/macOS)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T backend cat /app/data/db.json > "backups/db_$DATE.json"

# Ajouter au cron (tous les jours à 2h)
0 2 * * * /path/to/backup.sh
```

## Dépannage

### Les services ne démarrent pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier l'état
docker-compose ps

# Reconstruire les images
docker-compose build --no-cache
docker-compose up -d
```

### Port déjà utilisé

```bash
# Vérifier quel processus utilise le port 80
# Windows
netstat -ano | findstr :80

# Linux/macOS
lsof -i :80

# Changer le port
docker-compose down
FRONTEND_PORT=8080 docker-compose up -d
```

### Problèmes de volume

```bash
# Supprimer et recréer les volumes
docker-compose down -v
docker volume rm mystudyplanner_backend-data
docker-compose up -d
```

### Problèmes de réseau

```bash
# Recréer le réseau
docker-compose down
docker network prune
docker-compose up -d
```

### Frontend ne se connecte pas au backend

Vérifier [frontend/src/services/api.js](frontend/src/services/api.js) :

```javascript
// En production Docker, utiliser l'URL publique
const API_BASE_URL = 'http://localhost:5000';
```

### Logs détaillés

```bash
# Activer les logs détaillés
docker-compose --verbose up

# Logs avec timestamps
docker-compose logs -f -t

# Filtrer les logs
docker-compose logs -f | grep ERROR
```

## Production

### Optimisations

1. **Multi-stage builds** : Réduire la taille des images
2. **Health checks** : Surveillance automatique
3. **Restart policy** : Redémarrage automatique
4. **Volumes nommés** : Persistance des données

### Bonnes pratiques

```bash
# Utiliser des tags de version
docker-compose build
docker tag mystudyplanner_backend:latest mystudyplanner_backend:v2.0.0
docker tag mystudyplanner_frontend:latest mystudyplanner_frontend:v2.0.0

# Limiter les ressources
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Sécurité

```bash
# Scanner les images pour les vulnérabilités
docker scan mystudyplanner_backend
docker scan mystudyplanner_frontend

# Utiliser des images officielles
FROM node:18-alpine  # ✓ Image officielle Alpine (légère et sécurisée)

# Ne pas exposer de secrets
# Utiliser Docker secrets ou variables d'environnement
```

### Déploiement

```bash
# Construire pour production
docker-compose -f docker-compose.prod.yml build

# Déployer
docker-compose -f docker-compose.prod.yml up -d

# Surveiller
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

### Monitoring avec Portainer (optionnel)

```bash
# Installer Portainer
docker volume create portainer_data
docker run -d -p 9000:9000 --name=portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce

# Accéder à Portainer
# http://localhost:9000
```

## Support

- Documentation Docker : https://docs.docker.com/
- Docker Compose : https://docs.docker.com/compose/
- Issues GitHub : https://github.com/preskooobz/MyStudyPlanner/issues

## Licence

Ce projet est sous licence MIT.
