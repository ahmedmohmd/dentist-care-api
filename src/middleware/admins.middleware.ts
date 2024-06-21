import { RequestHandler } from 'express'
import adminsService from '../services/admins.service'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'
import adminsValidator from '../validators/admins.validator'

const validateAdminIdParam: RequestHandler = (req, res, next) => {
  const adminId = +req.params.adminId

  if (!adminId) {
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, 'Invalid Admin ID parameter')
  }

  next()
}

const validateAdminExistance: RequestHandler = async (req, res, next) => {
  try {
    const adminId = +req.params.adminId

    const targetAdmin = await adminsService.getSingleAdmin(adminId)

    if (!targetAdmin) {
      return customResponseUtil.errorResponse(res, HttpCode.NOT_FOUND, 'Admin not found')
    }

    next()
  } catch (error) {
    next(error)
  }
}

const validateUpdateAdmin: RequestHandler = (req, res, next) => {
  const validatorResult = adminsValidator.UpdateAdmin.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error) => error.message).join('; ')
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, `Admin is not valid: [${errorMessage}]`)
  }

  next()
}

export default {
  validateAdminExistance,
  validateAdminIdParam,
  validateUpdateAdmin
}
