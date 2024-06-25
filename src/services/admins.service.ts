import createHttpError from 'http-errors'
import enumsConfig from '../../config/enums.config'
import prisma from '../../db/prisma'
import { UpdateAdmin } from '../dto/admins.dto'
import cacheUtil from '../utils/cache.util'
import hashPasswordUtil from '../utils/hash-password.util'
import { deleteImage, updateImage } from './image.service'

const getSingleAdmin = async (adminId: number) => {
  const result = await cacheUtil.get('single-admin:' + adminId)

  if (result) {
    return result
  } else {
    const targetAdmin = await prisma.user.findUnique({
      where: {
        id: adminId,
        role: enumsConfig.UserRole.ADMIN
      }
    })

    if (!targetAdmin) {
      throw createHttpError.NotFound('admin not found.')
    }

    await cacheUtil.set('single-admin:' + adminId, targetAdmin)

    return targetAdmin
  }
}

const updateAdmin = async (adminId: number, adminData: UpdateAdmin) => {
  const { newImageId, newImageUrl } = await updateImage(adminData?.profileImagePublicId, adminData?.profileImage)

  if (!adminData.profileImage) {
    throw new createHttpError.BadRequest('Image is not correct!')
  }

  const newAdminData = Object.assign({}, adminData, {
    profileImagePublicId: newImageId,
    profileImage: newImageUrl,

    password: adminData.password && (await hashPasswordUtil.encrypt(adminData.password))
  })

  return prisma.user.update({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    },

    data: newAdminData
  })
}

const deleteAdmin = async (adminId: number) => {
  const targetAdmin = await getSingleAdmin(adminId)

  if (targetAdmin?.profileImagePublicId) {
    await deleteImage(targetAdmin?.profileImagePublicId)
  }

  return prisma.user.delete({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    }
  })
}

const convertToAdmin = (moderatorId: number) => {
  return prisma.user.update({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    },
    data: {
      role: enumsConfig.UserRole.ADMIN
    }
  })
}

const convertToModerator = (adminId: number) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    },
    data: {
      role: enumsConfig.UserRole.MODERATOR
    }
  })
}

export default {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  convertToAdmin,
  convertToModerator
}
