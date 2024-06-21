import { Role } from '@prisma/client'

export interface SignInData {
  email: string
  password: string
  role: Role
}
