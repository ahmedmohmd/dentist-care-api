import createHttpError from 'http-errors'
import enumsConfig from '../../config/enums.config'
import prisma from '../../db/prisma'
import { CreateModerator, UpdateModerator } from '../types/moderators.dto'
import cacheUtil from '../utils/cache.util'
import hashPasswordUtil from '../utils/hash-password.util'
import jwtUtil from '../utils/jwt.util'
import { deleteImage, updateImage, uploadImage } from './image.service'

const getAllModerators = async ({
  skip,
  take,
  sortingOrder
}: {
  skip: number
  take: number
  sortingOrder: 'desc' | 'asc'
}) => {
  const moderatorsFromCache = await cacheUtil.get(`moderators:page=${skip}:limit=${take}:order=${sortingOrder}`)

  if (moderatorsFromCache) {
    return moderatorsFromCache
  }

  const allModerators = await prisma.user.findMany({
    where: {
      role: enumsConfig.UserRole.MODERATOR
    },

    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder
    }
  })

  await cacheUtil.set(`moderators:page=${skip}:limit=${take}:order=${sortingOrder}`, allModerators)

  return allModerators
}

const getSingleModerator = async (moderatorId: number) => {
  const moderatorFromCache = await cacheUtil.get(`single-moderator:${moderatorId}`)

  if (moderatorFromCache) {
    return moderatorFromCache
  }

  const targetModerator = await prisma.user.findUnique({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    }
  })

  await cacheUtil.set(`single-moderator:${moderatorId}`, targetModerator)

  return targetModerator
}

const createModerator = async (moderatorData: CreateModerator) => {
  const { imageId, imageUrl } = await uploadImage(moderatorData.profileImage)

  const createdModeratorData = Object.assign({}, moderatorData, {
    profileImagePublicId: imageId,
    profileImage: imageUrl,
    password: await hashPasswordUtil.encrypt(moderatorData.password)
  })

  const createdModerator = await prisma.user.create({
    data: createdModeratorData
  })

  const token = await jwtUtil.generateWebToken({
    id: createdModerator.id,
    firstName: createdModerator.firstName,
    lastName: createdModerator.lastName,
    email: createdModerator.email,
    profileImage: createdModerator.profileImage,
    phoneNumber: createdModerator.phoneNumber,
    address: createdModerator.address,
    role: createdModerator.role
  })

  return {
    user: createdModerator,
    token
  }
}

const updateModerator = async (moderatorId: number, moderatorData: UpdateModerator) => {
  const { newImageId, newImageUrl } = await updateImage(
    moderatorData?.profileImagePublicId,
    moderatorData?.profileImage
  )

  if (!moderatorData.profileImage) {
    throw new createHttpError.BadRequest('Image is not correct!')
  }

  const newModeratorData = Object.assign({}, moderatorData, {
    profileImagePublicId: newImageId,
    profileImage: newImageUrl,

    password: moderatorData.password && (await hashPasswordUtil.encrypt(moderatorData.password))
  })

  return prisma.user.update({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    },

    data: newModeratorData
  })
}

const deleteModerator = async (moderatorId: number) => {
  const targetModerator = await getSingleModerator(moderatorId)

  if (targetModerator?.profileImagePublicId) {
    await deleteImage(targetModerator?.profileImagePublicId)
  }

  return prisma.user.delete({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    }
  })
}

const getModeratorByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
      role: enumsConfig.UserRole.MODERATOR
    }
  })
}

export default {
  getSingleModerator,
  updateModerator,
  deleteModerator,
  getAllModerators,
  createModerator,
  getModeratorByEmail
}
