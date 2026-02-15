# 🚀 Installation et Test Rapide - MyStudyPlanner

## ✅ Ce qui a été créé

Votre projet **MyStudyPlanner** est maintenant complètement configuré avec :

### 📁 Structure Professionnelle
- ✅ Backend Node.js + Express (API REST)
- ✅ Frontend React 19 + Tailwind CSS
- ✅ Architecture modulaire et scalable
- ✅ Documentation complète

### 🎨 Interface Utilisateur
- ✅ Page de connexion avec authentification
- ✅ Dashboard interactif avec statistiques
- ✅ Gestion complète des tâches (CRUD)
- ✅ Filtres et recherche avancés
- ✅ Design responsive et moderne
- ✅ Animations fluides (Framer Motion)

### 📊 Fonctionnalités
- ✅ Système d'authentification (simulé)
- ✅ Gestion des tâches par matière
- ✅ Priorités (Basse/Moyenne/Haute)
- ✅ Statuts (En cours/Terminée)
- ✅ Graphiques interactifs (Recharts)
- ✅ Statistiques en temps réel

---

## 🚀 Comment Tester Votre Projet

### Méthode 1 : Script Automatique (Windows)

Double-cliquez sur le fichier **`start.bat`** à la racine du projet.

Cela va :
1. ✅ Démarrer le backend sur http://localhost:5000
2. ✅ Démarrer le frontend sur http://localhost:3000
3. ✅ Ouvrir 2 fenêtres de terminal

### Méthode 2 : Manuelle

**Terminal 1 - Backend :**
```bash
cd c:\Users\Lenovo\Desktop\MyStudyPlanner\backend
npm start
```

**Terminal 2 - Frontend :**
```bash
cd c:\Users\Lenovo\Desktop\MyStudyPlanner\frontend
npm run dev
```

---

## 🔐 Connexion au Système

1. Ouvrez votre navigateur sur **http://localhost:3000**
2. Utilisez l'un des comptes de test :

```
👤 Compte Admin
Username: admin
Password: admin123

👤 Compte Étudiant
Username: etudiant
Password: etudiant123
```

---

## 🎯 Test Complet des Fonctionnalités

### 1️⃣ Dashboard (Page d'accueil)
✅ Vérifier les statistiques :
- Total des tâches
- Tâches terminées
- Tâches en cours
- Tâches en retard
- Barre de progression
- Graphique par matière (BarChart)
- Graphique par priorité (PieChart)
- Liste des tâches urgentes

### 2️⃣ Gestion des Tâches
✅ Aller dans "Mes Tâches" (sidebar)
✅ Voir la liste des tâches existantes
✅ Tester la recherche
✅ Tester les filtres (statut, priorité)

### 3️⃣ Créer une Tâche
✅ Cliquer sur "Nouvelle tâche"
✅ Remplir le formulaire :
- Titre : "Test TP React"
- Description : "Créer un projet React moderne"
- Matière : "Programmation Web"
- Priorité : "Haute"
- Date limite : (choisir une date)
✅ Cliquer sur "Créer la tâche"
✅ Vérifier qu'elle apparaît dans la liste

### 4️⃣ Modifier une Tâche
✅ Cliquer sur "Modifier" sur une tâche
✅ Changer les informations
✅ Enregistrer
✅ Vérifier les modifications

### 5️⃣ Marquer Terminée/En cours
✅ Cliquer sur "Marquer terminée" sur une tâche
✅ Voir le statut changer
✅ Voir la progression globale se mettre à jour

### 6️⃣ Supprimer une Tâche
✅ Cliquer sur "Supprimer"
✅ Confirmer la suppression
✅ Vérifier qu'elle disparaît

### 7️⃣ Design Responsive
✅ Redimensionner le navigateur
✅ Tester sur mobile (F12 > mode responsive)

### 8️⃣ Déconnexion
✅ Cliquer sur "Déconnexion" (sidebar en bas)
✅ Être redirigé vers la page de login

---

## 📡 Vérification de l'API

Testez l'API directement :

### 🌐 Dans votre navigateur
- http://localhost:5000/api → Message de bienvenue

### 🧪 Avec Postman/Insomnia (optionnel)

**Login :**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Liste des tâches :**
```http
GET http://localhost:5000/api/tasks?userId=1
```

---

## 🐛 Résolution de Problèmes

### ❌ Le backend ne démarre pas
**Erreur : Port déjà utilisé**
```bash
# Changer le port dans backend/.env
PORT=5001
```

**Erreur : Module non trouvé**
```bash
cd backend
npm install
```

