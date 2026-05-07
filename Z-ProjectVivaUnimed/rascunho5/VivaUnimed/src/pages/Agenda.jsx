import { useMemo, useState } from 'react'
import Card from '../components/Card.jsx'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'

const months = [
  'Janeiro',
  'Fevereiro',
  'Marco',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

function Agenda({ activeScreen, data, onLogout, onNavigate, session }) {
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
  const currentYear = today.getFullYear()

  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate()

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1
      const date = new Date(currentYear, selectedMonth, day)
      const dateKey = [
        currentYear,
        String(selectedMonth + 1).padStart(2, '0'),
        String(day).padStart(2, '0'),
      ].join('-')

      return {
        dateKey,
        day,
        weekDay: date.getDay(),
        vacancies: data.vacancies.filter((vacancy) => vacancy.date === dateKey),
      }
    })
  }, [currentYear, data.vacancies, selectedMonth])

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
          subtitle="Consultas e vagas remanescentes cadastradas manualmente."
          title="Agenda"
        />

        <Card>
          <div className="calendar-toolbar">
            <div>
              <label htmlFor="agenda-month">Mes</label>
              <select
                id="agenda-month"
                onChange={(event) => setSelectedMonth(Number(event.target.value))}
                value={selectedMonth}
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="agenda-year">Ano</label>
              <input id="agenda-year" readOnly value={currentYear} />
            </div>
          </div>

          <div className="calendar-weekdays">
            {weekDays.map((weekDay) => (
              <span key={weekDay}>{weekDay}</span>
            ))}
          </div>

          <div className="month-calendar">
            {calendarDays.map((calendarDay, index) => (
              <article
                className="calendar-day"
                key={calendarDay.dateKey}
                style={index === 0 ? { gridColumnStart: calendarDay.weekDay + 1 } : null}
              >
                <strong>{calendarDay.day}</strong>
                {calendarDay.vacancies.map((vacancy) => (
                  <div className={`day-event ${vacancy.status}`} key={vacancy.id}>
                    <span>{vacancy.time}</span>
                    <small>{vacancy.specialty}</small>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}

export default Agenda
