# Exercice Technique - The Wokies

Cet exercice a pour but d'évaluer vos compétences en **React**, **TypeScript**, **Next.js**, **Supabase**, **Ant Design**, et **Tailwind CSS**, en reproduisant la stack que nous utilisons chez **The Wokies**.

La majeure partie de l’application devra **consommer Supabase côté client** (via son client JavaScript), **mais** vous pourrez également mettre en place **de la logique serveur avec** Next.js pour gérer une partie plus “critique” de la logique sur un pseudo-backend.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- **Node.js** (version récente)
- **npm**, **yarn**, ou un autre gestionnaire de paquets
- Un compte et un projet [Supabase](https://supabase.com/) (gratuit)

---

## Installation

1. **Cloner** ce repository.

2. Installez les dépendances du projet :

   ```bash
   npm install
   ```

3. Créez un projet sur **Supabase** et configurez-y les tables/colonnes nécessaires. Ajoutez ensuite les informations de connexion (URL et clés) dans un fichier (ex.: `.env.local`) à la racine du projet :

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<URL_DU_PROJET_SUPABASE>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<CLE_ANON_DU_PROJET_SUPABASE>
   ```

4. Vérifiez le Row Level Security de Supabase (RLS) :
    - **Comme il n’y a pas d’authentification**, faites comme si le RLS était activé sur les tables. Cependant, pour simplifier l’exercice, désactivez le.


---

## Structure du Projet

Le projet Next.js pourrait ressembler à ceci :

```
/app
  /(home)     # Page d'accueil
  /dashboard  # Page du tableau de bord
  /invite     # Page d'invitation
/shared
  ...              # Composants et services partagés
/config
  supabaseClient.ts # Configuration du client Supabase
```

> Vous pouvez bien sûr adapter cette structure si vous le souhaitez

---

## Styles et Bibliothèques UI

- **Ant Design** et **Tailwind CSS** sont préconfigurés pour gérer le style de l’interface.
- Vous êtes libre d’ajouter d’autres dépendances.

---

## Objectifs et Fonctionnalités

### 1. Home (`/`)
- **Objectif :** Inscrire de nouveaux joueurs et leur “envoyer” une invitation.
- **Détails :**
    - Formulaire (Nom, Email, etc.) pour créer un joueur dans Supabase.
    - Après la création, simuler l’envoi d’une invitation par mail (pas besoin d'implémenter l'envoi réel du mail).

### 2. Invite (`/invite`)
- **Objectif :** Permettre au joueur de répondre à l’invitation.
- **Détails :**
    - Récupérer l’invitation depuis Supabase.
    - Le joueur peut “Accepter” ou “Refuser”, ce qui met à jour le statut en base.

### 3. Dashboard (`/dashboard`)
- **Objectif :** Visualiser l’état de tous les joueurs.
- **Détails :**
    - Afficher la liste des joueurs ainsi que leur statut d’invitation (envoyé, accepté, refusé, etc.).
    - Présentation libre (table, liste, cartes…).

### 4. (Optionnel) Système d’Équipes
Si vous avez du temps, vous pouvez ajouter un système d’équipes qui devra illustrer un petit bout de logique serveur avec validation côté backend :

- Chaque joueur peut être **assigné à une équipe**, avec une **limite de 5 joueurs maximum par équipe**.

> **Remarque :** Cette fonctionnalité d’équipes est **optionnelle** (un bonus), à implémenter si vous avez le temps.

---

## Lancement de l’Application

Pour lancer l’application en mode développement :

```bash
npm run dev
```

---

## Contraintes / Conseils

- **Next.js** doit être utilisé pour la structure de l'application.
- **Supabase** doit être utilisé pour les opérations CRUD. Pas besoin de gérer l'authentification, ni les sécurités, ni les permissions.
- Respectez le sujet du test, **mais vous pouvez prendre des libertés dans l'implémentation et la structure du projet** si cela améliore l'UI/UX ou facilite l'implémentation technique. Par exemple vous pouvez très bien fusionner les pages Home et Dashboard, si ça se justifie en terme UI/UX ou bien d'implémentation technique.
- Vous n'êtes pas UI/UX designer, un design simple et fonctionnel est suffisant. Un style CSS minimal est attendu, mais qui est déjà fourni par Tailwind CSS et Ant-Design. On attend juste un layout fonctionnel et lisible.

---

## Livrables

1. **Un lien vers votre repository Git** contenant le code de votre projet.
2. (Optionnel) Toute note ou documentation supplémentaire dans un `README`.

Nous vous souhaitons bonne chance pour cet exercice et avons hâte de découvrir votre implémentation !


## Note

### supabase
supabase login
supabase link
./scripts/init-db.sh
