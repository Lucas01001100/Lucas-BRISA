import { useMemo, useState } from 'react'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { getQueueBySpecialty } from '../services/api.js'

function NoShow({
  activeScreen,
  data,
  onAcceptVacancy,
  onCreateVacancy,
  onLogout,
  onNavigate,
  session,
}) {
  const firstProfessional = data.professionals[0]
  const [feedback, setFeedback] = useState('')
  const [form, setForm] = useState({
    professionalId: firstProfessional?.id ?? '',
    specialty: firstProfessional?.specialty ?? 'Especialidade 1',
    unit: 'Unidade Centro',
    date: new Date().toISOString().slice(0, 10),
    time: firstProfessional?.schedule ?? '08:00',
    timeoutMinutes: 30,
  })

  const eligiblePatients = useMemo(
    () => getQueueBySpecialty(data.patients, form.specialty),
    [data.patients, form.specialty],
  )

  function handleProfessionalChange(professionalId) {
    const professional = data.professionals.find((item) => item.id === professionalId)
    setForm({
      ...form,
      professionalId,
      specialty: professional?.specialty ?? form.specialty,
      time: professional?.schedule ?? form.time,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!data.professionals.length) {
      setFeedback('Cadastre um profissional antes de criar uma vaga.')
      return
    }

    if (!form.professionalId || !form.date || !form.time || !form.unit) {
      setFeedback('Preencha todos os campos da vaga.')
      return
    }

    onCreateVacancy(form)
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
          subtitle="Crie a vaga, acione pacientes elegiveis e bloqueie no primeiro aceite."
          title="Cadastro de vaga no-show"
        />

        <div className="content-grid two">
          <Card>
            <form className="stack" onSubmit={handleSubmit}>
              <label htmlFor="vacancy-professional">Profissional</label>
              <select
                id="vacancy-professional"
                onChange={(event) => handleProfessionalChange(event.target.value)}
                value={form.professionalId}
              >
                {!data.professionals.length ? (
                  <option value="">Nenhum profissional cadastrado</option>
                ) : null}
                {data.professionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.name}
                  </option>
                ))}
              </select>

              <label htmlFor="vacancy-specialty">Especialidade</label>
              <input id="vacancy-specialty" readOnly value={form.specialty} />

              <div className="form-row">
                <div>
                  <label htmlFor="vacancy-unit">Unidade</label>
                  <select
                    id="vacancy-unit"
                    onChange={(event) => setForm({ ...form, unit: event.target.value })}
                    value={form.unit}
                  >
                    <option>Unidade Centro</option>
                    <option>Unidade Norte</option>
                    <option>Unidade Sul</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vacancy-timeout">Timeout</label>
                  <select
                    id="vacancy-timeout"
                    onChange={(event) =>
                      setForm({ ...form, timeoutMinutes: event.target.value })
                    }
                    value={form.timeoutMinutes}
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label htmlFor="vacancy-date">Data</label>
                  <input
                    id="vacancy-date"
                    onChange={(event) => setForm({ ...form, date: event.target.value })}
                    type="date"
                    value={form.date}
                  />
                </div>

                <div>
                  <label htmlFor="vacancy-time">Horario</label>
                  <input
                    id="vacancy-time"
                    onChange={(event) => setForm({ ...form, time: event.target.value })}
                    type="time"
                    value={form.time}
                  />
                </div>
              </div>

              {feedback ? <p className="feedback">{feedback}</p> : null}
              <Button className="full" type="submit">
                Cadastrar vaga e notificar
              </Button>
            </form>
          </Card>

          <Card>
            <h2>Fila elegivel</h2>
            {eligiblePatients.length ? (
              <ol className="queue-list">
                {eligiblePatients.map((patient) => (
                  <li key={patient.id}>
                    <span>{patient.name}</span>
                    <small>{patient.phone}</small>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="muted">Nenhum paciente elegivel para esta especialidade.</p>
            )}
          </Card>
        </div>

        <Card>
          <h2>Vagas abertas</h2>
          {data.vacancies.filter((vacancy) => vacancy.status === 'aberta').length ? (
            <div className="table-list">
              {data.vacancies
                .filter((vacancy) => vacancy.status === 'aberta')
                .map((vacancy) => (
                <div className="table-row" key={vacancy.id}>
                  <div>
                    <strong>{vacancy.specialty}</strong>
                    <span>
                      {vacancy.professionalName} - {vacancy.unit}
                    </span>
                  </div>
                  <span>
                    {vacancy.date} as {vacancy.time}
                  </span>
                  <Button
                    onClick={() =>
                      onAcceptVacancy(vacancy.id, vacancy.eligiblePatientIds[0])
                    }
                    variant="secondary"
                  >
                    Simular primeiro aceite
                  </Button>
                </div>
                ))}
            </div>
          ) : (
            <p className="muted">Nenhuma vaga aberta no momento.</p>
          )}
        </Card>
      </main>
    </div>
  )
}

export default NoShow
