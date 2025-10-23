# Atelier Spring Boot & React – Gestion de Voitures

Ce dépôt regroupe le projet complet du TP :
- **backend** Spring Boot (API REST + sécurité Basic + H2 en mémoire)
- **frontend** React Bootstrap (SPA permettant d'ajouter, lister et supprimer des voitures)

## Prérequis
- Java 17+
- Node.js 16+ avec npm
- Accès internet lors du premier lancement (pour télécharger les dépendances Maven/NPM)

## Démarrage rapide

### 1. Lancer le backend
```bash
cd backend
./mvnw spring-boot:run    # sous Windows : mvnw.cmd spring-boot:run
```

Le serveur démarre sur [http://localhost:8080](http://localhost:8080) avec un utilisateur par défaut :
- utilisateur : `user`
- mot de passe : `password`

L'H2 console est disponible sur [http://localhost:8080/h2-console](http://localhost:8080/h2-console).

### 2. Lancer le frontend
Dans un autre terminal :
```bash
cd frontend
cp .env.example .env    # personnalisez l'URL ou les identifiants si nécessaire
npm install
npm start
```

L'interface s'ouvre sur [http://localhost:3000](http://localhost:3000) et communique automatiquement avec l'API sécurisée.

## Tests
- Backend : `cd backend && ./mvnw test`
- Frontend : `cd frontend && npm test`

## Déploiement sur GitHub
Utilisez le script fourni :
```bash
./push_to_github.sh <github-user>/<repo> "Votre message de commit" main
```
Assurez-vous d'avoir configuré vos clés SSH ou jetons d'accès GitHub au préalable.

## Structure du dépôt
```
TP_FULL_FINAL/
├── backend/        # Application Spring Boot
├── frontend/       # Application React
├── push_to_github.sh
└── TP7- Atelier Complet-1.pdf
```

Bon TP !
