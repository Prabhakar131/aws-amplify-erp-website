import { useEffect, useState } from 'react'
import { getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import { isCognitoConfigured } from './auth/cognito'
import { Dashboard } from './components/Dashboard'
import { LandingPage } from './components/LandingPage'

type AuthState = 'checking' | 'signedOut' | 'signedIn'

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('checking')
  const [username, setUsername] = useState('User')

  useEffect(() => {
    if (!isCognitoConfigured) {
      setAuthState('signedOut')
      return
    }

    let active = true

    const checkUser = async () => {
      try {
        const user = await getCurrentUser()
        if (!active) return
        setUsername(user.signInDetails?.loginId ?? user.username ?? 'User')
        setAuthState('signedIn')
      } catch {
        if (active) setAuthState('signedOut')
      }
    }

    void checkUser()

    const stopListening = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedIn') void checkUser()
      if (payload.event === 'signedOut') setAuthState('signedOut')
    })

    return () => {
      active = false
      stopListening()
    }
  }, [])

  const openManagedLogin = async () => {
    if (!isCognitoConfigured) return
    await signInWithRedirect()
  }

  const handleSignOut = async () => {
    await signOut()
  }

  if (authState === 'checking') {
    return (
      <main className="loading-screen">
        <div className="loader" />
        <p>Loading workspace…</p>
      </main>
    )
  }

  if (authState === 'signedIn') {
    return <Dashboard username={username} onSignOut={handleSignOut} />
  }

  return (
    <LandingPage
      cognitoConfigured={isCognitoConfigured}
      onLogin={openManagedLogin}
      onSignUp={openManagedLogin}
    />
  )
}
