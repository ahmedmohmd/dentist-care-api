import { RequestHandler } from 'express'
import adminsService from '../services/admins.service'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'

const getSingleAdmin: RequestHandler<{ adminId: string }> = async (req, res) => {
  const adminId = +req.params.adminId

  const targetAdmin = await adminsService.getSingleAdmin(adminId)

  return customResponseUtil.successResponse(res, HttpCode.OK, targetAdmin)
}

const updateAdmin: RequestHandler<{ adminId: string }> = async (req, res) => {
  const adminId = +req.params.adminId
  const profileImage: Express.Multer.File | undefined = req.file

  const targetAdmin = await adminsService.getSingleAdmin(adminId)

  const patientData = Object.assign({}, req.body, {
    profileImagePublicId: targetAdmin?.profileImage,
    profileImage: profileImage
  })

  await adminsService.updateAdmin(adminId, patientData)

  return customResponseUtil.successResponse(res, HttpCode.CREATED, patientData)
}

const deleteAdmin: RequestHandler<{ adminId: string }> = async (req, res) => {
  const adminId = +req.params.adminId

  await adminsService.deleteAdmin(adminId)

  return customResponseUtil.successResponse(res, HttpCode.NO_CONTENT, 'Admin Deleted Successfully')
}

const convertToAdmin: RequestHandler<{ moderatorId: string }> = async (req, res) => {
  const moderatorId = +req.params.moderatorId

  await adminsService.convertToAdmin(moderatorId)

  return customResponseUtil.successResponse(res, HttpCode.CREATED, 'User converted to Admin Successfully')
}

const convertToModerator: RequestHandler<{ adminId: string }> = async (req, res) => {
  const adminId = +req.params.adminId

  await adminsService.convertToModerator(adminId)

  return customResponseUtil.successResponse(res, HttpCode.CREATED, 'User converted to Moderator Successfully')
}

export default {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  convertToAdmin,
  convertToModerator
}
