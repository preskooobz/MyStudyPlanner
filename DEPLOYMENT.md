# Guide de déploiement MyStudyPlanner

## Déploiement Vercel (Frontend uniquement)

### Prérequis
- Compte Vercel (gratuit)
- Repository GitHub connecté

### Étapes de déploiement

#### 1. Installation des dépendances racine
```bash
npm install
```

#### 2. Configuration Vercel

**Option A : Via CLI**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

**Option B : Via Dashboard Vercel**
1. Aller sur https://vercel.com
2. Importer le repo GitHub
3. Configuration automatique détectée via `vercel.json`
4. Deploy !

#### 3. Configuration des variables d'environnement

Dans Vercel Dashboard → Settings → Environment Variables :

```
VITE_API_URL=https://votre-backend-url.com
```

**Important** : Le backend doit être déployé séparément (voir options ci-dessous).

### Options pour le Backend

#### Option 1 : Railway / Render (Recommandé)
```bash
# Sur Railway
railway login
railway init
railway up

# Sur Render
# Via dashboard : New → Web Service → Connecter repo
```

#### Option 2 : Vercel Serverless (API Routes)
Nécessite une restructuration du backend en API routes Vercel.

#### Option 3 : Heroku
```bash
heroku login
heroku create mystudyplanner-api
git push heroku main
```

#### Option 4 : Docker sur VPS
```bash
# Sur votre serveur
git clone https://github.com/preskooobz/MyStudyPlanner.git
cd MyStudyPlanner
docker-compose up -d
```

### Scripts disponibles

```bash
# Build frontend pour production
npm run build

# Développement local (frontend + backend)
npm run dev

# Installation complète
npm run install:all

# Docker local
npm run docker:up
npm run docker:down
npm run docker:logs
```

### Structure du déploiement

```
Frontend (Vercel)
  ↓
  Requêtes API
  ↓
Backend (Railway/Render/Heroku)
  ↓
  Données JSON-Server
```

### URLs après déploiement

- **Frontend** : `https://mystudyplanner.vercel.app`
- **Backend** : `https://mystudyplanner-api.railway.app` (exemple)

### Troubleshooting

#### Erreur : "Could not read package.json"
```bash
# S'assurer d'être à la racine du projet
cd MyStudyPlanner
npm run build
```

#### Erreur : Routes ne fonctionnent pas
Vérifier `vercel.json` - les rewrites doivent pointer vers `/index.html`

#### Erreur : API non accessible
1. Vérifier VITE_API_URL dans les env vars Vercel
2. Vérifier CORS sur le backend
3. Vérifier que le backend est en ligne

### Monitoring

- **Vercel Analytics** : Activable dans les settings
- **Logs Vercel** : Dashboard → Deployments → Logs
- **Logs Backend** : Selon la plateforme (Railway/Render/etc.)

### Mise à jour

```bash
# Push sur GitHub déclenchera automatiquement un rebuild Vercel
git add .
git commit -m "Update"
git push origin main
```

### Coûts

- **Vercel** : Gratuit (Hobby plan) - 100GB bandwidth
- **Railway** : $5/mois après 500h gratuites
- **Render** : Gratuit avec sleep après inactivité
- **Heroku** : $7/mois (Eco dynos)

## Déploiement complet avec Docker

Si vous préférez tout héberger ensemble :

```bash
# Sur VPS (DigitalOcean, AWS, etc.)
git clone https://github.com/preskooobz/MyStudyPlanner.git
cd MyStudyPlanner
docker-compose up -d

# Accessible sur :
# Frontend: http://votre-ip:80
# Backend: http://votre-ip:5000
```

## Support

Pour toute question : [GitHub Issues](https://github.com/preskooobz/MyStudyPlanner/issues)
