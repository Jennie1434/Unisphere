# 🚀 Guide de Déploiement - Unisphere sur Cloudflare

Ce guide vous explique comment déployer **Unisphere** sur Cloudflare avec un Worker (backend API) et Pages (frontend).

## 📋 Prérequis

- **Compte Cloudflare** (gratuit ou payant)
- **Node.js** 18+ installé
- **npm** ou **yarn**
- **Wrangler CLI** installé globalement : `npm install -g wrangler`
- **Git** installé

## 🔧 Installation Initiale

### 1. Installer les dépendances

```bash
# Installer les dépendances du frontend
npm install

# Installer les dépendances du worker
cd worker
npm install
cd ..
```

### 2. Configurer les variables d'environnement

Copiez le fichier `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Éditez `.env.local` et configurez `VITE_API_URL` avec l'URL de votre Worker (vous l'obtiendrez après le déploiement du Worker).

## 🗄️ Configuration de la Base de Données D1

### 1. Créer la base de données D1

```bash
cd worker
npx wrangler d1 create unisphere-db
```

Cette commande affichera un `database_id`. **Copiez-le**, vous en aurez besoin pour la configuration.

### 2. Mettre à jour la configuration du Worker

Éditez `worker/wrangler.toml` et remplacez le `database_id` :

```toml
[[d1_databases]]
binding = "DB"
database_name = "unisphere-db"
database_id = "VOTRE-DATABASE-ID-ICI"
```

### 3. Appliquer les migrations

Appliquez les migrations dans l'ordre pour créer les tables :

```bash
# Migration locale (pour le développement)
npx wrangler d1 execute unisphere-db --local --file=../migrations/0001_initial_schema.sql

# Migration production
npx wrangler d1 execute unisphere-db --remote --file=../migrations/0001_initial_schema.sql
```

Répétez cette commande pour toutes les migrations dans l'ordre :
- `0001_initial_schema.sql`
- `0002_seed_students.sql`
- `0003_add_action_types_and_landing.sql`
- ... (et ainsi de suite jusqu'à la dernière)

**Astuce** : Vous pouvez utiliser un script pour automatiser :

```bash
# Windows PowerShell
Get-ChildItem migrations\*.sql | Sort-Object Name | ForEach-Object { 
    npx wrangler d1 execute unisphere-db --remote --file=$_.FullName 
}
```

## 👤 Authentification Wrangler

Avant de déployer, connectez-vous à Cloudflare :

```bash
npx wrangler login
```

Cette commande ouvrira votre navigateur pour vous authentifier.

## 🔌 Déploiement du Worker (Backend API)

### 1. Naviguer vers le dossier worker

```bash
cd worker
```

### 2. Configurer les variables d'environnement du Worker

Dans le [Dashboard Cloudflare](https://dash.cloudflare.com/) :

1. Allez dans **Workers & Pages** > Votre Worker (après le premier déploiement)
2. Cliquez sur **Settings** > **Variables and Secrets**
3. Ajoutez les variables suivantes :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `ADMIN_EMAIL` | Email de l'administrateur | `admin@unisphere.com` |
| `ADMIN_PASSWORD` | Mot de passe admin (hashé) | `votre_mot_de_passe` |
| `ALLOWED_ORIGINS` | Origines CORS autorisées (séparées par des virgules) | `https://unisphere.pages.dev,https://www.unisphere.com` |
| `GOOGLE_CLIENT_ID` | (Optionnel) Client ID Google OAuth | |
| `GOOGLE_CLIENT_SECRET` | (Optionnel) Client Secret Google OAuth | |

### 3. Déployer le Worker

```bash
npx wrangler deploy
```

Après le déploiement, notez l'URL de votre Worker (ex: `https://unisphere-api.votre-subdomain.workers.dev`).

### 4. Mettre à jour l'URL de l'API dans le frontend

Éditez `.env.local` et mettez à jour `VITE_API_URL` avec l'URL de votre Worker :

```env
VITE_API_URL=https://unisphere-api.votre-subdomain.workers.dev
```

## 🎨 Déploiement du Frontend (Cloudflare Pages)

### Méthode 1 : Déploiement via CLI (Recommandé)

#### 1. Builder le frontend

```bash
# Depuis la racine du projet
npm run build
```

Cela génère le dossier `dist/` avec les fichiers statiques.

#### 2. Déployer sur Cloudflare Pages

```bash
npx wrangler pages deploy dist --project-name=unisphere
```

Si c'est la première fois, Wrangler créera le projet automatiquement.

#### 3. Configurer les variables d'environnement de Pages

