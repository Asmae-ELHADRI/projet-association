# Contributing

Merci de contribuer ! Voici quelques règles pour garder le projet propre et maintenable.

Workflow
- Utilisez des branches de fonctionnalité: `feat/<short-desc>`, `fix/<short-desc>`.
- Ouvrez des Pull Requests avec une description claire et tests/écrans si besoin.

Code style
- Frontend: ESLint + Prettier (respecter règles existantes ou proposer config). Soumettre PR formatée.
- Backend: PSR-12, exécuter `composer install` puis `php-cs-fixer` selon le besoin.

Tests
- Ajouter tests unitaires pour toute logique métier significative.
- CI exécute linter puis tests avant merge.

Commit
- Message de commit clair: `feat: add shopping cart service`.

Sécurité
- Ne commitez jamais de secrets ou `.env` réels. Utilisez `.env.example`.
