import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
