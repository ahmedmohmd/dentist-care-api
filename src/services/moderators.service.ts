import prisma from "../../db/db";
import { CreateModerator } from "../types/moderators.types";

const getAllModerators = () => {
  return prisma.moderator.findMany({
    where: {
      role: "MODERATOR",
    },
  });
};

const getSingleModerator = (moderatorId: number) => {
  return prisma.moderator.findUnique({
    where: {
      id: moderatorId,
      role: "MODERATOR",
    },
  });
};

const createModerator = (moderatorData: any) => {
  return prisma.moderator.create({
    data: moderatorData,
  });
};

const updateModerator = (moderatorId: number, moderatorData: any) => {
  return prisma.moderator.update({
    where: {
      id: moderatorId,
      role: "MODERATOR",
    },

    data: moderatorData,
  });
};

const deleteModerator = (moderatorId: number) => {
  return prisma.moderator.delete({
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
