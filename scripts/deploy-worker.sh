#!/bin/bash
# Script pour déployer le Worker sur Cloudflare

echo "🚀 Déploiement du Worker Cloudflare..."
cd worker
npm run deploy
echo "✅ Worker déployé avec succès!"
