import { useMemo, useState } from 'react'
import './App.css'
import Agenda from './pages/Agenda.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import NoShow from './pages/NoShow.jsx'
import Profissionais from './pages/Profissionais.jsx'
import { createSession, logout } from './services/auth.js'
import {
  acceptVacancy,
  createPatient,
  createProfessional,
  createVacancy,
  expireVacancies,
  initialData,
} from './services/api.js'

const screens = {
  login: 'login',
  dashboard: 'dashboard',
  agenda: 'agenda',
  profissionais: 'profissionais',
  noshow: 'noshow',
}

const adminScreens = new Set([
  screens.dashboard,
  screens.agenda,
  screens.profissionais,
  screens.noshow,
])

function App() {
  const [activeScreen, setActiveScreen] = useState(screens.login)
  const [session, setSession] = useState(null)
  const [data, setData] = useState(() => expireVacancies(initialData))
  const currentPatient = useMemo(
    () => data.patients.find((patient) => patient.id === session?.patientId),
    [data.patients, session],
  )

  function navigate(nextScreen) {
    if (!session) {
      setActiveScreen(screens.login)
      return
    }

    if (session.role === 'paciente' && nextScreen !== screens.dashboard) {
      setActiveScreen(screens.dashboard)
      return
    }

    if (session.role === 'administrador' && adminScreens.has(nextScreen)) {
      setActiveScreen(nextScreen)
    }
  }

  function handleLogin(credentials) {
    const nextSession = createSession(credentials, data.patients)
    setSession(nextSession)
    setActiveScreen(screens.dashboard)
  }

  function handleLogout() {
    setSession(logout())
    setActiveScreen(screens.login)
  }

  function handleCreatePatient(patient) {
    setData((currentData) => createPatient(currentData, patient))
  }

  function handleCreateProfessional(professional) {
    setData((currentData) => createProfessional(currentData, professional))
  }

  function handleCreateVacancy(vacancy) {
    setData((currentData) => createVacancy(currentData, vacancy))
    setActiveScreen(screens.dashboard)
  }

  function handleAcceptVacancy(vacancyId, patientId = session?.patientId) {
    if (!patientId) {
      return
    }

    setData((currentData) => acceptVacancy(currentData, vacancyId, patientId))
  }

  if (!session) {
    return (
      <Login
        patients={data.patients}
        onCreatePatient={handleCreatePatient}
        onLogin={handleLogin}
      />
    )
  }

  const commonProps = {
    activeScreen,
    currentPatient,
    data,
    onAcceptVacancy: handleAcceptVacancy,
    onLogout: handleLogout,
    onNavigate: navigate,
    session,
  }

  if (activeScreen === screens.agenda) {
    return <Agenda {...commonProps} />
  }

  if (activeScreen === screens.profissionais) {
    return (
      <Profissionais
        {...commonProps}
        onCreateProfessional={handleCreateProfessional}
      />
    )
  }

  if (activeScreen === screens.noshow) {
    return <NoShow {...commonProps} onCreateVacancy={handleCreateVacancy} />
  }

  return <Dashboard {...commonProps} />
}

export default App
