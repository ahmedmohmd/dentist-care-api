import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import patientsService from '../services/patients.service'
import patientsValidator from '../validators/patients.validator'

const isPatientExists: RequestHandler = async (req, res, next) => {
  const patientId = +req.params.patientId
  const targetPatient = await patientsService.getSinglePatient(patientId)

  if (!targetPatient) {
    throw new createHttpError.NotFound('patient not found.')
  }

  next()
}

const validatePatientIdParam: RequestHandler = async (req, res, next) => {
  const { patientId } = req.params
  const isNotValidPatientId = isNaN(+patientId)

  if (isNotValidPatientId) {
    throw new createHttpError.BadRequest('patient id should be number.')
  }

  next()
}

const validateUpdatePatient: RequestHandler = async (req, res, next) => {
  const validatorResult = patientsValidator.updatePatientValidator.safeParse(req.body)

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors.map((error) => error.message).join('; ')

    throw new createHttpError.BadRequest(`Patient is not valid: [${errorMessage}]`)
  }

  next()
}

export default { isPatientExists, validatePatientIdParam, validateUpdatePatient }
