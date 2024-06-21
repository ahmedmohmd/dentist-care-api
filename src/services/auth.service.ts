import createHttpError from 'http-errors'
import prisma from '../../db/prisma'
import { SignUp } from '../dto/auth.dto'
import { SignInData } from '../types/auth.types'
import Role from '../types/role.types'
import hashPasswordUtil from '../utils/hash-password.util'
import HttpCode from '../utils/http-status-code.util'
import jwtUtil from '../utils/jwt.util'
import { RequestError } from '../utils/request-error.util'

/**
 * Sign in a user with the provided email, password, and role.
 *
 * @param {SignInData} email - The email of the user signing in.
 * @param {SignInData} password - The password of the user signing in.
 * @param {SignInData} role - The role of the user signing in.
 * @return {Promise<string>} A token representing the user's authentication.
 */
const signIn = async ({ email, password, role }: SignInData) => {
  if (!email || !password) {
    throw new createHttpError.BadRequest('Email or Password is not Valid')
  }

  let targetUser = await prisma.user.findUnique({
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

/**
 * Creates a new user account by signing up with the provided patient data.
 *
 * @param {any} patientData - The data of the patient for creating the account.
 * @return {any} The newly created user data.
 */
const signUp = async (patientData: SignUp) => {
  return prisma.user.create({
    data: {
      address: patientData.address,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      email: patientData.email,
      password: await hashPasswordUtil.encrypt(patientData.password),
      phoneNumber: patientData.phoneNumber,
      role: patientData.role,
      profileImagePublicId: patientData.profileImagePublicId,
      profileImage: patientData.profileImage
    }
  })
}

export default { signIn, signUp }
