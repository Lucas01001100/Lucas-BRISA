import { useState } from 'react'
import Button from '../components/Button.jsx'

const specialties = [
  'Especialidade 1',
  'Especialidade 2',
  'Especialidade 3',
  'Especialidade N',
]

function Login({ onCreatePatient, onLogin, patients }) {
  const [accessType, setAccessType] = useState('administrador')
  const [showPatientRegister, setShowPatientRegister] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loginForm, setLoginForm] = useState({
    email: 'admin@vivaunimed.com',
    password: 'admin123',
  })
  const [patientForm, setPatientForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: specialties[0],
  })

  function handleLogin(event) {
    event.preventDefault()
    setFeedback('')

    try {
      onLogin({ ...loginForm, role: accessType })
    } catch (error) {
      setFeedback(error.message)
    }
  }

  function handleAccessChange(nextAccessType) {
    setAccessType(nextAccessType)
    setFeedback('')
    setShowPatientRegister(false)
    setLoginForm({
      email: nextAccessType === 'administrador' ? 'admin@vivaunimed.com' : '',
      password: nextAccessType === 'administrador' ? 'admin123' : '',
    })
  }

  function handlePatientSubmit(event) {
    event.preventDefault()
    setFeedback('')

    const emailExists = patients.some(
      (patient) => patient.email.toLowerCase() === patientForm.email.trim().toLowerCase(),
    )

    if (emailExists) {
      setFeedback('Ja existe um paciente com este e-mail.')
      return
    }

    if (!patientForm.name || !patientForm.email || !patientForm.phone) {
      setFeedback('Preencha todos os campos do cadastro.')
      return
    }

    onCreatePatient(patientForm)
    setLoginForm({ email: patientForm.email, password: '' })
    setPatientForm({ name: '', email: '', phone: '', specialty: specialties[0] })
    setShowPatientRegister(false)
    setFeedback('Paciente cadastrado. Use qualquer senha com 6 ou mais caracteres.')
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <strong className="login-brand">VivaUnimed</strong>

        <div className="access-switch" role="tablist" aria-label="Tipo de acesso">
          <button
            aria-selected={accessType === 'administrador'}
            className={accessType === 'administrador' ? 'active' : ''}
            onClick={() => handleAccessChange('administrador')}
            type="button"
          >
            Administrador
          </button>
          <button
            aria-selected={accessType === 'paciente'}
            className={accessType === 'paciente' ? 'active' : ''}
            onClick={() => handleAccessChange('paciente')}
            type="button"
          >
            Paciente
          </button>
        </div>

        <form className="stack login-form" onSubmit={handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            onChange={(event) =>
              setLoginForm({ ...loginForm, email: event.target.value })
            }
            type="email"
            value={loginForm.email}
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            onChange={(event) =>
              setLoginForm({ ...loginForm, password: event.target.value })
            }
            type="password"
            value={loginForm.password}
          />

          {feedback ? <p className="feedback">{feedback}</p> : null}
          <Button className="full" type="submit">
            Entrar
          </Button>

          {accessType === 'paciente' ? (
            <button
              className="link-button"
              onClick={() => {
                setFeedback('')
                setShowPatientRegister((currentValue) => !currentValue)
              }}
              type="button"
            >
              {showPatientRegister ? 'Ocultar cadastro' : 'Cadastrar paciente'}
            </button>
          ) : null}
        </form>

        {showPatientRegister && accessType === 'paciente' ? (
          <form className="stack patient-register-form" onSubmit={handlePatientSubmit}>
            <label htmlFor="patient-name">Nome</label>
            <input
              id="patient-name"
              onChange={(event) =>
                setPatientForm({ ...patientForm, name: event.target.value })
              }
              value={patientForm.name}
            />

            <label htmlFor="patient-email">E-mail</label>
            <input
              id="patient-email"
              onChange={(event) =>
                setPatientForm({ ...patientForm, email: event.target.value })
              }
              type="email"
              value={patientForm.email}
            />

            <label htmlFor="patient-phone">WhatsApp</label>
            <input
              id="patient-phone"
              onChange={(event) =>
                setPatientForm({ ...patientForm, phone: event.target.value })
              }
              value={patientForm.phone}
            />

            <label htmlFor="patient-specialty">Especialidade desejada</label>
            <select
              id="patient-specialty"
              onChange={(event) =>
                setPatientForm({ ...patientForm, specialty: event.target.value })
              }
              value={patientForm.specialty}
            >
              {specialties.map((specialty) => (
                <option key={specialty}>{specialty}</option>
              ))}
            </select>

            {feedback ? <p className="feedback">{feedback}</p> : null}
            <Button className="full" type="submit">
              Cadastrar
            </Button>
          </form>
        ) : null}
      </section>
    </main>
  )
}

export default Login
