import prisma from "../../db/db";
import { CreateCheckup, UpdateCheckup } from "../dto/checkups.dto";

const getAllCheckups = (
  skip: number,
  take: number,
  sortingOrder: "desc" | "asc" = "desc"
) => {
  return prisma.checkup.findMany({
    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder,
    },
  });
};

const getAllPatientCheckups = (
  patientId: number,
  skip: number,
  take: number,
  sortingOrder: "desc" | "asc" = "desc"
) => {
  return prisma.checkup.findMany({
    where: {
      userId: patientId,
    },

    skip: skip,
    take: take,

    orderBy: {
      createdAt: sortingOrder,
    },
  });
};

const getSingleCheckup = (id: number, patientId: number) => {
  return prisma.checkup.findFirst({
    where: {
      id,
      userId: patientId,
    },
  });
};

const createCheckup = (checkup: CreateCheckup, patientId: number) => {
  return prisma.checkup.create({
    data: {
      firstName: checkup.firstName,
      lastName: checkup.lastName,
      address: checkup.address,
      date: checkup.date,
      phoneNumber: checkup.phoneNumber,
      userId: patientId,
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
      userId: patientId,
    },

    data: data,
  });
};

const deleteCheckup = (checkupId: number, patientId: number) => {
  return prisma.checkup.delete({
    where: {
      id: checkupId,
      userId: patientId,
    },
  });
};

export default {
  getAllCheckups,
  getAllPatientCheckups,
  getSingleCheckup,
  createCheckup,
  updateCheckup,
  deleteCheckup,
};
