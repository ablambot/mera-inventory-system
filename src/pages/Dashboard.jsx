import {
  Package, AlertTriangle, ArrowDownToLine, ArrowUpFromLine,
  TrendingUp, TrendingDown, Calendar, Bell, Sun, Moon,
  Settings, Box
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useTheme } from '../context/ThemeContext.jsx'

const chartData = [
  { date: 'May 24', sales: 3200 },
  { date: 'May 25', sales: 4800 },
  { date: 'May 26', sales: 5200 },
  { date: 'May 27', sales: 9842 },
  { date: 'May 28', sales: 7600 },
  { date: 'May 29', sales: 8400 },
  { date: 'May 30', sales: 8900 },
]

const lowStockAlerts = [
  { sku: 'SKU-1001', name: 'Wireless Keyboard', stock: 3, critical: true },
  { sku: 'SKU-2053', name: 'HD Monitor 24"', stock: 2, critical: true },
  { sku: 'SKU-3098', name: 'USB-C Cable', stock: 5, critical: false },
  { sku: 'SKU-4120', name: 'Ergonomic Mouse', stock: 4, critical: false },
  { sku: 'SKU-5099', name: 'Laptop Stand', stock: 1, critical: true },
]

const kpis = [
  { label: 'Avg. Order Value', value: '$256.45', change: '+11.2%', up: true },
  { label: 'Orders', value: '176', change: '+7.8%', up: true },
  { label: 'Items Sold', value: '1,324', change: '+9.1%', up: true },
  { label: 'Returns', value: '23', change: '-2.1%', up: false },
  { label: 'Conversion Rate', value: '3.45%', change: '+1.2%', up: true },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">${payload[0].value.toLocaleString()}</div>
    </div>
  )
}

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of warehouse operations and performance</p>
        </div>
        <div className="header-actions">
          <div className="date-picker">
            <Calendar size={14} />
            May 24 – May 30, 2025
          </div>
          <button className="theme-toggle" onClick={toggleTheme} id="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="notif-btn" id="notifications-btn">
            <Bell size={16} />
            <span className="notif-badge">3</span>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Package size={20} /></div>
          <div>
            <div className="stat-label">Total Items</div>
            <div className="stat-value">12,680</div>
            <div className="stat-change"><span className="up">+12.5% vs last week</span> <TrendingUp size={12} className="up" /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertTriangle size={20} /></div>
          <div>
            <div className="stat-label">Low Alerts</div>
            <div className="stat-value">23</div>
            <div className="stat-attention">Requires attention</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><ArrowDownToLine size={20} /></div>
          <div>
            <div className="stat-label">Stock In</div>
            <div className="stat-value">1,324</div>
            <div className="stat-change"><span className="up">+8.7% vs last week</span> <TrendingUp size={12} className="up" /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><ArrowUpFromLine size={20} /></div>
          <div>
            <div className="stat-label">Stock Out</div>
            <div className="stat-value">987</div>
            <div className="stat-change"><span className="up">+5.4% vs last week</span> <TrendingUp size={12} className="up" /></div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Sales Analytics */}
        <div className="card">
          <div className="card-header">
            <h3>Sales Analytics</h3>
            <select className="card-select" id="sales-period-select">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
            </select>
          </div>
          <div className="card-body">
            <div className="sales-big-number">Total Sales</div>
            <div className="sales-amount">$45,231.89</div>
            <div className="sales-change">+15.3% vs last week ↗</div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="var(--chart-line)" strokeWidth={2} fill="url(#salesGradient)" dot={false} activeDot={{ r: 5, fill: 'var(--accent)', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="kpi-row">
              {kpis.map(k => (
                <div key={k.label} className="kpi-item">
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-value">{k.value}</div>
                  <div className={`kpi-change ${k.up ? 'up' : 'down'}`}>
                    {k.change} {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <div className="alerts-header">
            <h3>Low Stock Alerts</h3>
            <a href="#">View All</a>
          </div>
          <div className="alert-list">
            {lowStockAlerts.map(item => (
              <div key={item.sku} className="alert-item">
                <div className="alert-icon-wrap"><Box size={16} /></div>
                <div className="alert-info">
                  <div className="alert-sku">{item.sku}</div>
                  <div className="alert-name">{item.name}</div>
                  <div className="alert-stock">Current Stock: {item.stock}</div>
                </div>
                <div className={`alert-badge ${item.critical ? 'critical' : 'warning'}`}>
                  <div className="count">{item.stock}</div>
                  <div className="unit">{item.stock === 1 ? 'unit' : 'units'}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="manage-btn" id="manage-alerts-btn">
            Manage Alerts <Settings size={13} />
          </button>
        </div>
      </div>
    </>
  )
}
