# Guide de déploiement MyStudyPlanner

## 📦 Déploiement Vercel (Recommandé)

L'application est **100% frontend** avec stockage local (localStorage). Aucun backend n'est nécessaire pour le déploiement de base.

### ✅ Prérequis
- Compte Vercel gratuit : https://vercel.com
- Repository GitHub : https://github.com/preskooobz/MyStudyPlanner

---

## 🚀 Déploiement rapide

### **Option 1 : Via Dashboard Vercel (Plus simple)**

1. **Connecter GitHub**
   - Aller sur https://vercel.com/new
   - Cliquer "Import Git Repository"
   - Sélectionner `MyStudyPlanner`

2. **Configuration automatique**
   - Vercel détecte automatiquement `vercel.json`
   - Framework Preset: Vite
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

3. **Déployer**
   - Cliquer "Deploy"
   - Attendre 2-3 minutes
   - ✅ Votre app est en ligne !

### **Option 2 : Via CLI Vercel**

```bash
# 1. Installer Vercel CLI (une fois)
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer depuis la racine du projet
cd MyStudyPlanner
vercel

# Suivre les instructions :
# - Set up and deploy? → Yes
# - Link to existing project? → No
# - Project name? → my-study-planner
# - Directory? → ./
# - Modify settings? → No

# 4. Deploy en production
vercel --prod
```

---

## 🔧 Développement local

```bash
# Installation complète
npm run install:all

# Lancer le dev server
npm run dev
# Frontend: http://localhost:5173
# Backend (JSON-Server): http://localhost:5000

# Build de production
npm run build
```

---

## 🐳 Déploiement Docker (Optionnel)

Si vous voulez héberger avec le backend JSON-Server :

### **Local avec Docker Compose**

```bash
# Démarrer frontend + backend JSON-Server
npm run docker:up

# Arrêter
npm run docker:down

# Voir les logs
npm run docker:logs

# Rebuild complet
npm run docker:build
```

**Accès :**
- Frontend: http://localhost:80
- Backend API: http://localhost:5000

### **Production VPS (DigitalOcean, AWS, Hetzner...)**

```bash
# Sur votre serveur
git clone https://github.com/preskooobz/MyStudyPlanner.git
cd MyStudyPlanner
docker-compose up -d

# Accessible sur :
# Frontend: http://your-server-ip:80
# Backend: http://your-server-ip:5000
```

---

## 📝 Scripts NPM disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance frontend (Vite) + backend (JSON-Server) en parallèle |
| `npm run build` | Build de production du frontend |
| `npm run vercel` | Build pour Vercel (identique à build) |
| `npm run install:all` | Installe les dépendances frontend + backend |
| `npm run docker:up` | Démarre les containers Docker |
| `npm run docker:down` | Arrête les containers |
| `npm run docker:build` | Rebuild les images Docker |
| `npm run docker:logs` | Affiche les logs des containers |

---

## 🔄 Mises à jour automatiques

Chaque `git push` sur la branche `main` déclenche automatiquement :

✅ Build sur Vercel  
✅ Déploiement en production  
✅ Preview URL pour chaque commit  

---

## 🐛 Troubleshooting

### **Erreur : "Could not read package.json"**
```bash
# Vérifier que vous êtes à la racine
cd MyStudyPlanner
npm run build
```

### **Erreur : Routes ne fonctionnent pas (404)**
Le fichier `vercel.json` contient les rewrites nécessaires. Vérifier qu'il est bien présent et commité.

### **Build échoue sur Vercel**
1. Vérifier les logs dans Vercel Dashboard
2. S'assurer que `frontend/package.json` existe
3. Vérifier que `vite` est dans les devDependencies

### **localStorage vide en production**
Normal ! Les données sont stockées localement dans le navigateur. Chaque utilisateur a son propre stockage.

---

## 📊 Monitoring & Analytics

- **Vercel Analytics** : Activer dans Project Settings → Analytics
- **Logs** : Dashboard → Deployments → Cliquer sur un déploiement
- **Usage** : Dashboard → Usage (bandwidth, builds, etc.)

---

## 💰 Coûts

### **Plan Hobby Vercel (Gratuit)**
- ✅ 100 GB bandwidth/mois
- ✅ Builds illimités
- ✅ Domaine custom gratuit
- ✅ SSL automatique
- ✅ CDN mondial
- ✅ Preview deployments

### **Limites du plan gratuit**
- 100 GB bandwidth (largement suffisant pour usage personnel/étudiant)
- Pas de limites sur le nombre de visiteurs
- Renouvellement automatique chaque mois

---

## 🌐 Domaine personnalisé (Optionnel)

1. **Acheter un domaine** (Namecheap, Google Domains, etc.)
2. **Dans Vercel Dashboard** :
   - Project Settings → Domains
   - Ajouter votre domaine : `mystudyplanner.com`
3. **Configurer les DNS** :
   - Type: `A` → Value: `76.76.21.21`
   - Type: `CNAME` → Name: `www` → Value: `cname.vercel-dns.com`

SSL/HTTPS est configuré automatiquement ! 🔒

---

## 🎯 Prochaines étapes (V3.0)

Pour une version avancée avec persistance serveur :

1. **Backend réel** :
   - Remplacer JSON-Server par Express + MongoDB/PostgreSQL
   - Authentification JWT
   - API REST complète

2. **Plateforme de déploiement backend** :
   - Railway (recommandé - $5/mois)
   - Render (gratuit avec limitations)
   - Heroku (à partir de $7/mois)
   - VPS Docker (DigitalOcean Droplet à partir de $6/mois)

3. **Configuration** :
   - Créer fichier `frontend/.env.production`
   - Ajouter `VITE_API_URL=https://api.mystudyplanner.com`
   - Configurer dans Vercel → Environment Variables

---

## 📚 Documentation complète

- **Docker** : Voir [DOCKER.md](DOCKER.md)
- **Contribution** : Voir [README.md](README.md)
- **Architecture** : Full React + Vite + Tailwind + Framer Motion
- **Stockage** : localStorage (v2.0) → API Backend (v3.0 planned)

---

## 💬 Support

- **Issues GitHub** : https://github.com/preskooobz/MyStudyPlanner/issues
- **Discussions** : https://github.com/preskooobz/MyStudyPlanner/discussions
- **Email** : [Créer un issue sur GitHub]

---

## ✨ URL de déploiement

Une fois déployé, votre app sera accessible sur :

```
https://my-study-planner.vercel.app
```

ou avec votre domaine personnalisé :

```
https://mystudyplanner.com
```

🎉 **Bon déploiement !**
