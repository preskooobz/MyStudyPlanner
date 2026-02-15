# 🚀 Déploiement Backend Express

## Option 1 : Railway (Recommandé - Gratuit)

### Étapes de déploiement

#### 1. Créer un compte Railway
- Aller sur https://railway.app
- Se connecter avec GitHub

#### 2. Créer un nouveau projet
```bash
# Via CLI (recommandé)
npm i -g @railway/cli
railway login
railway init
railway up
```

**OU via Dashboard :**
1. Cliquer "New Project"
2. Sélectionner "Deploy from GitHub repo"
3. Choisir `MyStudyPlanner`
4. Railway détecte automatiquement le backend

#### 3. Configuration Railway

**Variables d'environnement** (dans Railway Dashboard) :
```
NODE_ENV=production
PORT=5000
```

**Railway génère automatiquement une URL** :
```
https://mystudyplanner-production.up.railway.app
```

#### 4. Configuration du backend

Le fichier `backend/server.js` doit être mis à jour pour les CORS :

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mystudyplanner.vercel.app'
  ],
  credentials: true
}));
```

---

## Option 2 : Render (Gratuit avec limitations)

### Caractéristiques
- ✅ Gratuit
- ⚠️ Sleep après 15 min d'inactivité
- ⚠️ Redémarrage ~30 secondes

### Déploiement
1. Aller sur https://render.com
2. New → Web Service
3. Connecter le repo GitHub
4. Configuration :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Environment** : Node

---

## Option 3 : Heroku ($7/mois)

```bash
# Installer Heroku CLI
npm install -g heroku

# Déployer
heroku login
heroku create mystudyplanner-api
git subtree push --prefix backend heroku main
```

---

## Option 4 : Vercel Serverless (Complexe)

⚠️ Nécessite une restructuration complète du backend en serverless functions.

**Pas recommandé** pour ce projet car Express fonctionne mieux sur Railway/Render.

---

## 📝 Après le déploiement Backend

### 1. Récupérer l'URL de votre backend
Exemple : `https://mystudyplanner-production.up.railway.app`

### 2. Configurer le frontend

**Dans Vercel Dashboard** → Settings → Environment Variables :
```
VITE_API_URL=https://mystudyplanner-production.up.railway.app/api
```

### 3. Redéployer le frontend
```bash
vercel --prod
```

---

## 🔄 Workflow complet

```
1. Backend sur Railway → URL générée
2. Ajouter l'URL dans les variables Vercel
3. Mettre à jour les CORS backend
4. Redéployer frontend sur Vercel
5. ✅ Application fonctionnelle !
```

---

## 💰 Comparaison des coûts

| Service | Prix | Avantages | Inconvénients |
|---------|------|-----------|---------------|
| **Railway** | Gratuit (500h/mois) | Simple, rapide, pas de sleep | Limite 500h |
| **Render** | Gratuit | Gratuit illimité | Sleep après inactivité |
| **Heroku** | $7/mois | Fiable, toujours actif | Payant |
| **Docker VPS** | $6/mois | Contrôle total | Gestion serveur |

---

## 🎯 Commande rapide Railway

```bash
# Installation et déploiement en 3 commandes
npm i -g @railway/cli
railway login
cd backend && railway init && railway up
```

**Temps total : 2-3 minutes** ⚡
