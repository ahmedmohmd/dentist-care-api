import { User } from '@prisma/client'

type UserProp = {
  user: User
}

export type CustomRequest = Request & UserProp
