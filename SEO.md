# Référencement Google (SEO) – Scriptify

Ce document explique pourquoi le site peut ne pas apparaître tout de suite sur Google et comment le faire bien référencer.

---

## Pourquoi le site n’apparaît pas (encore) sur Google ?

1. **Le site est récent** : Google met quelques jours à quelques semaines à découvrir et indexer un nouveau site.
2. **Aucune soumission à Google** : sans sitemap ni Google Search Console, Google découvre le site uniquement s’il a un lien depuis une page déjà indexée.
3. **Pas de lien externe** : peu ou pas de sites qui pointent vers scriptify.cm ralentissent la découverte.

---

## Ce qui a été mis en place dans le projet

- **Métadonnées** : titre, description, mots-clés, langue `fr`.
- **Open Graph et Twitter** : pour un bon affichage quand le lien est partagé (réseaux sociaux).
- **URL canonique** : `https://scriptify.cm` pour éviter le contenu dupliqué.
- **Sitemap** : `https://scriptify.cm/sitemap.xml` pour indiquer les pages à indexer.
- **robots.txt** : `https://scriptify.cm/robots.txt` qui autorise l’indexation et indique l’URL du sitemap.
- **Données structurées (JSON-LD)** : schéma Organization pour que Google comprenne mieux qui vous êtes.

---

## Étapes indispensables pour être bien référencé

### 1. Google Search Console (gratuit)

1. Allez sur [Google Search Console](https://search.google.com/search-console).
2. Cliquez sur **Ajouter une propriété**.
3. Choisissez **Préfixe d’URL** et entrez : `https://scriptify.cm`
4. **Vérification** : Google propose plusieurs méthodes. La plus simple pour un site Next.js :
   - **Balise HTML** : Google vous donne un code du type `<meta name="google-site-verification" content="XXXX" />`.
   - Dans ce projet, ouvrez `src/app/layout.tsx`, section `metadata.verification`, et ajoutez :
     ```ts
     verification: {
       google: "XXXX",  // le code content fourni par Google
     },
     ```
   - Redéployez le site, puis dans Search Console cliquez sur **Vérifier**.
5. Une fois la propriété vérifiée :
   - Allez dans **Sitemaps** (menu de gauche).
   - Indiquez : `sitemap.xml` puis **Envoyer**.
   - Google va crawler le sitemap et indexer les pages.

### 2. Demander l’indexation de la page d’accueil

- Dans Search Console, en haut : **Inspection d’URL**.
- Saisissez `https://scriptify.cm`.
- Cliquez sur **Demander une indexation** (si le statut n’est pas déjà “Indexée”). Cela accélère la prise en compte.

### 3. Vérifier que le site est accessible

- Le site doit être en **HTTPS** (déjà le cas avec scriptify.cm si SSL est configuré).
- Aucune page importante ne doit renvoyer **403** ou **404**.
- Le **robots.txt** ne doit pas bloquer Google (la config actuelle autorise tout le site et interdit seulement `/api/`).

### 4. (Recommandé) Image Open Graph dédiée

- Pour un meilleur rendu sur Facebook, LinkedIn, etc., ajoutez une image **1200 × 630 px** à la racine de `public/images/`, par exemple `og-scriptify.png`.
- Dans `src/app/layout.tsx`, dans `metadata.openGraph.images`, remplacez le chemin par `/images/og-scriptify.png` pour utiliser cette image.

---

## Variable d’environnement (optionnel)

En production, l’URL du site est fixée à `https://scriptify.cm` dans le code. Si vous voulez la rendre configurable (ex. autre domaine ou staging), définissez sur le serveur :

```bash
NEXT_PUBLIC_SITE_URL=https://scriptify.cm
```

Le sitemap, les URLs canoniques et les métadonnées utiliseront cette valeur.

---

## Délais réalistes

- **Quelques jours** : après soumission du sitemap et demande d’indexation, la page d’accueil peut apparaître.
- **2 à 4 semaines** : indexation plus stable et possibilité de voir des requêtes dans Search Console.
- **Contenu, liens et technique** : pour remonter sur des mots-clés comme “agence web Cameroun” ou “création site Cameroun”, il faut du contenu pertinent (textes, pages services) et des liens depuis d’autres sites (annuaires, partenaires, réseaux).

En résumé : **inscrivez le site dans Google Search Console, soumettez le sitemap et demandez l’indexation** ; le reste (métadonnées, sitemap, robots, JSON-LD) est déjà en place dans le projet.
