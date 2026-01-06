# Script PowerShell pour builder et déployer le frontend sur Cloudflare Pages

Write-Host "🔨 Build du frontend..." -ForegroundColor Cyan
npm run build

Write-Host "🚀 Déploiement sur Cloudflare Pages..." -ForegroundColor Cyan
wrangler pages deploy dist --project-name=unisphere

Write-Host "✅ Frontend déployé avec succès!" -ForegroundColor Green
