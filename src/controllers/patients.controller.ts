import { RequestHandler } from 'express'
import patientsService from '../services/patients.service'
import cacheUtil from '../utils/cache.util'
import checkCheckupsQueryParams from '../utils/check-checkups-query-params.util'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'

const getAllPatients: RequestHandler = async (req, res) => {
  const { skip, take, sortingOrder } = checkCheckupsQueryParams(req, res)

  const patientsFromCache = await cacheUtil.get(`patients:page=${skip}:limit=${take}:order=${sortingOrder}`)

  if (patientsFromCache) {
    return customResponseUtil.successResponse(res, HttpCode.OK, patientsFromCache)
  }

  const allPatients = await patientsService.getAllPatients({
    skip,
    take,
    sortingOrder
  })

  await cacheUtil.set(`patients:page=${skip}:limit=${take}:order=${sortingOrder}`, allPatients)

  return customResponseUtil.successResponse(res, HttpCode.OK, allPatients)
}

const getSinglePatient: RequestHandler<{ patientId: string }> = async (req, res) => {
  const patientId = +req.params.patientId

  const targetPatient = await patientsService.getSinglePatient(patientId)

  return customResponseUtil.successResponse(res, HttpCode.OK, targetPatient)
}

const updatePatient: RequestHandler<{ patientId: string }> = async (req, res, next) => {
  try {
    const patientId = +req.params.patientId
    const profileImage: Express.Multer.File | undefined = req.file

    const targetPatient = await patientsService.getSinglePatient(patientId)

    const patientData = Object.assign({}, req.body, {
      profileImagePublicId: targetPatient?.profileImage,
      profileImage: profileImage
    })

    await patientsService.updatePatient(patientId, patientData)

    return customResponseUtil.successResponse(res, HttpCode.CREATED, patientData)
  } catch (error) {
    next(error)
  }
}

const deletePatient: RequestHandler<{ patientId: string }> = async (req, res, next) => {
  try {
    const patientId = +req.params.patientId

    await patientsService.deletePatient(patientId)

    return customResponseUtil.successResponse(res, HttpCode.NO_CONTENT, 'Patient Deleted Successfully')
  } catch (error) {
    next(error)
  }
}

export default {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient
}
