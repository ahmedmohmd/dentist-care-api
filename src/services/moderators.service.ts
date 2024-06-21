import enumsConfig from '../../config/enums.config'
import prisma from '../../db/prisma'
import { CreateModerator, UpdateModerator } from '../dto/moderators.dto'
import cloudinary from '../utils/cloudinary.util'

/**
 * Retrieves all moderators from the database.
 *
 * @return {Promise<User[]>} An array of User objects representing all moderators.
 */
const getAllModerators = ({
  skip,
  take,
  sortingOrder
}: {
  skip: number
  take: number
  sortingOrder: 'desc' | 'asc'
}) => {
  return prisma.user.findMany({
    where: {
      role: enumsConfig.UserRole.MODERATOR
    },

    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder
    }
  })
}

/**
 * Get a single moderator based on the moderatorId.
 *
 * @param {number} moderatorId - The ID of the moderator to retrieve.
 * @return {Promise<User>} The moderator with the specified ID.
 */
const getSingleModerator = (moderatorId: number) => {
  return prisma.user.findUnique({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    }
  })
}

/**
 * Create a moderator with the given moderator data.
 *
 * @param {CreateModerator} moderatorData - The data for creating the moderator
 * @return {Promise<User>} The created moderator
 */
const createModerator = (moderatorData: CreateModerator) => {
  return prisma.user.create({
    data: {
      ...moderatorData
    }
  })
}

/**
 * Updates a moderator in the database.
 *
 * @param {number} moderatorId - The ID of the moderator to update
 * @param {UpdateModerator} moderatorData - The data to update for the moderator
 * @return {Promise<User>} The updated moderator
 */
const updateModerator = (moderatorId: number, moderatorData: UpdateModerator) => {
  return prisma.user.update({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    },

    data: moderatorData
  })
}

/**
 * Deletes a moderator user based on the provided moderatorId.
 *
 * @param {number} moderatorId - The ID of the moderator user to be deleted.
 * @return {Promise<User>} The deleted moderator user.
 */
const deleteModerator = async (moderatorId: number) => {
  const targetModerator = await getSingleModerator(moderatorId)

  if (targetModerator?.profileImagePublicId) {
    await cloudinary.uploader.destroy(targetModerator.profileImagePublicId)
  }

  return prisma.user.delete({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR
    }
  })
}

/**
 * Finds a user with the specified email and role as moderator.
 *
 * @param {string} email - The email of the user to search for.
 * @return {Promise<User>} A user object with the specified email and role as moderator.
 */
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
