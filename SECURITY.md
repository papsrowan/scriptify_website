# 🔐 Guide de Sécurité Scriptify

## 🚨 Incident de Sécurité - Actions Immédiates

### Ce qui s'est passé
- **RCE (Remote Code Execution)** détecté dans les logs
- Tentatives de téléchargement de malware (xmrig, scanner_linux)
- IP suspecte: 94.156.152.67

### Actions déjà prises
- ✅ Sécurisation de l'API send-mail avec validation stricte
- ✅ Ajout de headers de sécurité CSP, X-Frame-Options, etc.
- ✅ Middleware de protection contre les injections et rate limiting
- ✅ Sanitisation des entrées utilisateur

## 🛡️ Mesures de Sécurité Implémentées

### 1. Validation API Stricte
- Vérification des types et longueurs des données
- Échappement des caractères dangereux
- Gestion d'erreur sécurisée

### 2. Headers de Sécurité
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy sécurisée

### 3. Middleware de Protection
- Rate limiting (10 req/minute par IP)
- Détection de patterns d'injection SQL/XSS/RCE
- Logging des requêtes suspectes

### 4. Configuration Docker Sécurisée
- Utilisateur non-root (nextjs)
- Permissions minimales
- Système de fichiers read-only pour les utilisateurs

## 🔍 Vérifications à faire sur le serveur

### Processus suspects
```bash
# Vérifier les processus
ps aux | grep -E "(xmrig|xdlol|scanner|miner)"

# Vérifier les connexions réseau
netstat -tulpn | grep -v "127.0.0.1"
ss -tulpn | grep -v "127.0.0.1"

# Vérifier les fichiers suspects
find / -name "*xmrig*" -o -name "*xdlol*" -o -name "*scanner*" 2>/dev/null
```

### Logs Docker
```bash
# Vérifier les logs du container
docker logs scriptify_frontend

# Vérifier les containers actifs
docker ps

# Inspecter le container
docker inspect scriptify_frontend
```

### Firewall et Blocage IP
```bash
# Bloquer l'IP suspecte
ufw deny from 94.156.152.67

# Ou avec iptables
iptables -A INPUT -s 94.156.152.67 -j DROP

# Vérifier les règles firewall
ufw status
iptables -L
```

## 🚀 Recommandations pour la Production

### 1. Monitoring et Alertes
- Configurer des alertes sur les logs suspects
- Monitoring des ressources (CPU, RAM, réseau)
- Alertes sur les tentatives de connexion échouées

### 2. Mises à Jour Régulières
- Next.js: `npm update next`
- Node.js: Version LTS (20.x)
- Dépendances: Audit régulier avec `npm audit`

### 3. Architecture Sécurisée
- Utiliser un reverse proxy (nginx, traefik)
- Certificats SSL/TLS valides
- Séparation des environnements (dev/staging/prod)

### 4. Sauvegardes et Récupération
- Sauvegardes automatiques des données
- Plan de récupération d'urgence
- Tests de restauration réguliers

## 🔧 Commandes de Diagnostic

### Vérifier la sécurité du container
```bash
# Scanner les vulnérabilités Docker
docker scan scriptify_frontend

# Vérifier les permissions
docker exec scriptify_frontend ls -la /app

# Tester les headers de sécurité
curl -I https://scriptify.cm
```

### Audit des dépendances
```bash
# Audit npm
npm audit

# Vérifier les vulnérabilités connues
npm audit --audit-level=high

# Mettre à jour les dépendances
npm update
```

## 📞 En cas de nouvelle attaque

1. **Stopper immédiatement le service**
   ```bash
   docker stop scriptify_frontend
   ```

2. **Analyser les logs**
   ```bash
   docker logs scriptify_frontend > security_incident_$(date +%Y%m%d_%H%M%S).log
   ```

3. **Isoler l'IP attaquante**
   ```bash
   # Ajouter à la blacklist
   echo "94.156.152.67" >> /etc/ufw/blacklist
   ufw reload
   ```

4. **Rebuild et redéployer**
   ```bash
   docker build --no-cache -t scriptify_frontend:latest .
   docker run -d --name scriptify_frontend_new -p 3001:3000 scriptify_frontend:latest
   ```

## 🎯 Prévention Future

### Code Reviews de Sécurité
- Vérifier toutes les entrées utilisateur
- Éviter les fonctions dangereuses (eval, exec, etc.)
- Utiliser des bibliothèques de sécurité (helmet, express-rate-limit)

### Monitoring Continu
- Logs centralisés
- Alertes en temps réel
- Analyse comportementale

### Formation Équipe
- Sensibilisation aux vulnérabilités web
- Bonnes pratiques de développement sécurisé
- Tests de pénétration réguliers

---

**📅 Dernière mise à jour:** Mars 2026
**🚨 Priorité:** CRITIQUE - Action immédiate requise