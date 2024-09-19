import { User } from '@prisma/client'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import checkupsService from '../services/checkups.service'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'
import checkupsValidator from '../validators/checkups.validator'

interface CustomRequest extends Request {
  user: User
}

const validateCheckupExistance = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const checkupId = +req.params.checkupId

  const targetCheckup = await checkupsService.getSingleCheckup(checkupId, req.user.id)

  if (!targetCheckup) {
    return customResponseUtil.errorResponse(res, HttpCode.NOT_FOUND, 'Checkup not found')
  }

  next()
}

const validateCheckupIdParam: RequestHandler = async (req, res, next) => {
  const checkupId = +req.params.checkupId

  if (isNaN(checkupId)) {
    throw new createHttpError.BadRequest('Invalid Checkup ID parameter')
  }

  next()
}

const validateCreateCheckup: RequestHandler = async (req, res, next) => {
  const validatorResult: any = checkupsValidator.CreateCheckup.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error) => error.message).join('; ')
    throw new createHttpError.BadRequest(`Checkup is not valid: [${errorMessage}]`)
  }

  const targetCheckup = await checkupsService.getCheckupByPatientId(req.body.patientId)

  if (targetCheckup[0]) {
    throw new createHttpError.BadRequest('Checkup already exists for this patient')
  }

  next()
}

const validateUpdateCheckup: RequestHandler = async (req, res, next) => {
  const validatorResult: any = checkupsValidator.UpdateCheckup.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error) => error.message).join('; ')
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, `Checkup is not valid: [${errorMessage}]`)
  }

  next()
}

export const checkupsMiddleware = {
  validateCheckupExistance,
  validateCheckupIdParam,
  validateCreateCheckup,
  validateUpdateCheckup
}
