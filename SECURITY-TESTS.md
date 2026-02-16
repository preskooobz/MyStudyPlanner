# 🧪 Tests de Sécurité - MyStudyPlanner

## Test 1 : Restriction Admin - Création de Tâches

### ❌ Test : Admin essaie de créer une tâche

**Requête :**
```bash
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "userId": 1,
  "userRole": "admin",
  "title": "Test par Admin",
  "subject": "Mathématiques",
  "priority": "high",
  "dueDate": "2026-03-01"
}
```

**Réponse Attendue :**
```json
{
  "success": false,
  "message": "Accès refusé: permissions insuffisantes"
}
```

**Status Code :** 403 Forbidden

---

### ✅ Test : Student crée une tâche

**Requête :**
```bash
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "userId": 2,
  "userRole": "student",
  "title": "Devoir de Mathématiques",
  "subject": "Mathématiques",
  "priority": "high",
  "dueDate": "2026-03-01"
}
```

**Réponse Attendue :**
```json
{
  "success": true,
  "message": "Tâche créée avec succès",
  "task": {
    "id": 1,
    "userId": 2,
    "title": "Devoir de Mathématiques",
    ...
  }
}
```

**Status Code :** 201 Created

---

## Test 2 : Protection XSS

### ❌ Test : Injection XSS dans le titre

**Requête :**
```bash
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "userId": 2,
  "userRole": "student",
  "title": "<script>alert('XSS')</script>Tâche malveillante",
  "subject": "Test",
  "priority": "medium",
  "dueDate": "2026-03-01"
}
```

**Réponse Attendue :**
Le titre sera sanitizé :
```json
{
  "success": true,
  "task": {
    "title": "&lt;script&gt;alert('XSS')&lt;/script&gt;Tâche malveillante"
  }
}
```

Le script est échappé et ne s'exécutera pas.

---

## Test 3 : Validation des Entrées

### ❌ Test : Titre trop court

**Requête :**
```bash
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "userId": 2,
  "userRole": "student",
  "title": "AB",
  "subject": "Test",
  "priority": "medium"
}
```

**Réponse Attendue :**
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

**Status Code :** 400 Bad Request

---

### ❌ Test : Priorité invalide

**Requête :**
```bash
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "userId": 2,
  "userRole": "student",
  "title": "Tâche de test",
  "subject": "Test",
  "priority": "super-urgent"
}
```

**Réponse Attendue :**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "priority",
      "message": "Priorité invalide (low, medium, high)"
    }
  ]
}
```

---

## Test 4 : Rate Limiting

### ❌ Test : Trop de tentatives de connexion

**Requêtes (6 fois en moins de 15 minutes) :**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "fakeuser",
  "password": "wrongpassword"
}
```

**Réponse après 5 tentatives :**
```json
{
  "success": false,
  "message": "Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes."
}
```

**Status Code :** 429 Too Many Requests

---

### ❌ Test : Trop de requêtes générales

Faire **plus de 100 requêtes** en 15 minutes depuis la même IP.

**Réponse après 100 requêtes :**
```json
{
  "success": false,
  "message": "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard."
}
```

**Status Code :** 429 Too Many Requests

---

## Test 5 : Headers de Sécurité

### ✅ Test : Vérifier les headers de sécurité

**Requête :**
```bash
GET http://localhost:5000/api
```

**Headers Attendus dans la Réponse :**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'
```

---

## Test 6 : Validation Authentification

### ❌ Test : Email invalide lors de l'inscription

**Requête :**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "notanemail",
  "password": "password123"
}
```

**Réponse Attendue :**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "email",
      "message": "Format d'email invalide"
    }
  ]
}
```

---

### ❌ Test : Username avec caractères invalides

**Requête :**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "test@user!",
  "email": "test@example.com",
  "password": "password123"
}
```

**Réponse Attendue :**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "username",
      "message": "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscore"
    }
  ]
}
```

---

### ❌ Test : Mot de passe trop court

**Requête :**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123"
}
```

**Réponse Attendue :**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "password",
      "message": "Le mot de passe doit contenir au moins 6 caractères"
    }
  ]
}
```

---

## Test 7 : Protection CORS

### ❌ Test : Origine non autorisée

**Requête depuis `http://malicious-site.com` :**
```bash
curl -H "Origin: http://malicious-site.com" \
     http://localhost:5000/api/tasks
```

**Réponse Attendue :**
```
Access-Control-Allow-Origin header is missing
```

Le navigateur bloquera la requête.

---

### ✅ Test : Origine autorisée

**Requête depuis `http://localhost:5173` :**
```bash
curl -H "Origin: http://localhost:5173" \
     http://localhost:5000/api/tasks
```

**Headers dans la Réponse :**
```
Access-Control-Allow-Origin: http://localhost:5173
```

---

## 🎯 Résumé des Protections

| Type d'Attaque | Protection | Status |
|----------------|-----------|--------|
| XSS (Cross-Site Scripting) | Sanitization avec `xss` | ✅ |
| SQL Injection | N/A (JSON database) | ✅ |
| Brute Force | Rate limiting strict | ✅ |
| DDoS | Rate limiting général | ✅ |
| CSRF | CORS strict | ✅ |
| Clickjacking | X-Frame-Options | ✅ |
| MIME Sniffing | X-Content-Type-Options | ✅ |
| Permission Bypass | Middleware `checkRole` | ✅ |
| Data Validation | express-validator | ✅ |
| Large Payloads | Body size limit (10MB) | ✅ |

---

## 📝 Comment Exécuter ces Tests

### Option 1 : Postman / Insomnia
1. Importer les requêtes ci-dessus
2. Tester chaque endpoint
3. Vérifier les réponses

### Option 2 : cURL
```bash
# Test création tâche (admin - devrait échouer)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "userRole": "admin",
    "title": "Test Admin",
    "subject": "Test",
    "priority": "high"
  }'

# Test création tâche (student - devrait réussir)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "userRole": "student",
    "title": "Test Student",
    "subject": "Test",
    "priority": "high"
  }'
```

### Option 3 : Tests Automatisés
Installer Jest et Supertest :
```bash
npm install --save-dev jest supertest
```

Créer des tests dans `backend/tests/security.test.js`

---

**Dernière mise à jour :** Février 2026
