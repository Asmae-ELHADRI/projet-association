# Déploiement rapide

Options recommandées:

- Frontend: build statique via `npm run build` puis déployer sur Vercel / Netlify / S3+CloudFront.
- Backend: utiliser Docker + Compose ou PaaS (Render, Heroku). Exemple minimal Dockerfile pour Laravel doit inclure `php-fpm`, `composer install`, migrations.

CI suggestion (GitHub Actions):
- Workflow: `push` -> `install` -> `lint` -> `test` -> `build` -> `deploy`.

Séparation des environnements:
- Stocker secrets dans le provider (GitHub Secrets, Render env vars, Vercel env vars).
