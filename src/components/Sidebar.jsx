import {
  LayoutDashboard, Package, ShoppingCart, ArrowDownToLine,
  ArrowUpFromLine, BarChart3, FileText, AlertTriangle,
  Users, Settings, ChevronDown
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Package, label: 'Inventory' },
  { icon: ShoppingCart, label: 'Orders' },
  { icon: ArrowDownToLine, label: 'Inbound' },
  { icon: ArrowUpFromLine, label: 'Outbound' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
  { icon: AlertTriangle, label: 'Alerts' },
  { icon: Users, label: 'Users' },
  { icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>MERA</h1>
      </div>

      <ul className="nav-list">
        {navItems.map(({ icon: Icon, label, active }) => (
          <li key={label} className="nav-item">
            <a href="#" className={active ? 'active' : ''}>
              <Icon size={18} />
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="system-status">
        <h4>System Status</h4>
        <div className="status-indicator">
          <span className="status-dot" />
          All Systems Operational
        </div>
        <div className="status-bars">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="status-bar" />
          ))}
        </div>
      </div>

      <div className="user-profile">
        <div className="user-avatar">AD</div>
        <div className="user-info">
          <div className="name">Admin User</div>
          <div className="role">Administrator</div>
        </div>
        <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
      </div>
    </aside>
  )
}
