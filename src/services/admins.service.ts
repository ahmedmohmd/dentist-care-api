import enumsConfig from '../../config/enums.config'
import prisma from '../../db/prisma'
import { UpdateAdmin } from '../dto/admins.dto'
import cloudinary from '../utils/cloudinary.util'

/**
 * Retrieves a single admin user based on the provided adminId.
 *
 * @param {number} adminId - The unique identifier of the admin user.
 * @return {Promise<User>} A promise that resolves to the admin user object if found, otherwise null.
 */
const getSingleAdmin = (adminId: number) => {
  return prisma.user.findUnique({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    }
  })
}

/**
 * Updates an admin user with the specified ID.
 *
 * @param {number} adminId - The ID of the admin user to update.
 * @param {UpdateAdmin} adminData - The data to update for the admin user.
 * @return {Promise<User>} The updated admin user.
 */
const updateAdmin = (adminId: number, adminData: UpdateAdmin) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    },

    data: adminData
  })
}

/**
 * Deletes an admin user with the given adminId.
 *
 * @param {number} adminId - The ID of the admin user to be deleted
 * @return {Promise} A Promise that resolves to the deleted user
 */
const deleteAdmin = async (adminId: number) => {
  const targetAdmin = await getSingleAdmin(adminId)

  if (targetAdmin?.profileImagePublicId) {
    await cloudinary.uploader.destroy(targetAdmin.profileImagePublicId)
  }

  return prisma.user.delete({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    }
  })
}

/**
 * Updates the role of the user with the given moderatorId to "ADMIN" in the database.
 *
 * @param {number} moderatorId - The id of the moderator user
 * @return {Promise<User>} The updated user object representing the user with the new role
 */
const convertToAdmin = (moderatorId: number) => {
  return prisma.user.update({
    where: {
      id: moderatorId,
      role: 'MODERATOR'
    },
    data: {
      role: enumsConfig.UserRole.ADMIN
    }
  })
}

/**
 * Updates the role of a user with the provided adminId to "MODERATOR".
 *
 * @param {number} adminId - The id of the admin user whose role will be updated.
 * @return {Promise<User>} The updated user with the role changed to "MODERATOR".
 */
const convertToModerator = (adminId: number) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN
    },
    data: {
      role: 'MODERATOR'
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
