# Projet Association — Monorepo

Ce dépôt contient le frontend et le backend de l'application de l'association.

Structure principale
- `frontend/` — application React (Create React App) — code UI, assets, build scripts.
- `backend/` — API Laravel — logique métier, authentification, base de données, envoi d'emails.

Objectifs
- Séparer clairement le frontend et le backend pour faciliter le développement et le déploiement.
- Fournir une architecture modulaire, testable et documentée.

Commandes rapides
- Démarrer le frontend:

```bash
cd front-end
npm install
npm start
```

- Démarrer le backend (local, Laravel):

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Environnements
- Utilisez les fichiers `.env` locaux pour configurer l'API et les secrets. Le frontend lit `REACT_APP_API_URL`.

Documentation
- Voir `ARCHITECTURE.md` pour la vision technique, modules et bonnes pratiques.
- Voir `CONTRIBUTING.md` pour les règles de contribution, formatage et CI.
