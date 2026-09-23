import { Amplify } from 'aws-amplify'

/**
 * ============================================================
 *  AWS COGNITO CONFIG — PASTE YOUR VALUES HERE
 * ============================================================
 *
 * AWS Console locations:
 * 1. userPoolId       -> Cognito > User pools > your pool > Overview
 * 2. userPoolClientId -> Cognito > User pools > App clients
 * 3. domain           -> Cognito > Branding > Domain
 *
 * IMPORTANT:
 * - Your app client should be a PUBLIC client (no client secret).
 * - Enable Authorization Code Grant.
 * - Add http://localhost:5173/ as BOTH an allowed callback URL
 *   and allowed sign-out URL while developing locally.
 * - Add your production URL later as another callback/sign-out URL.
 */

const cognitoConfig = {
  userPoolId: 'ap-southeast-1_REPLACE_ME',
  userPoolClientId: 'REPLACE_WITH_APP_CLIENT_ID',
  domain: 'REPLACE_ME.auth.ap-southeast-1.amazoncognito.com',

  // Keep the trailing slash because Cognito callback URLs must match exactly.
  redirectSignIn: ['http://localhost:5173/'],
  redirectSignOut: ['http://localhost:5173/'],
}

export const isCognitoConfigured =
  !cognitoConfig.userPoolId.includes('REPLACE_ME') &&
  !cognitoConfig.userPoolClientId.includes('REPLACE_WITH') &&
  !cognitoConfig.domain.includes('REPLACE_ME')

if (isCognitoConfigured) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoConfig.userPoolId,
        userPoolClientId: cognitoConfig.userPoolClientId,
        loginWith: {
          oauth: {
            domain: cognitoConfig.domain,
            scopes: ['openid', 'email', 'profile'],
            redirectSignIn: cognitoConfig.redirectSignIn,
            redirectSignOut: cognitoConfig.redirectSignOut,
            responseType: 'code',
          },
        },
      },
    },
  })
}
