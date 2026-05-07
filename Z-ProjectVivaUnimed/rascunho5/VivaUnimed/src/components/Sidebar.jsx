const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'profissionais', label: 'Profissionais' },
  { id: 'noshow', label: 'No-show' },
]

function Sidebar({ activeScreen, onNavigate, session }) {
  if (session.role !== 'administrador') {
    return null
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <strong>VivaUnimed</strong>
        <span>Gestao no-show</span>
      </div>

      <nav className="menu" aria-label="Navegacao administrativa">
        {menuItems.map((item) => (
          <button
            className={`menu-item ${activeScreen === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
