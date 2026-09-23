# Nimbus ERP React Starter

A small React + TypeScript ERP starter with:

- Public landing page
- Header Log in / Sign up buttons
- Amazon Cognito Managed Login via `aws-amplify`
- Protected dummy ERP dashboard after sign-in
- Sign-out

## 1. Install

```bash
npm install
```

## 2. Add Cognito configuration

Open:

```text
src/auth/cognito.ts
```

Replace these three values:

```ts
userPoolId: 'ap-southeast-1_REPLACE_ME',
userPoolClientId: 'REPLACE_WITH_APP_CLIENT_ID',
domain: 'REPLACE_ME.auth.ap-southeast-1.amazoncognito.com',
```

### Where to find them in AWS

- `userPoolId`: Cognito → User pools → your pool → Overview
- `userPoolClientId`: Cognito → User pools → your pool → App clients
- `domain`: Cognito → User pools → your pool → Branding / Domain

For a browser SPA, the Cognito app client should **not have a client secret**.

Enable the **Authorization code grant** and allow at least the scopes:

```text
openid
email
profile
```

For local development add this to Cognito as both an allowed callback URL and sign-out URL:

```text
http://localhost:5173/
```

The URL must match exactly.

## 3. Run

```bash
npm run dev
```

Open the local Vite URL (normally `http://localhost:5173/`).

## Authentication flow

```text
Landing page
   ↓
Log in / Sign up
   ↓
Cognito Managed Login
   ↓
Authorization Code + PKCE
   ↓
Redirect back to React
   ↓
Amplify completes the session
   ↓
Dummy ERP dashboard
```

Both buttons currently open Cognito Managed Login. Cognito's managed page exposes its sign-up flow as configured in the user pool.

## Later: calling your API Gateway

Once signed in, obtain the access token before calling a protected API:

```ts
import { fetchAuthSession } from 'aws-amplify/auth'

const { tokens } = await fetchAuthSession()
const accessToken = tokens?.accessToken.toString()

const response = await fetch('https://YOUR_API.execute-api.ap-southeast-1.amazonaws.com/prod/invoices', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
```

Keep API URLs in environment variables when we wire the real backend.