Dans le [Dashboard Cloudflare](https://dash.cloudflare.com/) :

1. Allez dans **Workers & Pages** > **Pages** > Votre projet
2. Cliquez sur **Settings** > **Environment variables**
3. Ajoutez les variables nécessaires :

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | URL de votre Worker (ex: `https://unisphere-api.votre-subdomain.workers.dev`) |
| `VITE_ADMIN_EMAIL` | (Optionnel) Email admin |
| `VITE_ADMIN_PASSWORD` | (Optionnel) Mot de passe admin |

**Important** : Après avoir ajouté/modifié des variables, vous devez **redéployer** le projet pour que les changements prennent effet.

### Méthode 2 : Déploiement via GitHub (CI/CD)

1. **Connecter votre repository GitHub**

   - Dans le Dashboard Cloudflare : **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
   - Sélectionnez votre repository GitHub

2. **Configurer le build**

   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Root directory** : `/` (racine)

3. **Configurer les variables d'environnement**

   - Dans les paramètres du projet Pages, ajoutez les mêmes variables que dans la Méthode 1

4. **Déployer**

   - Chaque push sur la branche `main` déclenchera un déploiement automatique

## 🔄 Scripts de Déploiement Automatisés

### Scripts npm (Cross-platform)

Le `package.json` contient des scripts utiles :

```bash
# Déployer le worker
npm run deploy:worker

# Builder et déployer le frontend
npm run deploy:pages

# Déployer tout (worker + frontend)
npm run deploy:all
```

### Scripts PowerShell (Windows)

Des scripts PowerShell sont disponibles dans le dossier `scripts/` :

```powershell
# Déployer le worker
.\scripts\deploy-worker.ps1

# Déployer le frontend
.\scripts\deploy-pages.ps1

# Appliquer toutes les migrations
.\scripts\run-migrations.ps1
```

### Scripts Bash (Linux/Mac)

Des scripts bash sont également disponibles :

```bash
# Déployer le worker
bash scripts/deploy-worker.sh

# Déployer le frontend
bash scripts/deploy-pages.sh

# Appliquer toutes les migrations
bash scripts/run-migrations.sh
```

## 🧪 Tests Locaux

### Tester le Worker localement

```bash
cd worker
npm run dev
```

Le Worker sera accessible sur `http://localhost:8787` (par défaut).

### Tester le Frontend localement

```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000` (par défaut).

**Important** : Pour que le frontend communique avec le Worker local, mettez à jour `.env.local` :

```env
VITE_API_URL=http://localhost:8787
```

## 🔍 Vérification du Déploiement

### Vérifier le Worker

1. Testez l'endpoint de health check (si disponible) : `https://votre-worker.workers.dev/health`
2. Testez le leaderboard : `https://votre-worker.workers.dev/leaderboard`
3. Consultez les logs : `cd worker && npx wrangler tail`

### Vérifier le Frontend

1. Visitez l'URL de votre projet Pages
2. Ouvrez la console du navigateur (F12) pour vérifier les erreurs
3. Vérifiez que les appels API fonctionnent dans l'onglet Network

## 🐛 Dépannage

### Problème : Le Worker ne se déploie pas

- Vérifiez que vous êtes dans le dossier `worker/`
- Vérifiez que vous êtes connecté : `npx wrangler whoami`
- Vérifiez les logs d'erreur dans le terminal

### Problème : Erreurs CORS

- Vérifiez que `ALLOWED_ORIGINS` dans le Worker inclut l'URL de votre frontend
- Vérifiez que `VITE_API_URL` dans le frontend pointe vers la bonne URL

### Problème : Base de données vide

- Vérifiez que les migrations ont été appliquées : `npx wrangler d1 execute unisphere-db --remote --command="SELECT name FROM sqlite_master WHERE type='table';"`
- Réappliquez les migrations si nécessaire

### Problème : Authentification admin ne fonctionne pas

- Vérifiez que `ADMIN_EMAIL` et `ADMIN_PASSWORD` sont configurés dans le Worker
- Vérifiez que les cookies sont bien envoyés (vérifiez dans l'onglet Network de DevTools)

## 📚 Ressources Utiles

- [Documentation Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Documentation Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Documentation Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## 🔐 Sécurité en Production

- ✅ Utilisez des mots de passe forts pour `ADMIN_PASSWORD`
- ✅ Limitez `ALLOWED_ORIGINS` aux domaines de production uniquement
- ✅ Ne commitez jamais `.env.local` (déjà dans `.gitignore`)
- ✅ Utilisez des secrets pour les clés API (Dashboard Cloudflare > Variables and Secrets)
- ✅ Activez les logs et surveillez les erreurs régulièrement

---

**Besoin d'aide ?** Consultez les logs avec `npx wrangler tail` ou ouvrez une issue sur GitHub.
