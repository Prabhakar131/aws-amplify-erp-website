type DashboardProps = {
  username: string
  onSignOut: () => Promise<void>
}

const navItems = ['Overview', 'Sales', 'Customers', 'Inventory', 'Invoices', 'Reports']

const orders = [
  ['INV-2048', 'Acme Studio', '$4,280', 'Paid'],
  ['INV-2047', 'Northstar Labs', '$2,940', 'Pending'],
  ['INV-2046', 'Aperture Goods', '$8,120', 'Paid'],
  ['INV-2045', 'Nova Retail', '$1,760', 'Overdue'],
]

export function Dashboard({ username, onSignOut }: DashboardProps) {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand"><span className="brand-mark">N</span><span>Nimbus</span></div>
        <nav className="dashboard-nav" aria-label="ERP navigation">
          {navItems.map((item, index) => (
            <button className={index === 0 ? 'active' : ''} key={item}>
              <span className="nav-dot" />{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{username.slice(0, 2).toUpperCase()}</div>
            <div><strong>{username}</strong><span>Administrator</span></div>
          </div>
          <button className="signout-button" onClick={() => void onSignOut()}>Sign out</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-search">⌕ <span>Search invoices, customers, products…</span></div>
          <div className="topbar-actions"><button>?</button><button>⌁</button><div className="top-avatar">{username.slice(0, 2).toUpperCase()}</div></div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-welcome">
            <div><span className="overline">OVERVIEW</span><h1>Good morning, {username.split('@')[0]}.</h1><p>Here’s what’s happening with your business today.</p></div>
            <button className="primary-button">+ Create invoice</button>
          </div>

          <section className="stats-grid" aria-label="Business metrics">
            <article><div className="stat-label">Total revenue <span>↗</span></div><strong>$128,420</strong><div className="stat-change positive">↑ 12.8% <span>vs last month</span></div></article>
            <article><div className="stat-label">Open invoices <span>▤</span></div><strong>$24,860</strong><div className="stat-change neutral">18 invoices <span>awaiting payment</span></div></article>
            <article><div className="stat-label">New customers <span>+</span></div><strong>48</strong><div className="stat-change positive">↑ 8.4% <span>vs last month</span></div></article>
            <article><div className="stat-label">Low stock items <span>!</span></div><strong>12</strong><div className="stat-change warning">4 critical <span>need attention</span></div></article>
          </section>

          <section className="dashboard-grid">
            <article className="panel revenue-panel">
              <div className="panel-heading"><div><span>Revenue</span><strong>$128,420</strong></div><select aria-label="Revenue period"><option>Last 6 months</option></select></div>
              <div className="big-chart">
                <div className="y-labels"><span>$40K</span><span>$30K</span><span>$20K</span><span>$10K</span><span>$0</span></div>
                <div className="chart-stage">
                  <svg viewBox="0 0 700 260" preserveAspectRatio="none" role="img" aria-label="Revenue trend">
                    <defs><linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".22"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
                    <path className="dashboard-chart-area" d="M0 220 C80 205 85 178 160 188 C235 197 260 125 330 143 C398 160 430 95 495 105 C560 115 590 53 700 39 L700 260 L0 260Z"/>
                    <path className="dashboard-chart-line" d="M0 220 C80 205 85 178 160 188 C235 197 260 125 330 143 C398 160 430 95 495 105 C560 115 590 53 700 39"/>
                  </svg>
                  <div className="x-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
                </div>
              </div>
            </article>

            <article className="panel activity-panel">
              <div className="panel-heading"><div><span>Recent activity</span></div><button className="link-button">View all</button></div>
              <div className="activity-list">
                <div><span className="activity-icon">$</span><p><strong>Invoice #2048 paid</strong><small>Acme Studio · $4,280</small></p><time>8m</time></div>
                <div><span className="activity-icon">+</span><p><strong>New customer added</strong><small>Bright Works Pte Ltd</small></p><time>34m</time></div>
                <div><span className="activity-icon">▦</span><p><strong>Stock level updated</strong><small>Wireless Scanner · 24 units</small></p><time>1h</time></div>
                <div><span className="activity-icon">!</span><p><strong>Payment overdue</strong><small>Invoice #2045 · Nova Retail</small></p><time>2h</time></div>
              </div>
            </article>
          </section>

          <section className="panel orders-panel">
            <div className="panel-heading"><div><span>Recent invoices</span><small>Latest customer billing activity</small></div><button className="link-button">View all invoices →</button></div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Status</th><th /></tr></thead>
                <tbody>{orders.map(([invoice, customer, amount, status]) => (
                  <tr key={invoice}><td><strong>{invoice}</strong></td><td>{customer}</td><td>{amount}</td><td><span className={`status ${status.toLowerCase()}`}>{status}</span></td><td>•••</td></tr>
                ))}</tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
