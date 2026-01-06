# Script PowerShell pour déployer le Worker sur Cloudflare

Write-Host "🚀 Déploiement du Worker Cloudflare..." -ForegroundColor Cyan
Set-Location worker
npm run deploy
Set-Location ..
Write-Host "✅ Worker déployé avec succès!" -ForegroundColor Green
