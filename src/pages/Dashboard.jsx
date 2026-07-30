import {
  Package, AlertTriangle, ArrowDownToLine, ArrowUpFromLine,
  TrendingUp, TrendingDown, Calendar, Bell, Sun, Moon,
  Settings, Box, PackageOpen
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useTheme } from '../context/ThemeContext.jsx'

const chartData = []

const lowStockAlerts = []

const kpis = [
  { label: 'Avg. Order Value', value: '$0.00', change: '0%', up: true },
  { label: 'Orders', value: '0', change: '0%', up: true },
  { label: 'Items Sold', value: '0', change: '0%', up: true },
  { label: 'Returns', value: '0', change: '0%', up: false },
  { label: 'Conversion Rate', value: '0%', change: '0%', up: true },
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
            <span className="notif-badge">0</span>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Package size={20} /></div>
          <div>
            <div className="stat-label">Total Items</div>
            <div className="stat-value">0</div>
            <div className="stat-change"><span className="up">No data yet</span></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertTriangle size={20} /></div>
          <div>
            <div className="stat-label">Low Alerts</div>
            <div className="stat-value">0</div>
            <div className="stat-change"><span className="up">No alerts</span></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><ArrowDownToLine size={20} /></div>
          <div>
            <div className="stat-label">Stock In</div>
            <div className="stat-value">0</div>
            <div className="stat-change"><span className="up">No data yet</span></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><ArrowUpFromLine size={20} /></div>
          <div>
            <div className="stat-label">Stock Out</div>
            <div className="stat-value">0</div>
            <div className="stat-change"><span className="up">No data yet</span></div>
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
            <div className="sales-amount">$0.00</div>
            <div className="sales-change">No sales data yet</div>
            <div className="chart-container">
              {chartData.length > 0 ? (
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
              ) : (
                <div className="empty-state">
                  <PackageOpen size={40} />
                  <p>No sales data yet</p>
                  <span>Data will appear here once transactions are recorded</span>
                </div>
              )}
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
            {lowStockAlerts.length > 0 ? lowStockAlerts.map(item => (
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
            )) : (
              <div className="empty-state small">
                <Package size={28} />
                <p>No alerts</p>
                <span>Add inventory items to enable stock monitoring</span>
              </div>
            )}
          </div>
          <button className="manage-btn" id="manage-alerts-btn">
            Manage Alerts <Settings size={13} />
          </button>
        </div>
      </div>
    </>
  )
}
