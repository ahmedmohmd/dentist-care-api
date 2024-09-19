import { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import prisma from '../../db/prisma'
import patientsService from '../services/patients.service'
import jwtUtil from '../utils/jwt.util'
import authValidator from '../validators/auth.validator'

const authUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new createHttpError.Unauthorized('Access Denied: Missing or invalid authorization header.')
  }

  const token = authHeader.split(' ')[1]
  const decodedToken = await jwtUtil.verifyWebToken(token)

  if (!decodedToken || typeof decodedToken === 'string') {
    throw new createHttpError.Unauthorized('Access Denied: Invalid token provided')
  }

  const targetUser = await prisma.user.findUnique({
    where: { email: decodedToken.email, id: decodedToken.id }
  })

  if (!targetUser) {
    throw new createHttpError.Unauthorized('Access Denied: User not found or not authenticated')
  }

  Object.defineProperty(req, 'user', {
    value: decodedToken
  })

  next()
}

const validateSignIn: RequestHandler = async (req, res, next) => {
  const signInDataValidationResult: any = authValidator.signInValidator.safeParse(req.body)

  if (!signInDataValidationResult.success) {
    const errorMessage = signInDataValidationResult.error.errors.map((error) => error.message).join('; ')

    throw new createHttpError.BadRequest(`Email or Password is not Valid: [${errorMessage}]`)
  }

  next()
}

const validateSignUp: RequestHandler = async (req, res, next) => {
  const signUpValidatorResult: any = authValidator.signUpValidator.safeParse(req.body)

  if (!signUpValidatorResult.success) {
    const errorMessage = signUpValidatorResult.error.errors.map((error) => error.message).join('; ')
    throw new createHttpError.BadRequest(`Patient is not valid: [${errorMessage}]`)
  }

  const targetPatient = await patientsService.getPatientByEmail(req.body.email)

  if (targetPatient) {
    throw new createHttpError.BadRequest('patient already exists.')
  }

  next()
}

export default { authUser, validateSignUp, validateSignIn }
