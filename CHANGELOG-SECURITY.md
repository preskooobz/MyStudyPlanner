# 🔄 Changelog - Mise à jour de Sécurité v2.0.0

**Date :** 16 février 2026  
**Type :** Mise à jour majeure de sécurité et gestion des permissions

---

## 🎯 Objectifs de cette mise à jour

1. ✅ Restreindre la création de tâches aux étudiants uniquement
2. ✅ Implémenter une protection complète contre les attaques XSS
3. ✅ Ajouter une validation stricte de toutes les entrées utilisateur
4. ✅ Protéger contre les attaques par force brute (brute force)
5. ✅ Ajouter des headers de sécurité (Helmet.js)
6. ✅ Implémenter le rate limiting sur toutes les routes

---

## 📦 Nouveaux Packages Installés

### Backend
```bash
npm install helmet express-validator express-rate-limit xss
```

**Dépendances ajoutées :**
- `helmet` (^7.x.x) - Headers de sécurité HTTP
- `express-validator` (^7.x.x) - Validation et sanitization des entrées
- `express-rate-limit` (^7.x.x) - Protection contre les attaques DDoS
- `xss` (^1.x.x) - Protection contre les attaques XSS

---

## 🔐 Changements de Sécurité

### 1. Nouvelle Gestion des Permissions

#### Backend
**Fichier modifié :** [backend/middleware/checkRole.js](backend/middleware/checkRole.js)

**Ajout :**
```javascript
export const isStudentOnly = checkRole('student');
```

**Impact :**
- Les admins ne peuvent plus créer de tâches
- Nouveau middleware `isStudentOnly` pour routes de création

**Fichier modifié :** [backend/routes/taskRoutes.js](backend/routes/taskRoutes.js)

**Changement :**
```javascript
// AVANT
router.post('/', validateTask, createTask);

// APRÈS
router.post('/', isStudentOnly, taskValidationRules, validateTask, createTask);
```

#### Frontend
**Fichier modifié :** [frontend/src/pages/CreateTaskPage.jsx](frontend/src/pages/CreateTaskPage.jsx)

**Ajout :**
```javascript
useEffect(() => {
  if (user && user.role === 'admin') {
    toast.error('Les administrateurs ne peuvent pas créer de tâches...');
    navigate('/tasks');
  }
}, [user, navigate, toast]);
```

**Fichier modifié :** [frontend/src/pages/TasksPage.jsx](frontend/src/pages/TasksPage.jsx)

**Changements :**
- Bouton "Nouvelle tâche" masqué pour les admins
- Message différent si aucune tâche (admin vs student)

---

### 2. Protection XSS (Cross-Site Scripting)

**Nouveau fichier :** [backend/middleware/validateTask.js](backend/middleware/validateTask.js)

**Protection ajoutée :**
```javascript
import xss from 'xss';

body('title')
  .customSanitizer(value => xss(value))
```

**Champs protégés :**
- ✅ Titre de la tâche
- ✅ Description
- ✅ Matière (subject)
- ✅ Nom d'utilisateur
- ✅ Email
- ✅ Nom complet

**Exemple :**
```javascript
// Entrée malveillante
"<script>alert('XSS')</script>Tâche"

// Sortie sanitizée
"&lt;script&gt;alert('XSS')&lt;/script&gt;Tâche"
```

---

### 3. Validation Stricte avec express-validator

**Nouveau fichier :** [backend/middleware/validateAuth.js](backend/middleware/validateAuth.js)

**Règles de validation ajoutées :**

#### Pour les tâches :
- Titre : 3-200 caractères
- Description : max 1000 caractères
- Matière : 2-100 caractères
- Priorité : uniquement 'low', 'medium', 'high'
- Date : format ISO8601

#### Pour l'authentification :
- Username : 3-50 caractères, alphanumerique + underscore uniquement
- Email : format email valide
- Mot de passe : minimum 6 caractères

