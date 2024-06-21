import { RequestHandler } from 'express'
import checkupsService from '../services/checkups.service'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'
import checkupsValidator from '../validators/checkups.validator'

const validateCheckupExistance: RequestHandler = async (req, res, next) => {
  const checkupId = +req.params.checkupId

  const targetCheckup = await checkupsService.getSingleCheckup(checkupId, (req as any).user.id)

  if (!targetCheckup) {
    return customResponseUtil.errorResponse(res, HttpCode.NOT_FOUND, 'Checkup not found')
  }

  next()
}

const validateCheckupIdParam: RequestHandler = async (req, res, next) => {
  const checkupId = +req.params.checkupId

  if (!checkupId) {
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, 'Invalid Checkup ID parameter')
  }

  next()
}

const validateCreateCheckup: RequestHandler = async (req, res, next) => {
  const validatorResult: any = checkupsValidator.CreateCheckup.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error: any) => error.message).join('; ')
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, `Checkup is not valid: [${errorMessage}]`)
  }

  const targetCheckup = await checkupsService.getCheckupByPatientId(req.body.patientId)

  if (targetCheckup[0]) {
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, 'Checkup already exists for this patient')
  }

  next()
}

const validateUpdateCheckup: RequestHandler = async (req, res, next) => {
  const validatorResult: any = checkupsValidator.UpdateCheckup.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error: any) => error.message).join('; ')
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
