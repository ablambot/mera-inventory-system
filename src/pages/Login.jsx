import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Login({ onLogin }) {
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onLogin) {
      onLogin({ email, rememberMe })
    }
  }

  return (
    <div className="login-container">
      {/* Top bar theme toggle */}
      <div className="login-top-bar">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          type="button"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="login-card-wrapper">
        <div className="login-card">
          {/* Header & Logo */}
          <div className="login-header">
            <img src="/logo.png" alt="MERA Logo" className="brand-logo-img login-logo-img" />
            <p className="login-subtitle">Warehouse Operations Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email or Username</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="text"
                  placeholder="admin@mera.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-footer">
            <p>© {new Date().getFullYear()} MERA Operations. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
