import prisma from "../../db/db";
import { CreateCheckup, UpdateCheckup } from "../types/checkups.types";

const getAllCheckups = (patientId: number) => {
  return prisma.checkup.findMany({
    where: {
      patientId: patientId,
    },
  });
};

const getSingleCheckup = (id: number, patientId: number) => {
  return prisma.checkup.findFirst({
    where: {
      id,
      patientId,
    },
  });
};

const createCheckup = (checkup: any, patientId: number) => {
  return prisma.checkup.create({
    data: {
      firstName: checkup.firstName,
      lastName: checkup.lastName,
      address: checkup.address,
      date: checkup.date,
      phoneNumber: checkup.phoneNumber,
      patientId: patientId,
      type: checkup.type,
    },
  });
};

const updateCheckup = (
  patientId: number,
  checkupId: number,
  data: UpdateCheckup
) => {
  return prisma.checkup.update({
    where: {
      id: checkupId,
      patientId: patientId,
    },

    data: data,
  });
};

const deleteCheckup = (checkupId: number, patientId: number) => {
  return prisma.checkup.delete({
    where: {
      id: checkupId,
      patientId: patientId,
    },
  });
};

export default {
  getAllCheckups,
  getSingleCheckup,
  createCheckup,
  updateCheckup,
  deleteCheckup,
};
