import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { getDashboardMetrics, getQueueBySpecialty } from '../services/api.js'

function Dashboard({
  activeScreen,
  currentPatient,
  data,
  onAcceptVacancy,
  onLogout,
  onNavigate,
  session,
}) {
  if (session.role === 'paciente') {
    return (
      <main className="patient-dashboard">
        <Header
          onLogout={onLogout}
          session={session}
          subtitle="Acompanhe ofertas disponiveis e aceite rapidamente."
          title="Area do paciente"
        />

        <div className="content-grid two">
          <Card>
            <h2>Minha fila</h2>
            <p className="muted">
              Especialidade: <strong>{currentPatient?.specialty}</strong>
            </p>
            <ol className="queue-list">
              {getQueueBySpecialty(data.patients, currentPatient?.specialty).map(
                (patient) => (
                  <li
                    className={patient.id === currentPatient?.id ? 'current' : ''}
                    key={patient.id}
                  >
                    {patient.name}
                  </li>
                ),
              )}
            </ol>
          </Card>

          <Card>
            <h2>Ofertas recebidas</h2>
            <div className="stack">
              {data.vacancies
                .filter(
                  (vacancy) =>
                    vacancy.status === 'aberta' &&
                    vacancy.eligiblePatientIds.includes(currentPatient?.id),
                )
                .map((vacancy) => (
                  <article className="offer" key={vacancy.id}>
                    <strong>{vacancy.specialty}</strong>
                    <span>
                      {vacancy.professionalName} - {vacancy.unit}
                    </span>
                    <span>
                      {vacancy.date} as {vacancy.time}
                    </span>
                    <Button onClick={() => onAcceptVacancy(vacancy.id)}>
                      Aceitar vaga
                    </Button>
                  </article>
                ))}
            </div>
          </Card>
        </div>
      </main>
    )
  }

  const metrics = getDashboardMetrics(data)
  const recentLogs = data.logs.slice(0, 6)

  return (
    <div className="app-shell">
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={onNavigate}
        session={session}
      />
      <main className="main">
        <Header
          onLogout={onLogout}
          session={session}
          subtitle="Resumo operacional do preenchimento de vagas."
          title="Dashboard"
        />

        <div className="metrics-grid">
          <Card className="metric-card">
            <span>Vagas abertas</span>
            <strong>{metrics.open}</strong>
          </Card>
          <Card className="metric-card success">
            <span>Confirmadas</span>
            <strong>{metrics.confirmed}</strong>
          </Card>
          <Card className="metric-card warning">
            <span>Expiradas</span>
            <strong>{metrics.expired}</strong>
          </Card>
          <Card className="metric-card">
            <span>Pacientes confirmados</span>
            <strong>{metrics.confirmedPatients}</strong>
          </Card>
        </div>

        <div className="content-grid two">
          <Card>
            <h2>Vagas recentes</h2>
            <div className="table-list">
              {data.vacancies.map((vacancy) => (
                <div className="table-row" key={vacancy.id}>
                  <div>
                    <strong>{vacancy.specialty}</strong>
                    <span>{vacancy.professionalName}</span>
                  </div>
                  <div>
                    <span>{vacancy.date}</span>
                    <span>{vacancy.time}</span>
                  </div>
                  <span className={`status ${vacancy.status}`}>{vacancy.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2>Historico</h2>
            <div className="timeline">
              {recentLogs.map((log) => (
                <article key={log.id}>
                  <strong>{log.type}</strong>
                  <p>{log.message}</p>
                  <small>{new Date(log.createdAt).toLocaleString('pt-BR')}</small>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
