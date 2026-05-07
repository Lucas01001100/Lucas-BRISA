import Button from './Button.jsx'

function Header({ session, title, subtitle, onLogout }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <div className="user-chip">
        <span>{session.name}</span>
        <small>{session.role}</small>
        <Button variant="ghost" onClick={onLogout}>
          Sair
        </Button>
      </div>
    </header>
  )
}

export default Header
