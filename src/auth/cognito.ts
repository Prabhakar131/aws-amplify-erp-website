import { Amplify } from 'aws-amplify'

export const cognitoConfig = {
  userPoolId: 'us-east-2_MOvmTpvJK',

  userPoolClientId: '2hgt75ja3jdfahljtqj12nq0hm',

  domain: 'us-east-2movmtpvjk.auth.us-east-2.amazoncognito.com',

  redirectSignIn: [
    'https://dev.d2i50h8z2loa7g.amplifyapp.com/',
    'http://localhost:5173/',
  ],

  redirectSignOut: [
    'https://dev.d2i50h8z2loa7g.amplifyapp.com/',
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