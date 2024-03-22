import prisma from "../../db/db";
import hashPasswordUtil from "../utils/hash-password.util";

const getAllPatients = () => {
  return prisma.user.findMany({
    where: {
      role: "PATIENT",
    },
  });
};

const getSinglePatient = (patientId: number) => {
  return prisma.user.findUnique({
    where: {
      id: patientId,
      role: "PATIENT",
    },
  });
};

const getPatientByEmail = (patientEmail: string) => {
  return prisma.user.findUnique({
    where: {
      role: "PATIENT",
      email: patientEmail,
    },
  });
};

const createPatient = async (patientData: any) => {
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

const updatePatient = (patientId: number, patientData: any) => {
  return prisma.user.update({
    where: {
      id: patientId,
      role: "PATIENT",
    },

    data: patientData,
  });
};

const deletePatient = (patientId: number) => {
  return prisma.user.delete({
    where: {
      id: patientId,
      role: "PATIENT",
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
