import enumsConfig from "../../config/enums.config";
import prisma from "../../db/db";
import { CreatePatient, UpdatePatient } from "../dto/patients.dto";
import hashPasswordUtil from "../utils/hash-password.util";

const getAllPatients = () => {
  return prisma.user.findMany({
    where: {
      role: enumsConfig.UserRole.PATIENT,
    },
  });
};

const getSinglePatient = (patientId: number) => {
  return prisma.user.findUnique({
    where: {
      id: patientId,
      role: enumsConfig.UserRole.PATIENT,
    },
  });
};

const getPatientByEmail = (patientEmail: string) => {
  return prisma.user.findUnique({
    where: {
      role: enumsConfig.UserRole.PATIENT,
      email: patientEmail,
    },
  });
};

const createPatient = async (patientData: CreatePatient) => {
  return prisma.user.create({
    data: {
      address: patientData.address,
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      email: patientData.email,
      password: await hashPasswordUtil.encrypt(patientData.password),
      phoneNumber: patientData.phoneNumber,
      role: patientData.role,
    },
  });
};

const updatePatient = (patientId: number, patientData: UpdatePatient) => {
  return prisma.user.update({
    where: {
      id: patientId,
      role: enumsConfig.UserRole.PATIENT,
    },

    data: patientData,
  });
};

const deletePatient = (patientId: number) => {
  return prisma.user.delete({
    where: {
      id: patientId,
      role: enumsConfig.UserRole.PATIENT,
    },
  });
};

export default {
  getSinglePatient,
  updatePatient,
  deletePatient,
  getAllPatients,
  createPatient,
  getPatientByEmail,
};
