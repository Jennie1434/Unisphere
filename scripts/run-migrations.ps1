# Script PowerShell pour appliquer toutes les migrations D1

$DB_NAME = "unisphere-db"
$MIGRATIONS_DIR = "migrations"

Write-Host "📦 Application des migrations D1 pour: $DB_NAME" -ForegroundColor Cyan
Write-Host ""

# Récupérer tous les fichiers de migration dans l'ordre
$migrationFiles = Get-ChildItem -Path $MIGRATIONS_DIR -Filter "*.sql" | Sort-Object Name

foreach ($migrationFile in $migrationFiles) {
    $filename = $migrationFile.Name
    Write-Host "🔄 Application de: $filename" -ForegroundColor Yellow
    
    # Appliquer la migration en production (remote)
    npx wrangler d1 execute $DB_NAME --remote --file=$migrationFile.FullName
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $filename appliquée avec succès" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors de l'application de $filename" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
}

Write-Host "🎉 Toutes les migrations ont été appliquées avec succès!" -ForegroundColor Green
