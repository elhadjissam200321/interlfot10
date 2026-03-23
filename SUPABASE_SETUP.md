# Connexion à Supabase

Pour activer l'authentification et le pré-remplissage des formulaires, vous devez connecter votre projet à Supabase.

## Étape 1 : Créer un projet Supabase
1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard/projects).
2. Cliquez sur **New Project**.
3. Une fois le projet créé, allez dans **Project Settings** > **API**.

## Étape 2 : Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine de votre projet (là où se trouve `package.json`) et ajoutez vos clés :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme
```

## Étape 3 : Redémarrer le serveur
Après avoir ajouté le fichier `.env.local`, arrêtez votre terminal (`Ctrl+C`) et relancez la commande :
```bash
npm run dev
```

---
*Note : Si vous travaillez en local et que vous n'avez pas encore de clés, l'application restera fonctionnelle mais les fonctionnalités "Compte" et "Pré-remplissage auto" seront limitées.*
