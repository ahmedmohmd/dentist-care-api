import prisma from '../../db/prisma'
import { CreateCheckup, UpdateCheckup } from '../dto/checkups.dto'

/**
 * Retrieves a list of checkups based on the provided parameters.
 *
 * @param {number} skip - The number of records to skip.
 * @param {number} take - The number of records to take.
 * @param {"desc" | "asc"} sortingOrder - The sorting order for the results, defaults to "desc".
 * @return {Promise<Checkup[]>} An array of checkup objects based on the specified parameters.
 */
const getAllCheckups = (skip: number, take: number, sortingOrder: 'desc' | 'asc' = 'desc') => {
  return prisma.checkup.findMany({
    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder
    }
  })
}

/**
 * Retrieves all checkups for a specific patient.
 *
 * @param {number} patientId - The unique identifier of the patient.
 * @param {number} skip - The number of records to skip.
 * @param {number} take - The number of records to take.
 * @param {"desc" | "asc"} sortingOrder - The sorting order for the checkups. Defaults to "desc".
 * @return {Promise<Checkup[]>} An array of checkup objects.
 */
const getAllPatientCheckups = (
  patientId: number,
  skip: number,
  take: number,
  sortingOrder: 'desc' | 'asc' = 'desc'
) => {
  return prisma.checkup.findMany({
    where: {
      userId: patientId
    },

    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder
    }
  })
}

/**
 * Retrieves a single checkup for a given id and patient id.
 *
 * @param {number} id - The unique identifier of the checkup.
 * @param {number} patientId - The id of the patient associated with the checkup.
 * @return {Promise<Checkup>} The retrieved checkup object.
 */
const getSingleCheckup = (id: number, patientId: number) => {
  return prisma.checkup.findFirst({
    where: {
      id,
      userId: patientId
    }
  })
}

/**
 * Retrieves checkup records by patient id.
 *
 * @param {number} patientId - The ID of the patient
 * @return {Checkup[]} An array of checkup records belonging to the patient
 */
const getCheckupByPatientId = (patientId: number) => {
  return prisma.checkup.findMany({
    where: {
      userId: patientId
    }
  })
}

/**
 * Creates a checkup for a patient.
 *
 * @param {CreateCheckup} checkup - the details of the checkup to create
 * @param {number} patientId - the ID of the patient for whom the checkup is created
 * @return {Promise<Checkup>} A Promise that resolves to the created checkup
 */
const createCheckup = (checkup: CreateCheckup, patientId: number) => {
  return prisma.checkup.create({
    data: {
      date: checkup.date,
      userId: patientId,
      type: checkup.type
    }
  })
}

/**
 * Updates a checkup for a specific patient.
 *
 * @param {number} patientId - The ID of the patient
 * @param {number} checkupId - The ID of the checkup
 * @param {UpdateCheckup} data - The data to update the checkup with
 * @return {Promise<Checkup>} The updated checkup
 */
const updateCheckup = (patientId: number, checkupId: number, data: UpdateCheckup) => {
  return prisma.checkup.update({
    where: {
      id: checkupId,
      userId: patientId
    },

    data: data
  })
}

/**
 * Deletes a checkup for a given patient.
 *
 * @param {number} checkupId - The ID of the checkup to delete
 * @param {number} patientId - The ID of the patient associated with the checkup
 * @return {Promise<ReturnType>} A promise that resolves to the deleted checkup
 */
const deleteCheckup = (checkupId: number, patientId: number) => {
  return prisma.checkup.delete({
    where: {
      id: checkupId,
      userId: patientId
    }
  })
}

export default {
  getAllCheckups,
  getAllPatientCheckups,
  getSingleCheckup,
  createCheckup,
  updateCheckup,
  deleteCheckup,
  getCheckupByPatientId
}
