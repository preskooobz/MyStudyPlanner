# 👨‍💼 Guide pour les Administrateurs - MyStudyPlanner

## 📋 Vue d'ensemble du rôle Admin

En tant qu'**administrateur**, votre rôle est de **gérer et superviser** les tâches créées par les étudiants. Vous **NE POUVEZ PAS créer** de nouvelles tâches, car cette action est réservée uniquement aux étudiants.

---

## ✅ Permissions de l'Administrateur

### Ce que vous POUVEZ faire :

1. **📊 Voir toutes les tâches**
   - Accédez à la page "Mes Tâches" (`/tasks`)
   - Vous verrez toutes les tâches de tous les étudiants
   - Badge "Vue Admin" visible en haut de la page

2. **✏️ Modifier les tâches des étudiants**
   - Cliquez sur le bouton "Modifier" (icône crayon) sur n'importe quelle tâche
   - Vous pouvez changer : titre, description, matière, priorité, date, statut

3. **🗑️ Supprimer les tâches**
   - Cliquez sur le bouton "Supprimer" (icône poubelle)
   - Utile pour supprimer les tâches obsolètes ou incorrectes

4. **🔄 Changer le statut des tâches**
   - Marquer une tâche comme "Terminée" ou "En cours"
   - Bouton "Marquer terminée" / "Marquer en cours"

5. **🔍 Filtrer et rechercher**
   - Utilisez les filtres par statut, priorité
   - Recherche par mots-clés dans le titre, description, ou matière

6. **📈 Consulter les statistiques**
   - Accédez au tableau de bord (`/dashboard`)
   - Visualisez les statistiques globales de tous les étudiants

### Ce que vous NE POUVEZ PAS faire :

❌ **Créer de nouvelles tâches**
- Le bouton "Nouvelle tâche" n'est pas visible pour vous
- Si vous essayez d'accéder directement à `/tasks/new`, vous serez redirigé avec un message d'erreur
- Si vous essayez de créer via l'API, vous recevrez une erreur 403 Forbidden

**Raison :** Les tâches doivent être créées par les étudiants eux-mêmes pour assurer la responsabilité personnelle et l'autonomie.

---

## 🖥️ Interface Utilisateur Admin

### Page "Toutes les Tâches"

Quand vous êtes connecté en tant qu'admin, vous verrez :

```
┌─────────────────────────────────────────────────┐
│  Toutes les Tâches  [Vue Admin]                │
│  Gérez toutes les tâches des étudiants         │
│                                                 │
│  [Filtres: Statut, Priorité, Recherche...]    │
│                                                 │
│  ┌───────────────────────────────────────┐    │
│  │ 📝 Devoir de Mathématiques             │    │
│  │ 👤 Jean Dupont                         │    │
│  │ Matière: Mathématiques | Haute         │    │
│  │ [Marquer terminée] [Modifier] [Suppr] │    │
│  └───────────────────────────────────────┘    │
│                                                 │
│  ┌───────────────────────────────────────┐    │
│  │ 📝 TP de Physique                      │    │
│  │ 👤 Marie Martin                        │    │
│  │ Matière: Physique | Moyenne            │    │
│  │ [Marquer terminée] [Modifier] [Suppr] │    │
│  └───────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Notez l'absence du bouton "Nouvelle tâche" en haut à droite**

---

## 🔐 Sécurité

### Protection Backend

Si vous tentez de créer une tâche via l'API :

**Requête :**
```bash
POST /api/tasks
Content-Type: application/json

