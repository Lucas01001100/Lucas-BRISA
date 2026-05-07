export const initialData = {
  professionals: [],
  patients: [],
  vacancies: [],
  notifications: [],
  logs: [],
}

export function expireVacancies(data) {
  const currentTime = new Date()
  const expiredVacancies = data.vacancies.map((vacancy) => {
    if (vacancy.status === 'aberta' && new Date(vacancy.expiresAt) < currentTime) {
      return { ...vacancy, status: 'expirada' }
    }

    return vacancy
  })

  return { ...data, vacancies: expiredVacancies }
}

export function createPatient(data, patient) {
  const nextPatient = {
    id: `pac-${Date.now()}`,
    name: patient.name.trim(),
    email: patient.email.trim().toLowerCase(),
    phone: patient.phone.trim(),
    specialty: patient.specialty,
    joinedAt: new Date().toISOString(),
    status: 'ativo',
  }

  return {
    ...data,
    patients: [...data.patients, nextPatient],
    logs: [
      createLog('paciente_cadastrado', `${nextPatient.name} entrou na fila de ${nextPatient.specialty}.`),
      ...data.logs,
    ],
  }
}

export function createProfessional(data, professional) {
  const nextProfessional = {
    id: `prof-${Date.now()}`,
    name: professional.name.trim(),
    crm: professional.crm.trim(),
    specialty: professional.specialty,
    schedule: professional.schedule,
  }

  return {
    ...data,
    professionals: [...data.professionals, nextProfessional],
    logs: [
      createLog('profissional_cadastrado', `${nextProfessional.name} cadastrado em ${nextProfessional.specialty}.`),
      ...data.logs,
    ],
  }
}

export function createVacancy(data, vacancy) {
  const professional = data.professionals.find((item) => item.id === vacancy.professionalId)
  const eligiblePatients = getQueueBySpecialty(data.patients, vacancy.specialty)
  const nowIso = new Date().toISOString()
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + Number(vacancy.timeoutMinutes))

  const nextVacancy = {
    id: `vaga-${Date.now()}`,
    professionalId: vacancy.professionalId,
    professionalName: professional?.name ?? 'Profissional nao informado',
    specialty: vacancy.specialty,
    unit: vacancy.unit,
    date: vacancy.date,
    time: vacancy.time,
    status: 'aberta',
    createdAt: nowIso,
    expiresAt: expiresAt.toISOString(),
    confirmedPatientId: null,
    eligiblePatientIds: eligiblePatients.map((patient) => patient.id),
  }

  const notifications = eligiblePatients.map((patient, index) => ({
    id: `notif-${Date.now()}-${index}`,
    vacancyId: nextVacancy.id,
    patientId: patient.id,
    channel: 'WhatsApp',
    status: 'enviada',
    createdAt: nowIso,
  }))

  return {
    ...data,
    vacancies: [nextVacancy, ...data.vacancies],
    notifications: [...notifications, ...data.notifications],
    logs: [
      createLog(
        'vaga_criada',
        `${nextVacancy.specialty} em ${nextVacancy.unit} ofertada para ${eligiblePatients.length} pacientes elegiveis.`,
      ),
      ...data.logs,
    ],
  }
}

export function acceptVacancy(data, vacancyId, patientId) {
  const vacancy = data.vacancies.find((item) => item.id === vacancyId)
  const patient = data.patients.find((item) => item.id === patientId)

  if (!vacancy || !patient) {
    return data
  }

  if (vacancy.status !== 'aberta' || vacancy.confirmedPatientId) {
    return {
      ...data,
      logs: [
        createLog('aceite_recusado', `${patient.name} tentou aceitar uma vaga indisponivel.`),
        ...data.logs,
      ],
    }
  }

  if (!vacancy.eligiblePatientIds.includes(patientId)) {
    return {
      ...data,
      logs: [
        createLog('aceite_recusado', `${patient.name} nao era elegivel para ${vacancy.specialty}.`),
        ...data.logs,
      ],
    }
  }

  if (new Date(vacancy.expiresAt) < new Date()) {
    return {
      ...data,
      vacancies: data.vacancies.map((item) =>
        item.id === vacancyId ? { ...item, status: 'expirada' } : item,
      ),
      logs: [
        createLog('vaga_expirada', `${vacancy.specialty} expirou antes do aceite.`),
        ...data.logs,
      ],
    }
  }

  return {
    ...data,
    vacancies: data.vacancies.map((item) =>
      item.id === vacancyId
        ? { ...item, status: 'confirmada', confirmedPatientId: patientId }
        : item,
    ),
    notifications: data.notifications.map((notification) => {
      if (notification.vacancyId !== vacancyId) {
        return notification
      }

      return {
        ...notification,
        status: notification.patientId === patientId ? 'confirmada' : 'indisponivel',
      }
    }),
    logs: [
      createLog('vaga_confirmada', `${patient.name} confirmou a vaga de ${vacancy.specialty}.`),
      ...data.logs,
    ],
  }
}

export function getQueueBySpecialty(patients, specialty) {
  return patients
    .filter((patient) => patient.status === 'ativo' && patient.specialty === specialty)
    .sort((first, second) => new Date(first.joinedAt) - new Date(second.joinedAt))
}

export function getDashboardMetrics(data) {
  const open = data.vacancies.filter((vacancy) => vacancy.status === 'aberta').length
  const confirmed = data.vacancies.filter((vacancy) => vacancy.status === 'confirmada').length
  const expired = data.vacancies.filter((vacancy) => vacancy.status === 'expirada').length
  const confirmedPatients = data.vacancies.filter((vacancy) => vacancy.confirmedPatientId).length

  return { open, confirmed, expired, confirmedPatients }
}

function createLog(type, message) {
  return {
    id: `log-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    message,
    createdAt: new Date().toISOString(),
  }
}
