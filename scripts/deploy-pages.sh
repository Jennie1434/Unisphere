#!/bin/bash
# Script pour builder et déployer le frontend sur Cloudflare Pages

echo "🔨 Build du frontend..."
npm run build

echo "🚀 Déploiement sur Cloudflare Pages..."
wrangler pages deploy dist --project-name=unisphere

echo "✅ Frontend déployé avec succès!"
