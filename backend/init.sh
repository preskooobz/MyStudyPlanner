#!/bin/bash

# Script d'initialisation pour Render
echo "🔧 Initialisation de la base de données..."

# Créer le dossier data s'il n'existe pas
mkdir -p data

# Si db.json n'existe pas, le créer depuis db.example.json
if [ ! -f data/db.json ]; then
    echo "📝 Création de db.json depuis db.example.json..."
    cp data/db.example.json data/db.json
    echo "✅ db.json créé avec succès !"
else
    echo "✅ db.json existe déjà"
fi

echo "🚀 Démarrage du serveur..."
npm start
