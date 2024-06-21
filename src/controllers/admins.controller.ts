import { RequestHandler } from 'express'
import redisClient from '../../db/redis'
import { UpdateAdmin } from '../dto/admins.dto'
import adminsService from '../services/admins.service'
import cacheUtil from '../utils/cache.util'
import customResponseUtil from '../utils/custom-response.util'
import HttpCode from '../utils/http-status-code.util'

import cloudinary from '../utils/cloudinary.util'

const getSingleAdmin: RequestHandler<{ adminId: string }> = async (req, res, next) => {
  try {
    const adminId = +req.params.adminId

    const result = await cacheUtil.get('single-admin:' + adminId)

    if (result) {
      return customResponseUtil.successResponse(res, HttpCode.OK, JSON.parse(result))
    } else {
      const targetAdmin = await adminsService.getSingleAdmin(adminId)

      await cacheUtil.set('single-admin:' + adminId, targetAdmin)

      return customResponseUtil.successResponse(res, HttpCode.OK, targetAdmin)
    }
  } catch (error) {
    next(error)
  }
}

const updateAdmin: RequestHandler<{ adminId: string }> = async (req, res, next) => {
  try {
    const adminId = +req.params.adminId
    const { profileImagePublicId } = req.body as UpdateAdmin
    const { profileImage } = req.file as any

    if (profileImagePublicId) {
      await cloudinary.uploader.destroy(profileImagePublicId)
    }

    let result

    if (profileImage) {
      result = await cloudinary.uploader.upload(profileImage)
    }

    await adminsService.updateAdmin(adminId, {
      profileImagePublicId: result?.public_id || null,
      profileImage: result?.secure_url || null,
      ...req.body
    })

    return customResponseUtil.successResponse(res, HttpCode.CREATED, 'Admin Updated Successfully')
  } catch (error) {
    next(error)
  }
}

const deleteAdmin: RequestHandler<{ adminId: string }> = async (req, res, next) => {
  try {
    const adminId = +req.params.adminId

    await adminsService.deleteAdmin(adminId)

    return customResponseUtil.successResponse(res, HttpCode.NO_CONTENT, 'Admin Deleted Successfully')
  } catch (error) {
    next(error)
  }
}

const convertToAdmin: RequestHandler<{ moderatorId: string }> = async (req, res, next) => {
  try {
    const moderatorId = +req.params.moderatorId

    await adminsService.convertToAdmin(moderatorId)

    return customResponseUtil.successResponse(res, HttpCode.CREATED, 'User converted to Admin Successfully')
  } catch (error) {
    next(error)
  }
}

const convertToModerator: RequestHandler<{ adminId: string }> = async (req, res, next) => {
  try {
    const adminId = +req.params.adminId

    await adminsService.convertToModerator(adminId)

    return customResponseUtil.successResponse(res, HttpCode.CREATED, 'User converted to Moderator Successfully')
  } catch (error) {
    next(error)
  }
}

export default {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  convertToAdmin,
  convertToModerator
}
