import createHttpError from 'http-errors'
import prisma from '../../db/prisma'
import { SignUp } from '../types/auth.dto'
import { SignInData } from '../types/auth.types'
import hashPasswordUtil from '../utils/hash-password.util'
import jwtUtil from '../utils/jwt.util'
import { uploadImage } from './image.service'

const signIn = async ({ email, password, role }: SignInData) => {
  if (!email || !password) {
    throw new createHttpError.BadRequest('Email or Password is not Valid')
  }

  const targetUser = await prisma.user.findUnique({
    where: {
      email: email,
      role: role
    }
  })

  if (!targetUser) {
    throw new createHttpError.NotFound(`${role.toLowerCase()} not found!`)
  }

  const passwordValidationResult = await hashPasswordUtil.check(password, targetUser.password)

  if (!passwordValidationResult) {
    throw new createHttpError.BadRequest(`Sorry, ${role.toLowerCase()} Password is Incorrect`)
  }

  const token = await jwtUtil.generateWebToken(targetUser)

  return token
}

const signUp = async (patientData: SignUp) => {
  const { imageId, imageUrl } = await uploadImage(patientData.profileImage)

  const createdPatientData = Object.assign({}, patientData, {
    profileImagePublicId: imageId,
    profileImage: imageUrl,
    password: await hashPasswordUtil.encrypt(patientData.password)
  })

  const createdPatient = await prisma.user.create({
    data: createdPatientData
  })

  const token = await jwtUtil.generateWebToken({
    id: createdPatient.id,
    firstName: createdPatient.firstName,
    lastName: createdPatient.lastName,
    email: createdPatient.email,
    profileImage: createdPatient.profileImage,
    phoneNumber: createdPatient.phoneNumber,
    address: createdPatient.address,
    role: createdPatient.role
  })

  return {
    user: createdPatient,
    token
  }
}

export default { signIn, signUp }
