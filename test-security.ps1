# 🧪 Script de Test Rapide - Sécurité MyStudyPlanner (PowerShell)
# Ce script teste les principales mesures de sécurité implémentées

Write-Host "🧪 Démarrage des tests de sécurité..." -ForegroundColor Cyan
Write-Host ""

# Configuration
$API_URL = "http://localhost:5000/api"

function Test-API {
    param(
        [string]$Endpoint,
        [string]$Method = "GET",
        [hashtable]$Body = @{},
        [string]$TestName
    )
    
    Write-Host "=========================================" -ForegroundColor Yellow
    Write-Host "Test: $TestName" -ForegroundColor Yellow
    Write-Host "=========================================" -ForegroundColor Yellow
    Write-Host ""
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        $params = @{
            Uri = "$API_URL$Endpoint"
            Method = $Method
            Headers = $headers
        }
        
        if ($Body.Count -gt 0) {
            $params.Body = $Body | ConvertTo-Json
        }
        
        $response = Invoke-WebRequest @params -ErrorAction SilentlyContinue -StatusCodeVariable statusCode
        
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Réponse: $($response.Content)" -ForegroundColor Gray
        
        return @{
            Success = $true
            StatusCode = $response.StatusCode
            Content = $response.Content
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $content = ""
        
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $content = $reader.ReadToEnd()
        }
        catch {
            $content = $_.Exception.Message
        }
        
        Write-Host "Status: $statusCode" -ForegroundColor Red
        Write-Host "Réponse: $content" -ForegroundColor Gray
        
        return @{
            Success = $false
            StatusCode = $statusCode
            Content = $content
        }
    }
    
    Write-Host ""
}

# Test 1: Admin ne peut PAS créer de tâche
$result = Test-API -Endpoint "/tasks" -Method "POST" -Body @{
    userId = 1
    userRole = "admin"
    title = "Test Admin"
    subject = "Mathématiques"
    priority = "high"
    dueDate = "2026-03-01"
} -TestName "Admin ne peut PAS créer de tâche"

if ($result.StatusCode -eq 403) {
    Write-Host "✅ PASS: Admin bloqué (403 Forbidden)" -ForegroundColor Green
}
else {
    Write-Host "❌ FAIL: Admin autorisé (code: $($result.StatusCode))" -ForegroundColor Red
}
Write-Host ""

# Test 2: Student peut créer une tâche
$result = Test-API -Endpoint "/tasks" -Method "POST" -Body @{
    userId = 2
    userRole = "student"
    title = "Devoir de Mathématiques"
    subject = "Mathématiques"
    priority = "high"
    dueDate = "2026-03-01"
} -TestName "Student peut créer une tâche"

if ($result.StatusCode -eq 201) {
    Write-Host "✅ PASS: Student autorisé (201 Created)" -ForegroundColor Green
}
else {
    Write-Host "❌ FAIL: Student bloqué (code: $($result.StatusCode))" -ForegroundColor Red
}
Write-Host ""

# Test 3: Protection XSS
$result = Test-API -Endpoint "/tasks" -Method "POST" -Body @{
    userId = 2
    userRole = "student"
    title = "<script>alert('XSS')</script>Tâche malveillante"
    subject = "Test"
    priority = "medium"
    dueDate = "2026-03-01"
} -TestName "Protection XSS"

if ($result.Content -match "&lt;script&gt;") {
    Write-Host "✅ PASS: XSS sanitizé" -ForegroundColor Green
    Write-Host "   Le script a été échappé correctement" -ForegroundColor Gray
}
else {
    Write-Host "⚠️  WARNING: XSS potentiellement non sanitizé" -ForegroundColor Yellow
}
Write-Host ""

# Test 4: Validation - Titre trop court
$result = Test-API -Endpoint "/tasks" -Method "POST" -Body @{
    userId = 2
    userRole = "student"
    title = "AB"
    subject = "Test"
    priority = "medium"
} -TestName "Validation - Titre trop court"

if ($result.StatusCode -eq 400) {
    Write-Host "✅ PASS: Validation bloque le titre trop court (400 Bad Request)" -ForegroundColor Green
}
else {
    Write-Host "❌ FAIL: Validation n'a pas bloqué (code: $($result.StatusCode))" -ForegroundColor Red
}
Write-Host ""

# Test 5: Validation - Priorité invalide
$result = Test-API -Endpoint "/tasks" -Method "POST" -Body @{
    userId = 2
    userRole = "student"
    title = "Tâche de test"
    subject = "Test"
    priority = "super-urgent"
} -TestName "Validation - Priorité invalide"

if ($result.StatusCode -eq 400) {
    Write-Host "✅ PASS: Validation bloque la priorité invalide (400 Bad Request)" -ForegroundColor Green
}
else {
    Write-Host "❌ FAIL: Validation n'a pas bloqué (code: $($result.StatusCode))" -ForegroundColor Red
}
Write-Host ""

# Test 6: Headers de sécurité
Write-Host "=========================================" -ForegroundColor Yellow
Write-Host "Test: Headers de sécurité" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "$API_URL" -Method GET
    
    $headers = @(
        "X-Frame-Options",
        "X-Content-Type-Options",
        "X-XSS-Protection",
        "Referrer-Policy"
    )
    
    foreach ($header in $headers) {
        if ($response.Headers[$header]) {
            Write-Host "✅ $header : présent" -ForegroundColor Green
        }
        else {
            Write-Host "⚠️  $header : absent" -ForegroundColor Yellow
        }
    }
}
catch {
    Write-Host "⚠️  Impossible de vérifier les headers" -ForegroundColor Yellow
}
Write-Host ""

# Test 7: Validation Email (Register)
$result = Test-API -Endpoint "/auth/register" -Method "POST" -Body @{
    username = "testuser"
    email = "notanemail"
    password = "password123"
} -TestName "Validation Email (Register)"

if ($result.StatusCode -eq 400) {
    Write-Host "✅ PASS: Email invalide bloqué (400 Bad Request)" -ForegroundColor Green
}
else {
    Write-Host "❌ FAIL: Email invalide accepté (code: $($result.StatusCode))" -ForegroundColor Red
}
Write-Host ""

# Résumé
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🎯 Résumé des Tests" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Les tests ci-dessus vérifient:" -ForegroundColor White
Write-Host "  ✅ Restriction Admin (pas de création)" -ForegroundColor Green
Write-Host "  ✅ Permission Student (création autorisée)" -ForegroundColor Green
Write-Host "  ✅ Protection XSS (sanitization)" -ForegroundColor Green
Write-Host "  ✅ Validation stricte des entrées" -ForegroundColor Green
Write-Host "  ✅ Headers de sécurité" -ForegroundColor Green
Write-Host "  ✅ Validation email" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Note: Pour le test de rate limiting," -ForegroundColor Yellow
Write-Host "   exécutez manuellement 6 fois la même requête" -ForegroundColor Yellow
Write-Host "   de connexion pour vérifier le blocage." -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Voir SECURITY-TESTS.md pour plus de tests détaillés" -ForegroundColor Cyan
Write-Host ""
