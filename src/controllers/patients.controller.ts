import { RequestHandler } from 'express'
import patientsService from '../services/patients.service'
import checkCheckupsQueryParams from '../utils/check-checkups-query-params.util'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'

const getAllPatients: RequestHandler = async (req, res) => {
  const { skip, take, sortingOrder } = checkCheckupsQueryParams(req)

  const allPatients = await patientsService.getAllPatients({
    skip,
    take,
    sortingOrder
  })

  return customResponseUtil.successResponse(res, HttpCode.OK, allPatients)
}

const getSinglePatient: RequestHandler<{ patientId: string }> = async (req, res) => {
  const patientId = +req.params.patientId

  const targetPatient = await patientsService.getSinglePatient(patientId)

  return customResponseUtil.successResponse(res, HttpCode.OK, targetPatient)
}

const updatePatient: RequestHandler<{ patientId: string }> = async (req, res) => {
  const patientId = +req.params.patientId
  const profileImage: Express.Multer.File | undefined = req.file

  const targetPatient = await patientsService.getSinglePatient(patientId)

  const patientData = Object.assign({}, req.body, {
    profileImagePublicId: targetPatient?.profileImage,
    profileImage: profileImage
  })

  await patientsService.updatePatient(patientId, patientData)

  return customResponseUtil.successResponse(res, HttpCode.CREATED, patientData)
}

const deletePatient: RequestHandler<{ patientId: string }> = async (req, res) => {
  const patientId = +req.params.patientId

  await patientsService.deletePatient(patientId)

  return customResponseUtil.successResponse(res, HttpCode.NO_CONTENT, 'Patient Deleted Successfully')
}

export default {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient
}