### ❌ Le frontend ne démarre pas
**Erreur : Dependencies manquantes**
```bash
cd frontend
rm -rf node_modules
npm install
```

### ❌ Erreur de connexion à l'API
**Vérifier :**
1. Le backend est bien démarré (http://localhost:5000/api)
2. Le proxy est configuré dans `frontend/vite.config.js`
3. Les ports correspondent

### ❌ Page blanche
**Ouvrir la console du navigateur (F12)**
- Regarder les erreurs
- Vérifier que tous les fichiers sont chargés

---

## 📊 Structure des Données de Test

### Utilisateurs (dans `backend/data/db.json`)
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@mystudyplanner.com",
  "password": "admin123",
  "fullName": "Admin User"
}
```

### Tâches (exemples déjà présentes)
- TP React Hooks (Programmation Web, Haute priorité)
- Révisions Bases de Données (Moyenne priorité)
- Projet Machine Learning (Terminé)
- Rapport de stage (Basse priorité)

---

## 🎓 Démonstration pour le Jury

### Ordre de Présentation Recommandé

1. **Introduction (2 min)**
   - Présenter le contexte
   - Expliquer les objectifs

2. **Architecture (3 min)**
   - Montrer le schéma Frontend/Backend
   - Expliquer les technologies

3. **Démonstration Live (7 min)**
   - Connexion
   - Dashboard et statistiques
   - CRUD complet d'une tâche
   - Filtres et recherche
   - Responsive design

4. **Code (3 min)**
   - Montrer 2-3 fichiers clés
   - Expliquer l'architecture

5. **Conclusion (1 min)**
   - Points forts
   - Améliorations possibles

---

## 📦 Fichiers Importants à Consulter

### Documentation
- ✅ `README.md` - Documentation complète
- ✅ `FICHE_TECHNIQUE.md` - Détails techniques
- ✅ `GUIDE_DEMARRAGE.md` - Guide de démarrage
- ✅ `CHECKLIST_PRESENTATION.md` - Checklist présentation
- ✅ `STRUCTURE_PROJET.md` - Structure détaillée

### Backend
- ✅ `backend/server.js` - Point d'entrée
- ✅ `backend/controllers/taskController.js` - Logique tâches
- ✅ `backend/data/db.json` - Base de données

### Frontend
- ✅ `frontend/src/App.jsx` - Routing principal
- ✅ `frontend/src/context/AuthContext.jsx` - Authentification
- ✅ `frontend/src/pages/DashboardPage.jsx` - Dashboard
- ✅ `frontend/src/pages/TasksPage.jsx` - Gestion tâches

---

## 🎨 Captures d'Écran Recommandées

Pour votre rapport, prenez des captures de :

1. ✅ Page de connexion
2. ✅ Dashboard avec graphiques
3. ✅ Liste des tâches
4. ✅ Formulaire de création
5. ✅ Filtres en action
6. ✅ Vue mobile (responsive)

---

## ⚡ Commandes Utiles

```bash
# Réinstaller toutes les dépendances
cd backend && npm install
cd ../frontend && npm install

# Nettoyer et redémarrer
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install

# Vérifier les versions
node --version
npm --version

# Voir les logs en détail
cd backend && npm start
# (observer les messages de démarrage)
```

---

## ✅ Checklist Finale Avant Présentation

- [ ] Backend démarre sans erreur
- [ ] Frontend démarre sans erreur
- [ ] Connexion fonctionne
- [ ] Dashboard affiche les graphiques
- [ ] CRUD des tâches fonctionne
- [ ] Filtres fonctionnent
- [ ] Design responsive
- [ ] Pas d'erreurs dans la console
- [ ] Documentation à jour
- [ ] Code propre et commenté

---

## 🎯 Prochaines Étapes

1. ✅ **Tester toutes les fonctionnalités**
2. ✅ **Prendre des captures d'écran**
3. ✅ **Préparer la présentation**
4. ✅ **Réviser le code**
5. ✅ **Préparer les réponses aux questions**

---

## 📞 Besoin d'Aide ?

### Ressources
- Documentation React : https://react.dev
- Documentation Tailwind : https://tailwindcss.com
- Documentation Express : https://expressjs.com

### Commandes de Debug
```bash
# Voir les processus sur le port 5000
netstat -ano | findstr :5000

# Tuer un processus Windows
taskkill /PID <PID> /F
```

---

**Votre projet est prêt ! 🎉**

**Bonne chance pour votre présentation ! 🚀**

---

*Document créé le 14 février 2026*
