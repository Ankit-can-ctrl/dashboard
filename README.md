# Dashboard App

Next.js dashboard with user & product management. Uses NextAuth for authentication and Zustand for state management.

## Setup

1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd new
npm install
```

2. Create a `.env.local` file in the root folder:

```
NEXT_PUBLIC_API_URL=https://dummyjson.com
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

> For `NEXTAUTH_SECRET`, run `openssl rand -base64 32` to generate one, or just use any random string for local dev.

3. Run the dev server:

```bash
npm run dev
```

4. Open http://localhost:3000

## Login Credentials

Use any user from [dummyjson.com/users](https://dummyjson.com/users). For example:

- Username: `emilys`
- Password: `emilyspass`

## Scripts

`npm run dev` ===> Start dev server  
 `npm run build` ===> Production build  
 `npm run start` ===> Start production server
`npm run lint` ===> Run ESLint

## Tech Stack

- Next.js 14 (App Router)
- MUI (Material UI)
- NextAuth.js
- Zustand
- TypeScript
