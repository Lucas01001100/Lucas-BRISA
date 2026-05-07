export function createSession(credentials, patients) {
  const email = credentials.email.trim().toLowerCase()
  const role = credentials.role
  const passwordIsValid = credentials.password.trim().length >= 6

  if (!passwordIsValid) {
    throw new Error('A senha deve ter pelo menos 6 caracteres.')
  }

  if (role === 'administrador') {
    if (email !== 'admin@vivaunimed.com') {
      throw new Error('Administrador nao encontrado.')
    }

    return {
      id: 'session-admin',
      email,
      name: 'Administrador VivaUnimed',
      role: 'administrador',
    }
  }

  if (email === 'admin@vivaunimed.com') {
    throw new Error('Use o acesso de administrador para este e-mail.')
  }

  const patient = patients.find((item) => item.email.toLowerCase() === email)

  if (!patient) {
    throw new Error('Paciente nao encontrado. Cadastre-se antes de entrar.')
  }

  return {
    id: `session-${patient.id}`,
    email,
    name: patient.name,
    patientId: patient.id,
    role: 'paciente',
  }
}

export function logout() {
  return null
}
