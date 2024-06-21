import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import constantsConfig from '../../config/constants.config'
import { CreatePatient } from '../dto/patients.dto'
import authService from '../services/auth.service'
import patientsService from '../services/patients.service'
import { SignInData } from '../types/auth.types'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'
import jwtUtil from '../utils/jwt.util'
import handleUpload from '../utils/upload-file.util'
import authValidator from '../validators/auth.validator'
import patientsValidator from '../validators/patients.validator'

const signIn: RequestHandler = async (req, res, next) => {
  const { email, password, role } = req.body

  const signInDataValidationResult: any = authValidator.SignIn.safeParse(req.body)

  if (!signInDataValidationResult.success) {
    throw new createHttpError.BadRequest(`Email or Password is not Valid`)
  }

  const signInData: SignInData = {
    email,
    password,
    role
  }

  const token = await authService.signIn(signInData)

  if (!token) {
    throw new createHttpError.Unauthorized('invalid credentials')
  }

  return customResponseUtil.successResponse(res, HttpCode.OK, {
    token
  })
}

const signUp: RequestHandler = async (req, res, next) => {
  const profileImage: Express.Multer.File | undefined = req.file

  const patientDataValidationResult: any = patientsValidator.CreatePatient.safeParse(req.body as CreatePatient)

  if (!patientDataValidationResult.success) {
    throw new createHttpError.BadRequest('your data is not valid')
  }

  const targetPatient = await patientsService.getPatientByEmail(req.body.email)

  if (targetPatient) {
    throw new createHttpError.BadRequest('Patient is already Exists!')
  }

  let result: any

  if (profileImage) {
    result = await handleUpload(profileImage)
  }

  const patientData = Object.assign({}, req.body, {
    profileImagePublicId: result?.public_id || null,
    profileImage: result?.secure_url || constantsConfig.defaultProfileImage
  })

  const createdUser = await authService.signUp(patientData)

  const token = await jwtUtil.generateWebToken({
    id: createdUser.id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
    profileImage: createdUser.profileImage,
    phoneNumber: createdUser.phoneNumber,
    address: createdUser.address,
    role: createdUser.role
  })

  return res.json({
    user: createdUser,
    token
  })
}

export default { signIn, signUp }
