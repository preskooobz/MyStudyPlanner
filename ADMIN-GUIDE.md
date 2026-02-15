# Script pour promouvoir un utilisateur en admin

## Modifier directement dans db.json

1. Ouvrir `backend/data/db.json`
2. Trouver l'utilisateur à promouvoir
3. Changer son `"role": "student"` en `"role": "admin"`

Exemple :
```json
{
  "id": 3,
  "username": "votre_nom",
  "email": "votre@email.com",
  "password": "...",
  "fullName": "Votre Nom",
  "role": "admin",  ← Changer ici !
  "createdAt": "..."
}
```

4. Commit et push :
```bash
git add backend/data/db.json
git commit -m "feat: Promouvoir utilisateur en admin"
git push origin main
```

## Via API (route à créer)

Vous pouvez créer une route admin dans le backend :

```javascript
// backend/routes/adminRoutes.js
router.patch('/users/:id/promote', authMiddleware, adminMiddleware, async (req, res) => {
  // Promouvoir l'utilisateur en admin
  const user = await db.users.find(u => u.id === req.params.id);
  user.role = 'admin';
  await db.write();
  res.json({ success: true, user });
});
```
