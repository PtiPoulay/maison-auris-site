# Maison Auris — Site e-commerce de montres

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement Vercel

1. Va sur https://vercel.com
2. Connecte-toi avec GitHub ou crée un compte
3. Clique sur "Add New Project"
4. Importe ce dossier/projet
5. Clique sur "Deploy"

## Espace admin

Dans le site, clique sur **Admin**.

Mot de passe par défaut :

```text
auris-admin
```

Tu peux modifier :
- le nom des montres
- les images
- les prix
- les prix barrés
- les descriptions
- les badges
- le style
- le genre

Important : dans cette version, les modifications sont sauvegardées dans le navigateur via localStorage.
Pour une vraie boutique en ligne où les modifications sont visibles par tous, il faudra connecter une base de données comme Supabase ou Firebase.

## Modification des images

Dans l’espace admin, colle simplement une URL d’image dans le champ **Image URL**.

Exemple :
```text
https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop
```
