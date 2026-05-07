import { useState } from 'react'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

const specialties = [
  'Especialidade 1',
  'Especialidade 2',
  'Especialidade 3',
  'Especialidade N',
]

function Profissionais({
  activeScreen,
  data,
  onCreateProfessional,
  onLogout,
  onNavigate,
  session,
}) {
  const [feedback, setFeedback] = useState('')
  const [form, setForm] = useState({
    name: '',
    crm: '',
    specialty: specialties[0],
    schedule: '08:00',
  })

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.name || !form.crm || !form.schedule) {
      setFeedback('Preencha todos os campos.')
      return
    }

    onCreateProfessional(form)
    setForm({ name: '', crm: '', specialty: specialties[0], schedule: '08:00' })
    setFeedback('Profissional cadastrado com sucesso.')
  }

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
          subtitle="Cadastro manual dos profissionais que podem receber vagas."
          title="Profissionais"
        />

        <div className="content-grid two">
          <Card>
            <form className="stack" onSubmit={handleSubmit}>
              <label htmlFor="professional-name">Nome</label>
              <input
                id="professional-name"
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                value={form.name}
              />

              <label htmlFor="professional-crm">CRM</label>
              <input
                id="professional-crm"
                onChange={(event) => setForm({ ...form, crm: event.target.value })}
                value={form.crm}
              />

              <label htmlFor="professional-specialty">Especialidade</label>
              <select
                id="professional-specialty"
                onChange={(event) =>
                  setForm({ ...form, specialty: event.target.value })
                }
                value={form.specialty}
              >
                {specialties.map((specialty) => (
                  <option key={specialty}>{specialty}</option>
                ))}
              </select>

              <label htmlFor="professional-schedule">Horario padrao</label>
              <input
                id="professional-schedule"
                onChange={(event) =>
                  setForm({ ...form, schedule: event.target.value })
                }
                type="time"
                value={form.schedule}
              />

              {feedback ? <p className="feedback success-text">{feedback}</p> : null}
              <Button className="full" type="submit">
                Salvar profissional
              </Button>
            </form>
          </Card>

          <Card>
            <h2>Profissionais cadastrados</h2>
            <div className="table-list compact">
              {data.professionals.map((professional) => (
                <div className="table-row" key={professional.id}>
                  <div>
                    <strong>{professional.name}</strong>
                    <span>{professional.crm}</span>
                  </div>
                  <span>{professional.specialty}</span>
                  <span>{professional.schedule}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Profissionais
