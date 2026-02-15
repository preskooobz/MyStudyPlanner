# Tests des Nouvelles Fonctionnalités

## Test du Mode Sombre

### Étapes
1. Démarrer l'application (frontend + backend)
2. Se connecter avec admin/admin123
3. Observer le bouton soleil/lune dans le header de la sidebar

### Test 1: Détection automatique
- Ouvrir l'application en navigation privée
- Le thème doit correspondre aux préférences système
- Vérifier: Settings > Apparence dans votre OS

### Test 2: Basculement manuel
1. Cliquer sur le bouton soleil/lune
2. Vérifier le changement de thème instantané
3. Observer l'animation de rotation de l'icône
4. Toute l'interface doit changer: sidebar, contenu, cartes, graphiques

### Test 3: Persistance
1. Basculer en mode sombre
2. Rafraîchir la page (F5)
3. Le mode sombre doit rester activé
4. Fermer le navegateur et rouvrir
5. Le thème doit être conservé

### Test 4: Navigation
1. Basculer en mode sombre
2. Naviguer vers /tasks
3. Vérifier que le mode sombre est conservé
4. Naviguer vers /profile
5. Le mode sombre doit rester actif

### Vérifications visuelles
- Fond gris foncé (gray-900)
- Texte blanc lisible
- Bordures grises (gray-700)
- Cartes avec fond gray-800
- Graphiques avec couleurs adaptées
- Badges avec couleurs contrastées
- Sidebar cohérente
- Boutons hover corrects

---

## Test des Notifications

### Préparation
1. Se connecter avec etudiant/etudiant123
2. S'assurer qu'il existe:
   - Au moins 1 tâche avec date limite passée
   - Au moins 1 tâche avec date limite dans les 24h

### Création de tâches de test
```
Tâche 1 (en retard):
- Titre: Test tâche en retard
- Date limite: Hier (ex: 14/02/2026)
- Statut: En cours

Tâche 2 (à venir):
- Titre: Test tâche urgente
- Date limite: Aujourd'hui ou demain
- Statut: En cours
```

### Test 1: Génération des notifications
1. Après connexion, attendre 2-3 secondes
2. Observer l'apparition du badge rouge sur l'icône cloche
3. Le compteur doit afficher au moins 2 notifications

### Test 2: Centre de notifications
1. Cliquer sur l'icône de cloche
2. Le panneau s'ouvre avec animation
3. Vérifier la présence de 2 types de notifications:
   - Icône AlertCircle rouge pour tâches en retard
   - Icône Clock orange pour tâches à venir
4. Format de date en français (ex: "14 fév., 10:30")

### Test 3: Marquer comme lu
1. Une notification non lue a un fond bleu clair
2. Cliquer sur une notification
3 Redirection automatique vers /tasks
4. Retour au centre de notifications
5. La notification doit avoir perdu son fond bleu
6. Le compteur doit avoir diminué de 1

### Test 4: Actions
1. Tester le bouton "Marquer tout comme lu"
   - Toutes les notifications perdent leur fond bleu
   - Le compteur passe à 0
   
2. Tester la suppression individuelle (icône X)
   - La notification disparaît
   - Le compteur se met à jour

3. Tester "Tout supprimer" (icône corbeille)
   - Toutes les notifications disparaissent
   - Message "Aucune notification"
   - Compteur à 0

### Test 5: Vérification périodique
1. Laisser l'application ouverte 5 minutes
2. Créer une nouvelle tâche en retard depuis un autre onglet
3. Après maximum 5 minutes, vérifier l'apparition d'une nouvelle notification

### Test 6: Complétion de tâche
1. Noter le nombre de notifications
2. Marquer une tâche en retard comme terminée
3. Rafraîchir la page
4. La notification pour cette tâche ne doit plus apparaître

### Test 7: Mode sombre
1. Basculer en mode sombre
2. Ouvrir le centre de notifications
3. Vérifier la lisibilité:
   - Fond du panneau: gray-800
   - Texte blanc
   - Icônes visibles
   - Badges colorés contrastés

