import prisma from "../../db/db";
import { CreateCheckup, UpdateCheckup } from "../types/checkups.types";

const getAllCheckups = () => {
  return prisma.checkup.findMany();
};

const getSingleCheckup = (id: number) => {
  return prisma.checkup.findFirst({
    where: {
      id,
    },
  });
};

const createCheckup = (checkup: CreateCheckup) => {
  return prisma.checkup.create({
    data: checkup,
  });
};

const updateCheckup = (checkupId: number, data: UpdateCheckup) => {
  return prisma.checkup.update({
    where: {
      id: checkupId,
    },

    data: data,
  });
};

const deleteCheckup = (checkupId: number) => {
  return prisma.checkup.delete({
    where: {
      id: checkupId,
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
