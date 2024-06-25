import Role from '../types/role.types'

interface UpdateAdmin {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  phoneNumber?: string
  profileImagePublicId?: string
  profileImage?: Express.Multer.File
  role: Role
}

export { UpdateAdmin }
