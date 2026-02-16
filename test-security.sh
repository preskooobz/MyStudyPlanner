#!/bin/bash

# 🧪 Script de Test Rapide - Sécurité MyStudyPlanner
# Ce script teste les principales mesures de sécurité implémentées

echo "🧪 Démarrage des tests de sécurité..."
echo ""

# Configuration
API_URL="http://localhost:5000/api"
HEADER="Content-Type: application/json"

echo "========================================="
echo "Test 1: Admin ne peut PAS créer de tâche"
echo "========================================="
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/tasks" \
  -H "$HEADER" \
  -d '{
    "userId": 1,
    "userRole": "admin",
    "title": "Test Admin",
    "subject": "Mathématiques",
    "priority": "high",
    "dueDate": "2026-03-01"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "403" ]; then
  echo "✅ PASS: Admin bloqué (403 Forbidden)"
  echo "   Réponse: $body"
else
  echo "❌ FAIL: Admin autorisé (code: $http_code)"
  echo "   Réponse: $body"
fi

echo ""
echo "========================================="
echo "Test 2: Student peut créer une tâche"
echo "========================================="
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/tasks" \
  -H "$HEADER" \
  -d '{
    "userId": 2,
    "userRole": "student",
    "title": "Devoir de Mathématiques",
    "subject": "Mathématiques",
    "priority": "high",
    "dueDate": "2026-03-01"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "201" ]; then
  echo "✅ PASS: Student autorisé (201 Created)"
  echo "   Réponse: $body"
else
  echo "❌ FAIL: Student bloqué (code: $http_code)"
  echo "   Réponse: $body"
fi

echo ""
echo "========================================="
echo "Test 3: Protection XSS"
echo "========================================="
echo ""

response=$(curl -s -X POST "$API_URL/tasks" \
  -H "$HEADER" \
  -d '{
    "userId": 2,
    "userRole": "student",
    "title": "<script>alert(\"XSS\")</script>Tâche malveillante",
    "subject": "Test",
    "priority": "medium",
    "dueDate": "2026-03-01"
  }')

if echo "$response" | grep -q "&lt;script&gt;"; then
  echo "✅ PASS: XSS sanitizé"
  echo "   Le script a été échappé correctement"
else
  echo "⚠️  WARNING: XSS potentiellement non sanitizé"
  echo "   Réponse: $response"
fi

echo ""
echo "========================================="
echo "Test 4: Validation - Titre trop court"
echo "========================================="
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/tasks" \
  -H "$HEADER" \
  -d '{
    "userId": 2,
    "userRole": "student",
    "title": "AB",
    "subject": "Test",
    "priority": "medium"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "400" ]; then
  echo "✅ PASS: Validation bloque le titre trop court (400 Bad Request)"
  echo "   Réponse: $body"
else
  echo "❌ FAIL: Validation n'a pas bloqué (code: $http_code)"
  echo "   Réponse: $body"
fi

echo ""
echo "========================================="
echo "Test 5: Validation - Priorité invalide"
echo "========================================="
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/tasks" \
  -H "$HEADER" \
  -d '{
    "userId": 2,
    "userRole": "student",
    "title": "Tâche de test",
    "subject": "Test",
    "priority": "super-urgent"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "400" ]; then
  echo "✅ PASS: Validation bloque la priorité invalide (400 Bad Request)"
  echo "   Réponse: $body"
else
  echo "❌ FAIL: Validation n'a pas bloqué (code: $http_code)"
  echo "   Réponse: $body"
fi

echo ""
echo "========================================="
echo "Test 6: Headers de sécurité"
echo "========================================="
echo ""

headers=$(curl -s -I "$API_URL")

check_header() {
  header_name=$1
  if echo "$headers" | grep -iq "$header_name"; then
    echo "✅ $header_name: présent"
  else
    echo "⚠️  $header_name: absent"
  fi
}

check_header "X-Frame-Options"
check_header "X-Content-Type-Options"
check_header "X-XSS-Protection"
check_header "Referrer-Policy"

echo ""
echo "========================================="
echo "Test 7: Validation Email (Register)"
echo "========================================="
echo ""

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/auth/register" \
  -H "$HEADER" \
  -d '{
    "username": "testuser",
    "email": "notanemail",
    "password": "password123"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$http_code" = "400" ]; then
  echo "✅ PASS: Email invalide bloqué (400 Bad Request)"
  echo "   Réponse: $body"
else
  echo "❌ FAIL: Email invalide accepté (code: $http_code)"
  echo "   Réponse: $body"
fi

echo ""
echo "========================================="
echo "🎯 Résumé des Tests"
echo "========================================="
echo ""
echo "Les tests ci-dessus vérifient:"
echo "  ✅ Restriction Admin (pas de création)"
echo "  ✅ Permission Student (création autorisée)"
echo "  ✅ Protection XSS (sanitization)"
echo "  ✅ Validation stricte des entrées"
echo "  ✅ Headers de sécurité"
echo "  ✅ Validation email"
echo ""
echo "⚠️  Note: Pour le test de rate limiting (Test 8),"
echo "   exécutez manuellement 6 fois la même requête"
echo "   de connexion pour vérifier le blocage."
echo ""
echo "📚 Voir SECURITY-TESTS.md pour plus de tests détaillés"
echo ""
