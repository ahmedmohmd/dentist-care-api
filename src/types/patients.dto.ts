import { SignUp } from './auth.dto'

interface ProfileImagePublicId {
  profileImagePublicId?: string | null
}

type UpdatePatient = Partial<SignUp & ProfileImagePublicId>

export { UpdatePatient }
