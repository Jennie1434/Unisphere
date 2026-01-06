# 🚀 Démarrage Rapide - Déploiement Cloudflare

Guide rapide pour déployer Unisphere en production sur Cloudflare.

## 📦 Étape 1 : Installation

```bash
# Installer les dépendances
npm install
cd worker && npm install && cd ..
```

## 🔐 Étape 2 : Authentification Cloudflare

```bash
npx wrangler login
```

## 🗄️ Étape 3 : Créer la Base de Données D1

```bash
cd worker
npx wrangler d1 create unisphere-db
# Copiez le database_id affiché
cd ..
```

Éditez `worker/wrangler.toml` et remplacez `database_id` par celui que vous venez de copier.

## 📝 Étape 4 : Appliquer les Migrations

```powershell
# Windows PowerShell
.\scripts\run-migrations.ps1
```

```bash
# Linux/Mac
bash scripts/run-migrations.sh
```

## 🔌 Étape 5 : Déployer le Worker (Backend)

```bash
npm run deploy:worker
```

**Notez l'URL du Worker** (ex: `https://unisphere-api.xxx.workers.dev`)

### Configurer les variables d'environnement du Worker

Dans le [Dashboard Cloudflare](https://dash.cloudflare.com/) :
1. **Workers & Pages** > Votre Worker > **Settings** > **Variables and Secrets**
2. Ajoutez :
   - `ADMIN_EMAIL` : votre email admin
   - `ADMIN_PASSWORD` : votre mot de passe admin
   - `ALLOWED_ORIGINS` : URL de votre frontend (optionnel)

## 🎨 Étape 6 : Configurer le Frontend

Créez `.env.local` à la racine :

```env
VITE_API_URL=https://votre-worker.workers.dev
```

## 🌐 Étape 7 : Déployer le Frontend (Pages)

```bash
npm run deploy:pages
```

### Configurer les variables d'environnement de Pages

Dans le [Dashboard Cloudflare](https://dash.cloudflare.com/) :
1. **Workers & Pages** > **Pages** > Votre projet > **Settings** > **Environment variables**
2. Ajoutez `VITE_API_URL` avec l'URL de votre Worker
3. **Redéployez** le projet pour appliquer les changements

## ✅ Vérification

1. Visitez l'URL de votre projet Pages
2. Testez la connexion admin
3. Vérifiez les logs : `cd worker && npm run tail`

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** : Guide complet de déploiement
- **[ENV-VARIABLES.md](./ENV-VARIABLES.md)** : Documentation des variables d'environnement

---

**Besoin d'aide ?** Consultez la section Dépannage dans [DEPLOYMENT.md](./DEPLOYMENT.md)
