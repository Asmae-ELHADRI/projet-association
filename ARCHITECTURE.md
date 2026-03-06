# Architecture & bonnes pratiques

But: fournir une base claire, modulaire et facile à maintenir pour le projet.

1) Séparation Frontend / Backend
- Frontend (React) : UI, routing, validation côté client, appels API.
- Backend (Laravel) : API RESTful, authentification, autorisations, envoi d'email, persistance.

2) Principes d'organisation
- Modules par domaine (artists, events, shop, admin) — chaque module contient composants, services et tests.
- Services réseau centralisés (`src/services/*`) pour encapsuler appels API et gestion d'erreurs.
- Composants UI atomiques réutilisables (`src/components/ui/*`).
- Pages dans `src/pages/*` pour les routes principales.

3) Bonnes pratiques
- Respecter l'API contract (contrats JSON) — versionner l'API si changement.
- Tests unitaires pour logique critique (backend : PHPUnit / frontend : React Testing Library).
- Linting et formatting automatique (ESLint + Prettier pour frontend, PHP-CS-Fixer pour backend).
- Feature flags / branching par fonctionnalités pour éviter régressions.

4) Extensibilité
- Ajouter de nouveaux modules en créant un dossier `modules/<name>` avec : routes, services, composants, tests.
- Prévoir adaptateurs pour ajouter un système de paiements (ex: `services/payments/stripeAdapter.js`).

5) Environnements & déploiement
- Variables d'environnement séparées pour `development` et `production`.
- Frontend: build statique servi via CDN ou serveur web (Netlify, Vercel, S3+CloudFront).
- Backend: déployable sur PaaS (Heroku, Render) ou VPS (Docker + Nginx + php-fpm).
- CI: lint -> tests -> build -> déploy (GitHub Actions exemple).

6) Surveillance & observabilité
- Logs structurés côté backend, erreurs remontées (Sentry ou équivalent).
- Santé et métriques (endpoints `/health`, export Prometheus si nécessaire).

7) Documentation
- Garder `ARCHITECTURE.md` et `README.md` à jour; ajouter API spec (OpenAPI) si possible.
