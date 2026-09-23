type LandingPageProps = {
  cognitoConfigured: boolean
  onLogin: () => Promise<void>
  onSignUp: () => Promise<void>
}

const featureCards = [
  {
    icon: '▦',
    title: 'One operational view',
    copy: 'Sales, inventory, customers and finance in one calm workspace.',
  },
  {
    icon: '↗',
    title: 'Built for momentum',
    copy: 'See the numbers that matter and move from insight to action quickly.',
  },
  {
    icon: '✓',
    title: 'Secure by default',
    copy: 'Authentication is handled by Amazon Cognito Managed Login.',
  },
]

export function LandingPage({
  cognitoConfigured,
  onLogin,
  onSignUp,
}: LandingPageProps) {
  return (
    <div className="landing-shell">
      <header className="landing-header">
        <a className="brand" href="#top" aria-label="Nimbus ERP home">
          <span className="brand-mark">N</span>
          <span>Nimbus</span>
        </a>

        <nav className="header-actions" aria-label="Account actions">
          <button className="text-button" onClick={() => void onLogin()} disabled={!cognitoConfigured}>
            Log in
          </button>
          <button className="primary-button small" onClick={() => void onSignUp()} disabled={!cognitoConfigured}>
            Sign up
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">A simpler way to run your business</span>
            <h1>Your entire operation, finally in one place.</h1>
            <p>
              Nimbus brings customers, invoices, inventory and day-to-day operations
              into one focused ERP workspace built for growing teams.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => void onSignUp()} disabled={!cognitoConfigured}>
                Start free
                <span aria-hidden="true">→</span>
              </button>
              <a className="secondary-button" href="#features">Explore the platform</a>
            </div>

            {!cognitoConfigured && (
              <div className="config-notice" role="status">
                <strong>Cognito is not configured yet.</strong>
                <span>
                  Open <code>src/auth/cognito.ts</code> and replace the three placeholder values.
                </span>
              </div>
            )}
          </div>

          <div className="hero-visual" aria-label="ERP dashboard preview">
            <div className="glow glow-one" />
            <div className="glow glow-two" />
            <div className="preview-window">
              <div className="preview-topbar">
                <div className="mini-logo">N</div>
                <div className="preview-search">Search anything…</div>
                <div className="preview-avatar">PK</div>
              </div>
              <div className="preview-body">
                <aside className="preview-sidebar">
                  <span className="active-line" />
                  <span />
                  <span />
                  <span />
                  <span />
                </aside>
                <div className="preview-content">
                  <div className="preview-heading-row">
                    <div>
                      <small>OVERVIEW</small>
                      <h3>Good morning.</h3>
                    </div>
                    <div className="preview-pill">This month</div>
                  </div>
                  <div className="preview-metrics">
                    <div><small>Revenue</small><strong>$128.4K</strong><em>+12.8%</em></div>
                    <div><small>Orders</small><strong>1,284</strong><em>+8.2%</em></div>
                    <div><small>Customers</small><strong>842</strong><em>+4.1%</em></div>
                  </div>
                  <div className="preview-chart-card">
                    <div className="chart-heading"><span>Revenue</span><strong>$128,420</strong></div>
                    <svg viewBox="0 0 560 180" role="img" aria-label="Rising revenue chart">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="chart-area" d="M0 151 C55 135 75 149 118 114 C160 80 192 114 238 78 C281 45 312 75 351 56 C402 30 435 63 474 32 C509 9 534 20 560 8 L560 180 L0 180 Z" />
                      <path className="chart-line" d="M0 151 C55 135 75 149 118 114 C160 80 192 114 238 78 C281 45 312 75 351 56 C402 30 435 63 474 32 C509 9 534 20 560 8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Product capabilities">
          <span>FINANCE</span><span>SALES</span><span>INVENTORY</span><span>CUSTOMERS</span><span>OPERATIONS</span>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="eyebrow">Everything connected</span>
            <h2>Less switching. More running your business.</h2>
          </div>
          <div className="feature-grid">
            {featureCards.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
