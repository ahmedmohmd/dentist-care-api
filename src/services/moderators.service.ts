import prisma from "../../db/db";
import { CreateModerator } from "../types/moderators.types";

const getAllModerators = () => {
  return prisma.user.findMany({
    where: {
      role: "MODERATOR",
    },
  });
};

const getSingleModerator = (moderatorId: number) => {
  return prisma.user.findUnique({
    where: {
      id: moderatorId,
      role: "MODERATOR",
    },
  });
};

const createModerator = (moderatorData: any) => {
  return prisma.user.create({
    data: moderatorData,
  });
};

const updateModerator = (moderatorId: number, moderatorData: any) => {
  return prisma.user.update({
    where: {
      id: moderatorId,
      role: "MODERATOR",
    },

    data: moderatorData,
  });
};

const deleteModerator = (moderatorId: number) => {
  return prisma.user.delete({
    where: {
      id: moderatorId,
      role: "MODERATOR",
    },
  });
};

export default {
  getSingleModerator,
  updateModerator,
  deleteModerator,
  getAllModerators,
  createModerator,
};
