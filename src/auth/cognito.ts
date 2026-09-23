import { Amplify } from 'aws-amplify'

export const cognitoConfig = {
  userPoolId: 'us-east-2_L98CD0jvt',

  userPoolClientId: 'isvpse9a2mjimdp56pimmc0ht',

  domain: 'us-east-2l98cd0jvt.auth.us-east-2.amazoncognito.com',

  redirectSignIn: [
    'https://d1ohz7nks4rtag.cloudfront.net/',
    'http://localhost:5173/',
  ],

  redirectSignOut: [
    'https://d1ohz7nks4rtag.cloudfront.net/',
    'http://localhost:5173/',
  ],
}

export const isCognitoConfigured =
  !cognitoConfig.userPoolId.includes('REPLACE_ME') &&
  !cognitoConfig.userPoolClientId.includes('REPLACE') &&
  !cognitoConfig.domain.includes('REPLACE_ME')

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: cognitoConfig.userPoolId,
      userPoolClientId: cognitoConfig.userPoolClientId,

      loginWith: {
        oauth: {
          domain: cognitoConfig.domain,
          scopes: ['openid', 'email', 'phone'],
          redirectSignIn: cognitoConfig.redirectSignIn,
          redirectSignOut: cognitoConfig.redirectSignOut,
          responseType: 'code',
        },
      },
    },
  },
})
