import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import adminsService from '../services/admins.service'
import adminsValidator from '../validators/admins.validator'

const validateAdminIdParam: RequestHandler = (req, res, next) => {
  const adminId = +req.params.adminId

  if (isNaN(adminId)) {
    throw new createHttpError.BadRequest('Invalid Admin ID parameter')
  }

  next()
}

const validateAdminExistance: RequestHandler = async (req, res, next) => {
  const adminId = +req.params.adminId

  const targetAdmin = await adminsService.getSingleAdmin(adminId)

  if (!targetAdmin) {
    throw new createHttpError.NotFound('admin not found.')
  }

  next()
}

const validateUpdateAdmin: RequestHandler = (req, res, next) => {
  const validatorResult = adminsValidator.UpdateAdmin.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error) => error.message).join('; ')

    throw new createHttpError.BadRequest(`Admin is not valid: [${errorMessage}]`)
  }

  next()
}

export default {
  validateAdminExistance,
  validateAdminIdParam,
  validateUpdateAdmin
}
