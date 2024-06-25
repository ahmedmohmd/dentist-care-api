enum CheckType {
  EXAMINATION = 'EXAMINATION',
  CONSULTATION = 'CONSULTATION'
}

type CreateCheckup = {
  date: string
  type: CheckType
  patientId: number
}

type UpdateCheckup = Partial<Omit<CreateCheckup, 'patientId'>>

export { CreateCheckup, UpdateCheckup }