**Exemple de réponse d'erreur :**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "title",
      "message": "Le titre doit contenir entre 3 et 200 caractères"
    }
  ]
}
```

---

### 4. Rate Limiting (Protection DDoS et Brute Force)

**Nouveau fichier :** [backend/middleware/security.js](backend/middleware/security.js)

**3 types de rate limiting implémentés :**

#### a) Rate Limiter Général
- 100 requêtes par 15 minutes par IP
- Appliqué sur toutes les routes

#### b) Rate Limiter Authentification (Strict)
- 5 tentatives par 15 minutes par IP
- Appliqué sur `/api/auth/*`
- Protection contre le brute force

#### c) Rate Limiter Création
- 20 créations par heure par IP
- Appliqué sur POST `/api/tasks`

**Message d'erreur :**
```json
{
  "success": false,
  "message": "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard."
}
```

---

### 5. Headers de Sécurité avec Helmet.js

**Fichier modifié :** [backend/server.js](backend/server.js)

**Headers ajoutés :**
```javascript
X-Frame-Options: DENY                    // Protection Clickjacking
X-Content-Type-Options: nosniff          // Protection MIME Sniffing
X-XSS-Protection: 1; mode=block          // Filtre XSS navigateur
Strict-Transport-Security: max-age=...   // Force HTTPS (prod)
Referrer-Policy: strict-origin-...       // Contrôle referrers
Permissions-Policy: geolocation=()...    // Restriction APIs
Content-Security-Policy: default-src...  // CSP
```

---

### 6. Limitation de la Taille des Payloads

**Fichier modifié :** [backend/server.js](backend/server.js)

**Changement :**
```javascript
// AVANT
app.use(express.json());

// APRÈS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

**Protection contre :** Attaques par surcharge de données

---

## 📂 Nouveaux Fichiers Créés

1. **[backend/middleware/security.js](backend/middleware/security.js)**
   - Configuration Helmet
   - Définition des rate limiters
   - Headers de sécurité supplémentaires

2. **[backend/middleware/validateAuth.js](backend/middleware/validateAuth.js)**
   - Validation pour login/register
   - Sanitization des champs d'authentification

3. **[SECURITY.md](SECURITY.md)**
   - Documentation complète des mesures de sécurité
   - Checklist de sécurité
   - Vulnérabilités résiduelles à corriger

4. **[SECURITY-TESTS.md](SECURITY-TESTS.md)**
   - Guide de tests de sécurité
   - Exemples de requêtes malveillantes
   - Réponses attendues

5. **[ADMIN-WORKFLOW.md](ADMIN-WORKFLOW.md)**
   - Guide complet pour les administrateurs
   - Permissions et restrictions
   - Cas d'usage typiques

---

## 🔄 Fichiers Modifiés

### Backend
1. ✅ `backend/server.js` - Ajout middlewares de sécurité
2. ✅ `backend/middleware/checkRole.js` - Nouveau middleware `isStudentOnly`
3. ✅ `backend/middleware/validateTask.js` - Validation complète avec express-validator
4. ✅ `backend/routes/taskRoutes.js` - Protection route POST
5. ✅ `backend/routes/authRoutes.js` - Validation login/register

### Frontend
1. ✅ `frontend/src/pages/CreateTaskPage.jsx` - Blocage accès admin
2. ✅ `frontend/src/pages/TasksPage.jsx` - UI adaptée pour admin

---

## 🚨 Breaking Changes

### Pour les Admins
❌ **Les administrateurs ne peuvent plus créer de tâches**

**Avant v2.0.0 :**
```
Admin → Peut créer des tâches ✅
```

**Après v2.0.0 :**
```
Admin → Ne peut PAS créer de tâches ❌
Admin → Peut seulement gérer les tâches existantes ✅
```

### Pour les Développeurs
- Toutes les routes POST `/api/tasks` nécessitent maintenant `userRole: "student"`
- Les validations sont plus strictes (voir [backend/middleware/validateTask.js](backend/middleware/validateTask.js))

---

## 📊 Résumé des Protections

| Type d'Attaque | Avant | Après | Package Utilisé |
|----------------|-------|-------|-----------------|
| XSS | ❌ | ✅ | `xss` |
| SQL Injection | N/A | ✅ | JSON database |
| Brute Force | ❌ | ✅ | `express-rate-limit` |
| DDoS | ❌ | ✅ | `express-rate-limit` |
| CSRF | ⚠️ | ✅ | CORS strict |
| Clickjacking | ❌ | ✅ | `helmet` |
| MIME Sniffing | ❌ | ✅ | `helmet` |
| Validation | ⚠️ | ✅ | `express-validator` |
| Permission Bypass | ⚠️ | ✅ | `checkRole` middleware |

---

## ⚠️ Limitations Connues

### Encore à implémenter (recommandé pour production)

1. **Hashage des mots de passe**
   ```bash
   npm install bcrypt
   ```

2. **Authentification JWT**
   ```bash
   npm install jsonwebtoken
   ```

3. **Logging de sécurité**
   ```bash
   npm install winston morgan
   ```

4. **Variables d'environnement sécurisées**
   - Utiliser `.env` pour secrets
   - Ne jamais commit les secrets dans Git

Voir [SECURITY.md](SECURITY.md) pour plus de détails.

---

## 🧪 Comment Tester

### Test 1 : Admin ne peut pas créer de tâches

```bash
# Backend - Devrait retourner 403
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"userRole": "admin", "title": "Test", "subject": "Test"}'

# Frontend - Devrait rediriger
# Se connecter en tant qu'admin et essayer d'aller sur /tasks/new
```

### Test 2 : Protection XSS

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "userRole": "student",
    "title": "<script>alert(\"XSS\")</script>Test",
    "subject": "Test"
  }'

# Le script doit être échappé dans la réponse
```

### Test 3 : Rate Limiting

```bash
# Faire 6 tentatives de connexion rapides
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username": "test", "password": "wrong"}'
done

# La 6ème devrait retourner 429
```

Voir [SECURITY-TESTS.md](SECURITY-TESTS.md) pour tous les tests.

---

## 📚 Documentation Mise à Jour

- ✅ [SECURITY.md](SECURITY.md) - Guide de sécurité complet
- ✅ [SECURITY-TESTS.md](SECURITY-TESTS.md) - Tests de sécurité
- ✅ [ADMIN-WORKFLOW.md](ADMIN-WORKFLOW.md) - Guide administrateur
- ✅ [CHANGELOG-SECURITY.md](CHANGELOG-SECURITY.md) - Ce fichier

---

## 🚀 Migration depuis v1.x.x

### Pour les utilisateurs existants
Aucune action requise. Les fonctionnalités existantes continuent de fonctionner.

### Pour les administrateurs
⚠️ **Important :** Vous ne pourrez plus créer de tâches après cette mise à jour.

### Pour les développeurs
1. Installer les nouvelles dépendances :
   ```bash
   cd backend && npm install
   ```

2. Redémarrer le serveur :
   ```bash
   npm start
   ```

3. Tester les nouvelles protections (voir [SECURITY-TESTS.md](SECURITY-TESTS.md))

---

## 🎯 Prochaines Étapes (Recommandées)

1. [ ] Implémenter le hashage des mots de passe (bcrypt)
2. [ ] Ajouter l'authentification JWT
3. [ ] Configurer les logs de sécurité (winston)
4. [ ] Ajouter des tests automatisés (Jest/Supertest)
5. [ ] Configurer un système de monitoring
6. [ ] Audit de sécurité complet avant production

---

## 📞 Support

Pour toute question ou problème :
- Consultez [SECURITY.md](SECURITY.md)
- Vérifiez les logs du serveur
- Testez avec [SECURITY-TESTS.md](SECURITY-TESTS.md)

---

**Version antérieure :** 1.0.0  
**Version actuelle :** 2.0.0  
**Date de release :** 16 février 2026
