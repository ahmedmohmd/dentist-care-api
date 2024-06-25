import createHttpError from 'http-errors'
import enumsConfig from '../../config/enums.config'
import prisma from '../../db/prisma'
import { UpdatePatient } from '../dto/patients.dto'
import cacheUtil from '../utils/cache.util'
import hashPasswordUtil from '../utils/hash-password.util'
import { deleteImage, updateImage } from './image.service'

const getAllPatients = async ({
  skip,
  take,
  sortingOrder
}: {
  skip: number
  take: number
  sortingOrder: 'desc' | 'asc'
}) => {
  const patientsFromCache = await cacheUtil.get(`patients:page=${skip}:limit=${take}:order=${sortingOrder}`)

  if (patientsFromCache) {
    return patientsFromCache
  }

  const allPatients = await prisma.user.findMany({
    where: {
      role: enumsConfig.UserRole.PATIENT
    },

    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder
    }
  })

  await cacheUtil.set(`patients:page=${skip}:limit=${take}:order=${sortingOrder}`, allPatients)

  return allPatients
}

const getSinglePatient = async (patientId: number) => {
  const patientFromCache = await cacheUtil.get(`single-patient:${patientId}`)

  if (patientFromCache) {
    return patientFromCache
  }

  const targetPatient = await prisma.user.findUnique({
    where: {
      id: patientId,
      role: enumsConfig.UserRole.PATIENT
    }
  })

  await cacheUtil.set(`single-patient:${patientId}`, targetPatient)

  return targetPatient
}

const getPatientByEmail = (patientEmail: string) => {
  return prisma.user.findUnique({
    where: {
      role: enumsConfig.UserRole.PATIENT,
      email: patientEmail
    }
  })
}

const updatePatient = async (patientId: number, patientData: UpdatePatient) => {
  const { newImageId, newImageUrl } = await updateImage(patientData?.profileImagePublicId, patientData?.profileImage)

  if (!patientData.profileImage) {
    throw new createHttpError.BadRequest('Image is not correct!')
  }

  const newPatientData = Object.assign({}, patientData, {
    profileImagePublicId: newImageId,
    profileImage: newImageUrl,

    password: patientData.password && (await hashPasswordUtil.encrypt(patientData.password))
  })

  return prisma.user.update({
    where: {
      id: patientId,
      role: enumsConfig.UserRole.PATIENT
    },

    data: newPatientData
  })
}

const deletePatient = async (patientId: number) => {
  const targetPatient = await getSinglePatient(patientId)

  if (targetPatient?.profileImagePublicId) {
    await deleteImage(targetPatient?.profileImagePublicId)
  }

  return prisma.user.delete({
    where: {
      id: patientId,
      role: enumsConfig.UserRole.PATIENT
    }
  })
}

export default {
  getSinglePatient,
  updatePatient,
  deletePatient,
  getAllPatients,
  getPatientByEmail
}
