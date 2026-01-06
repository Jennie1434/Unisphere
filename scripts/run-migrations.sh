#!/bin/bash
# Script pour appliquer toutes les migrations D1

DB_NAME="unisphere-db"
MIGRATIONS_DIR="../migrations"

echo "📦 Application des migrations D1 pour: $DB_NAME"
echo ""

# Liste des fichiers de migration dans l'ordre
for migration_file in "$MIGRATIONS_DIR"/*.sql; do
  if [ -f "$migration_file" ]; then
    filename=$(basename "$migration_file")
    echo "🔄 Application de: $filename"
    
    # Appliquer la migration en production (remote)
    npx wrangler d1 execute "$DB_NAME" --remote --file="$migration_file"
    
    if [ $? -eq 0 ]; then
      echo "✅ $filename appliquée avec succès"
    else
      echo "❌ Erreur lors de l'application de $filename"
      exit 1
    fi
    echo ""
  fi
done

echo "🎉 Toutes les migrations ont été appliquées avec succès!"
