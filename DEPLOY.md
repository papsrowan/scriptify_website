# Déploiement Scriptify (scriptify.cm) sur VPS avec Docker

Ce guide décrit comment déployer ce projet Next.js sur un VPS avec Docker, avec le domaine **scriptify.cm**, en coexistence avec un autre projet Next.js déjà en place.

---

## 1. Prérequis sur le VPS

- Docker et Docker Compose installés
- Un réseau Docker externe `web` (utilisé par votre reverse proxy)
- Nginx (ou Traefik/Caddy) comme reverse proxy
- Le DNS de **scriptify.cm** pointe vers l’IP de votre VPS (A ou CNAME)

---

## 2. Fichiers du projet

À avoir dans le dépôt / sur le serveur :

- `Dockerfile` – build multi-stage Next.js (standalone)
- `docker-compose.yml` – service `scriptify_frontend` sur le réseau `web`
- `.dockerignore` – pour des builds plus rapides
- `.env` – **à créer sur le VPS** (voir ci‑dessous), jamais commiter

---

## 3. Variables d’environnement sur le VPS

Sur le VPS, à la racine du projet (à côté de `docker-compose.yml`), créez un fichier `.env` :

```bash
# Exemple .env (à adapter avec vos vraies valeurs)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Sans `RESEND_API_KEY`, le formulaire de contact ne pourra pas envoyer d’emails.

---

## 4. Build et démarrage du conteneur

À la racine du projet sur le VPS :

```bash
# Build de l’image
docker compose build

# Démarrer le service (réseau "web")
docker compose up -d
```

Le conteneur `scriptify_frontend` écoute en interne sur le port **3000** (exposé uniquement dans le réseau Docker `web`).

---

## 5. Configuration Nginx pour scriptify.cm

Votre autre site Next.js utilise déjà Nginx. Il faut ajouter un **nouveau bloc server** pour **scriptify.cm** qui proxy vers le conteneur `scriptify_frontend`.

Exemple de fichier de site Nginx (à placer dans `/etc/nginx/sites-available/` puis activer le site) :

```nginx
# /etc/nginx/sites-available/scriptify.cm

upstream scriptify_frontend {
    server scriptify_frontend:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name scriptify.cm www.scriptify.cm;

    # Redirection HTTPS (à activer après avoir configuré le SSL)
    # return 301 https://$server_name$request_uri;
    # }

    # server {
    # listen 443 ssl http2;
    # listen [::]:443 ssl http2;
    # server_name scriptify.cm www.scriptify.cm;

    # Certificats Let's Encrypt (à adapter selon votre chemin)
    # ssl_certificate /etc/letsencrypt/live/scriptify.cm/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/scriptify.cm/privkey.pem;

    location / {
        proxy_pass http://scriptify_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Important :** Nginx doit pouvoir résoudre le nom `scriptify_frontend`. Deux cas courants :

- **Nginx dans Docker** sur le même réseau `web` : le nom `scriptify_frontend` fonctionne directement.
- **Nginx sur l’hôte** : dans `docker-compose.yml` vous pouvez exposer le port, par exemple `ports: - "3001:3000"`, puis dans Nginx utiliser `proxy_pass http://127.0.0.1:3001;` au lieu de `http://scriptify_frontend:3000`.

Activation du site et test :

```bash
sudo ln -s /etc/nginx/sites-available/scriptify.cm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. HTTPS avec Let’s Encrypt (Certbot)

Une fois le domaine scriptify.cm accessible en HTTP :

```bash
sudo certbot --nginx -d scriptify.cm -d www.scriptify.cm
```

Puis décommenter dans le fichier Nginx le bloc `listen 443`, les lignes `ssl_*` et la redirection HTTP → HTTPS.

---

## 7. Résumé des étapes sur le VPS

| Étape | Commande / action |
|--------|-------------------|
| 1. Cloner / copier le projet | `git clone ...` ou `rsync` |
| 2. Créer `.env` | `RESEND_API_KEY=re_xxx` |
| 3. Build et lancer | `docker compose build && docker compose up -d` |
| 4. Config Nginx | Fichier `scriptify.cm` → proxy vers `scriptify_frontend:3000` (ou `127.0.0.1:3001`) |
| 5. Tester | Ouvrir http://scriptify.cm |
| 6. SSL | `certbot --nginx -d scriptify.cm -d www.scriptify.cm` |

---

## 8. Commandes utiles

```bash
# Voir les logs du conteneur
docker compose logs -f scriptify_frontend

# Rebuild après un git pull
docker compose build --no-cache && docker compose up -d

# Arrêter le site
docker compose down
```

---

## 9. Coexistence avec l’autre projet Next.js

- Chaque projet a son propre `docker-compose.yml` et son conteneur (ex. `scriptify_frontend` pour celui‑ci).
- Les deux peuvent être sur le même réseau Docker `web` si Nginx est aussi dans Docker.
- Chaque domaine (votresite.com et scriptify.cm) a son propre bloc `server` dans Nginx, avec un `proxy_pass` vers le bon conteneur (ou le bon port sur l’hôte).

Si vous indiquez le nom de l’autre projet ou le port utilisé, on peut adapter la config Nginx (ports, noms de conteneurs) en conséquence.
