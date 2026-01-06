# Variables d'Environnement

## Frontend (Variables Vite - `.env.local`)

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# URL de l'API Cloudflare Worker
# Exemple: https://unisphere-api.votre-subdomain.workers.dev
VITE_API_URL=

# Email de l'administrateur (optionnel, peut être défini dans le Worker)
VITE_ADMIN_EMAIL=

# Mot de passe admin (optionnel, peut être défini dans le Worker)
VITE_ADMIN_PASSWORD=
```

## Worker (Variables Cloudflare Dashboard)

Ces variables doivent être configurées dans le **Dashboard Cloudflare** :
**Workers & Pages** > Votre Worker > **Settings** > **Variables and Secrets**

| Variable | Description | Obligatoire | Exemple |
|----------|-------------|-------------|---------|
| `ADMIN_EMAIL` | Email de l'administrateur | Oui | `admin@unisphere.com` |
| `ADMIN_PASSWORD` | Mot de passe admin | Oui | `votre_mot_de_passe_securise` |
| `ALLOWED_ORIGINS` | Origines CORS autorisées (séparées par des virgules) | Recommandé | `https://unisphere.pages.dev,https://www.unisphere.com` |
| `GOOGLE_CLIENT_ID` | Client ID Google OAuth (pour automatisations) | Non | |
| `GOOGLE_CLIENT_SECRET` | Client Secret Google OAuth | Non | |
| `EXTERNAL_API_KEY` | Clé API externe (si nécessaire) | Non | |

## Cloudflare Pages (Variables d'environnement)

Dans le **Dashboard Cloudflare** :
**Workers & Pages** > Pages > Votre projet > **Settings** > **Environment variables**

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| `VITE_API_URL` | URL de votre Worker | Oui |
| `VITE_ADMIN_EMAIL` | (Optionnel) Email admin | Non |
| `VITE_ADMIN_PASSWORD` | (Optionnel) Mot de passe admin | Non |

**Note** : Après avoir modifié les variables d'environnement de Pages, vous devez redéployer le projet.
