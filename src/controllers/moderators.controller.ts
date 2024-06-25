import { RequestHandler } from 'express'
import moderatorsService from '../services/moderators.service'
import checkCheckupsQueryParams from '../utils/check-checkups-query-params.util'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'

const getAllModerators: RequestHandler = async (req, res) => {
  const { skip, take, sortingOrder } = checkCheckupsQueryParams(req, res)

  const allModerators = await moderatorsService.getAllModerators({
    skip,
    take,
    sortingOrder
  })

  return customResponseUtil.successResponse(res, HttpCode.OK, allModerators)
}

const getSingleModerator: RequestHandler<{ moderatorId: string }> = async (req, res) => {
  const moderatorId = +req.params.moderatorId

  const targetModerator = await moderatorsService.getSingleModerator(moderatorId)

  return customResponseUtil.successResponse(res, HttpCode.OK, targetModerator)
}

const createModerator: RequestHandler = async (req, res) => {
  const profileImage: Express.Multer.File | undefined = req.file

  const moderatorData = Object.assign({}, req.body, {
    profileImage: profileImage
  })

  const createdUser = await moderatorsService.createModerator(moderatorData)

  return res.json(createdUser)
}

const updateModerator: RequestHandler<{ moderatorId: string }> = async (req, res) => {
  const moderatorId = +req.params.moderatorId
  const profileImage: Express.Multer.File | undefined = req.file

  const targetModerator = await moderatorsService.getSingleModerator(moderatorId)

  const moderatorData = Object.assign({}, req.body, {
    profileImagePublicId: targetModerator?.profileImage,
    profileImage: profileImage
  })

  await moderatorsService.updateModerator(moderatorId, moderatorData)

  return customResponseUtil.successResponse(res, HttpCode.CREATED, moderatorData)
}

const deleteModerator: RequestHandler<{ moderatorId: string }> = async (req, res, next) => {
  try {
    const moderatorId = +req.params.moderatorId

    await moderatorsService.deleteModerator(moderatorId)

    return customResponseUtil.successResponse(res, HttpCode.NO_CONTENT, 'Moderator Deleted Successfully')
  } catch (error) {
    next(error)
  }
}

export default {
  getAllModerators,
  getSingleModerator,
  createModerator,
  updateModerator,
  deleteModerator
}