---

## Tests d'Intégration

### Test 1: Mode sombre + Notifications
1. Activer le mode sombre
2. Ouvrir les notifications
3. Toutes les animations doivent fonctionner
4. Aucun problème de contraste

### Test 2: Navigation complète
1. Se connecter
2. Basculer en mode sombre
3. Voir les notifications
4. Naviguer vers toutes les pages
5. Tout doit rester cohérent

### Test 3: Déconnexion/Reconnexion
1. Basculer en mode sombre
2. Noter les notifications présentes
3. Se déconnecter
4. Se reconnecter
5. Le mode sombre doit être conservé
6. Les notifications doivent se régénérer

### Test 4: Responsive
1. Activer le mode responsive (F12)
2. Tester sur mobile (375px)
3. Le bouton de thème doit être accessible
4. Les notifications doivent s'afficher correctement

### Test 5: Multi-utilisateurs
1. Se connecter en tant qu'admin
2. Noter les notifications (toutes les tâches)
3. Se déconnecter
4. Se connecter en tant qu'etudiant
5. Noter les notifications (que ses tâches)
6. Les compteurs doivent être différents

---

## Tests de Performance

### Test 1: Temps de chargement
1. Ouvrir DevTools (F12) > Network
2. Rafraîchir la page
3. Le temps de chargement ne doit pas excéder 2s
4. Les nouvelles fonctionnalités n'ajoutent que ~15KB

### Test 2: Mémoire
1. Ouvrir DevTools > Performance
2. Enregistrer pendant 30 secondes
3. La mémoire ne doit pas augmenter de façon anormale
4. Les notifications sont limitées à 50 max

### Test 3: Battery Performance
1. Laisser l'application ouverte 15 minutes
2. La vérification périodique (5min) ne doit pas surcharger
3. CPU doit rester bas

---

## Tests de Régression

### Vérifier que les fonctionnalités existantes marchent toujours

1. Authentification
   - Connexion/Déconnexion
   - Routes protégées

2. Dashboard
   - Statistiques correctes
   - Graphiques s'affichent
   - Cartes animées

3. CRUD Tâches
   - Créer une tâche
   - Modifier une tâche
   - Supprimer une tâche
   - Marquer terminée

4. Filtres
   - Recherche textuelle
   - Filtre par statut
   - Filtre par priorité

5. Profil
   - Modifier informations
   - Changer mot de passe

---

## Checklist Finale

Avant de valider:
[ ] Mode sombre fonctionne sur toutes les pages
[ ] Basculement thème smooth et instantané
[ ] Thème persiste après refresh
[ ] Notifications détectent les tâches en retard
[ ] Notifications détectent les tâches à venir
[ ] Badge compteur correct
[ ] Marquer comme lu fonctionne
[ ] Supprimer fonctionne
[ ] Navigation depuis notification fonctionne
[ ] Aucun bug d'affichage en mode sombre
[ ] Aucune régression sur fonctionnalités existantes
[ ] Performance acceptable
[ ] Responsive fonctionne
[ ] Compatible Chrome, Firefox, Edge

---

## Bugs Potentiels à Vérifier

1. Notification dupliquées ?
2 Compteur incorrect ?
3. Thème ne persiste pas ?
4. Contraste insuffisant en mode sombre ?
5. Notification ne se ferme pas ?
6. Badge ne se met pas à jour ?
7. Performance dégradée ?
8. Mémoire qui augmente ?

---

## Résultats Attendus

### Mode Sombre
- Basculement instantané
- Tous les composants compatibles
- Bonne lisibilité
- Couleurs harmoni Utilisateur ne perd jamais de données
- Aucune erreur console

---

## Rapport de Test

Date: __________

Testeur: __________

### Résumé
- Mode sombre: OK / KO
- Notifications: OK / KO
- Performance: OK / KO
- Régression: OK / KO

### Bugs trouvés
1. ______________________________
2. ______________________________
3. ______________________________

### Notes
_________________________________
_________________________________
_________________________________

Validation finale: OUI / NON