{
  "userRole": "admin",
  "title": "Test",
  "subject": "Test",
  "priority": "high"
}
```

**Réponse :**
```json
{
  "success": false,
  "message": "Accès refusé: permissions insuffisantes"
}
```

**Code HTTP :** 403 Forbidden

---

### Protection Frontend

Si vous tentez d'accéder directement à la page de création :

```
URL: http://localhost:5173/tasks/new
```

**Comportement :**
1. Redirection automatique vers `/tasks`
2. Message d'erreur toast :
   > "Les administrateurs ne peuvent pas créer de tâches. Vous gérez uniquement les tâches des étudiants."

---

## 📊 Cas d'Usage Typiques

### 1. Vérifier les tâches d'un étudiant spécifique

1. Allez sur `/tasks`
2. Utilisez le champ de recherche pour filtrer par nom d'étudiant
3. Consultez toutes les tâches de cet étudiant

### 2. Marquer une tâche comme terminée

**Cas :** Un étudiant a oublié de marquer sa tâche comme terminée

1. Trouvez la tâche sur `/tasks`
2. Cliquez sur "Marquer terminée"
3. La tâche change de statut immédiatement

### 3. Corriger une erreur dans une tâche

**Cas :** Un étudiant a fait une faute de frappe dans le titre

1. Trouvez la tâche concernée
2. Cliquez sur le bouton "Modifier" (icône crayon)
3. Corrigez les informations
4. Cliquez sur "Enregistrer les modifications"

### 4. Supprimer une tâche dupliquée

**Cas :** Un étudiant a créé deux fois la même tâche

1. Identifiez la tâche en double
2. Cliquez sur le bouton "Supprimer" (icône poubelle)
3. Confirmez la suppression dans la modal

### 5. Voir les statistiques globales

1. Allez sur `/dashboard`
2. Consultez :
   - Nombre total de tâches
   - Tâches terminées vs en cours
   - Répartition par priorité
   - Répartition par matière

---

## 🚨 Messages d'Erreur Possibles

### "Accès refusé: permissions insuffisantes"
**Cause :** Vous essayez de créer une tâche (action réservée aux étudiants)  
**Solution :** N'utilisez que les actions de modification et suppression

### "Tâche non trouvée"
**Cause :** La tâche a peut-être été supprimée entre-temps  
**Solution :** Rafraîchissez la page

### "Trop de requêtes"
**Cause :** Vous avez effectué trop d'actions rapidement (rate limiting)  
**Solution :** Attendez 15 minutes avant de réessayer

---

## 🔍 Différences Admin vs Student

| Action | Admin | Student |
|--------|-------|---------|
| Créer une tâche | ❌ Non | ✅ Oui |
| Voir toutes les tâches | ✅ Oui (tous étudiants) | ❌ Non (seulement les siennes) |
| Modifier n'importe quelle tâche | ✅ Oui | ❌ Non (seulement les siennes) |
| Supprimer n'importe quelle tâche | ✅ Oui | ❌ Non (seulement les siennes) |
| Voir les statistiques globales | ✅ Oui | ❌ Non (seulement les siennes) |
| Changer le statut | ✅ Oui (toutes) | ✅ Oui (seulement les siennes) |

---

## 💡 Bonnes Pratiques

### ✅ À FAIRE

1. **Superviser régulièrement** les tâches des étudiants
2. **Corriger les erreurs** lorsque vous les détectez
3. **Supprimer les doublons** ou tâches obsolètes
4. **Utiliser les filtres** pour une meilleure organisation
5. **Consulter le dashboard** pour un aperçu global

### ❌ À ÉVITER

1. Ne pas tenter de créer des tâches (vous ne pouvez pas)
2. Ne pas modifier les tâches sans raison valable
3. Ne pas supprimer les tâches légitimes des étudiants
4. Ne pas effectuer trop d'actions trop rapidement (rate limiting)

---

## 📞 Support

Si vous rencontrez un problème ou avez besoin d'aide :

1. Consultez [SECURITY.md](./SECURITY.md) pour les détails techniques
2. Consultez [SECURITY-TESTS.md](./SECURITY-TESTS.md) pour les tests
3. Vérifiez les logs du serveur backend
4. Contactez le support technique

---

## 🔄 Workflow Recommandé

```
┌─────────────────────────────────────────┐
│  1. Connexion en tant qu'Admin          │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  2. Accéder au Dashboard                │
│     → Voir les statistiques globales    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  3. Aller sur "Toutes les Tâches"      │
│     → Voir toutes les tâches étudiants │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  4. Filtrer par statut/priorité         │
│     → Identifier les tâches à traiter   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  5. Modifier/Supprimer si nécessaire    │
│     → Gérer les tâches problématiques   │
└─────────────────────────────────────────┘
```

---

**Version :** 2.0.0  
**Dernière mise à jour :** Février 2026
