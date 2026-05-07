import { useMemo, useState } from 'react'
import './App.css'

const screens = {
  login: 'login',
  dashboard: 'dashboard',
  agenda: 'agenda',
  profissionais: 'profissionais',
  noshow: 'noshow',
}

function Sidebar({ activeScreen, onNavigate }) {
  const items = [
    ['dashboard', 'Dashboard'],
    ['agenda', 'Agenda'],
    ['profissionais', 'Cadastro Profissionais'],
    ['noshow', 'Cadastro No-show'],
  ]

  return (
    <aside className="sidebar">
      <div className="logo">Unimed</div>
      {items.map(([id, label]) => (
        <button
          type="button"
          key={id}
          className={`menu-item ${activeScreen === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          {label}
        </button>
      ))}
    </aside>
  )
}

function LoginScreen({ onNavigate }) {
  return (
    <section className="screen active">
      <div className="login-container">
        <div className="login-left">
          <div className="logo">Unimed</div>
          <h2>Agenda VivaUnimed</h2>
        </div>

        <div className="login-right">
          <form className="login-box" onSubmit={(event) => event.preventDefault()}>
            <h2>Bem-vindo</h2>
            <input type="email" placeholder="E-mail" aria-label="E-mail" />
            <input type="password" placeholder="Senha" aria-label="Senha" />
            <button
              type="button"
              className="full-btn"
              onClick={() => onNavigate(screens.dashboard)}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function DashboardScreen({ activeScreen, onNavigate }) {
  return (
    <section className="screen active">
      <Sidebar activeScreen={activeScreen} onNavigate={onNavigate} />

      <main className="main">
        <h1>Visão Geral Operacional</h1>

        <div className="grid grid-3">
          <div className="card">
            <div>Taxa de No-show</div>
            <div className="metric">00.0%</div>
          </div>

          <div className="card">
            <div>Taxa de Ocupação</div>
            <div className="metric">00.0%</div>
          </div>

          <div className="card">Frequência semanal</div>
        </div>

        <div className="card">Alerta crítico</div>
        <div className="card">Insight estratégico</div>
      </main>
    </section>
  )
}

function AgendaScreen({ activeScreen, onNavigate }) {
  const days = useMemo(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    return Array.from({ length: daysInMonth }, (_, index) => index + 1)
  }, [])

  const today = new Date().getDate()

  return (
    <section className="screen active">
      <Sidebar activeScreen={activeScreen} onNavigate={onNavigate} />

      <main className="main">
        <h1>Agenda</h1>

        <div className="grid grid-3 agenda-grid">
          <div className="card">
            <div className="calendar" aria-label="Calendário do mês atual">
              {days.map((day) => (
                <div key={day} className={`day ${day === today ? 'active' : ''}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div aria-hidden="true" />

          <div className="card">
            <h3>Consultas</h3>
            <div className="appointment confirmed">08:00 Confirmada</div>
            <div className="appointment noshow">09:15 No-show</div>
            <div className="appointment pending">10:30 Pendente</div>
            <div className="appointment done">11:45 Realizada</div>
          </div>
        </div>
      </main>
    </section>
  )
}

function ProfissionaisScreen({ activeScreen, onNavigate }) {
  return (
    <section className="screen active">
      <Sidebar activeScreen={activeScreen} onNavigate={onNavigate} />

      <main className="main">
        <div className="header">
          <h1>Cadastro de Profissionais</h1>
          <button type="button">Salvar</button>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <label htmlFor="nome">Nome</label>
            <input id="nome" />

            <label htmlFor="crm">CRM</label>
            <input id="crm" />

            <label htmlFor="especialidade-profissional">Especialidade</label>
            <select id="especialidade-profissional" defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option>Clínica médica</option>
              <option>Cardiologia</option>
              <option>Pediatria</option>
            </select>
          </div>

          <div className="card">
            <label htmlFor="horario-profissional">Horário</label>
            <input id="horario-profissional" type="time" />
          </div>
        </div>
      </main>
    </section>
  )
}

function NoShowScreen({ activeScreen, onNavigate }) {
  return (
    <section className="screen active">
      <Sidebar activeScreen={activeScreen} onNavigate={onNavigate} />

      <main className="main">
        <h1>Nova Vaga No-Show</h1>

        <form className="form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="profissional">Profissional</label>
          <select id="profissional" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option>Dra. Ana Martins</option>
            <option>Dr. Bruno Souza</option>
          </select>

          <label htmlFor="especialidade-noshow">Especialidade</label>
          <select id="especialidade-noshow" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option>Clínica médica</option>
            <option>Cardiologia</option>
            <option>Pediatria</option>
          </select>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="unidade">Unidade</label>
              <select id="unidade" defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                <option>Unidade Centro</option>
                <option>Unidade Norte</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="data-noshow">Data</label>
              <input id="data-noshow" type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="horario-noshow">Horário</label>
              <input id="horario-noshow" type="time" />
            </div>

            <div className="form-group">
              <label>Tipo</label>
              <div className="alert-box">No-show</div>
            </div>
          </div>

          <button type="button" className="full-btn">
            Cadastrar Vaga
          </button>
        </form>
      </main>
    </section>
  )
}

function App() {
  const [activeScreen, setActiveScreen] = useState(screens.login)

  if (activeScreen === screens.login) {
    return <LoginScreen onNavigate={setActiveScreen} />
  }

  if (activeScreen === screens.agenda) {
    return <AgendaScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />
  }

  if (activeScreen === screens.profissionais) {
    return (
      <ProfissionaisScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />
    )
  }

  if (activeScreen === screens.noshow) {
    return <NoShowScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />
  }

  return <DashboardScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />
}

export default App
