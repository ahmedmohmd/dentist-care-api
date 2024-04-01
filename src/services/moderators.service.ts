import enumsConfig from "../../config/enums.config";
import prisma from "../../db/db";
import { CreateModerator, UpdateModerator } from "../dto/moderators.dto";

const getAllModerators = () => {
  return prisma.user.findMany({
    where: {
      role: enumsConfig.UserRole.MODERATOR,
    },
  });
};

const getSingleModerator = (moderatorId: number) => {
  return prisma.user.findUnique({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR,
    },
  });
};

const createModerator = (moderatorData: CreateModerator) => {
  return prisma.user.create({
    data: moderatorData,
  });
};

const updateModerator = (
  moderatorId: number,
  moderatorData: UpdateModerator
) => {
  return prisma.user.update({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR,
    },

    data: moderatorData,
  });
};

const deleteModerator = (moderatorId: number) => {
  return prisma.user.delete({
    where: {
      id: moderatorId,
      role: enumsConfig.UserRole.MODERATOR,
    },
  });
};

const getModeratorByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
      role: enumsConfig.UserRole.MODERATOR,
    },
  });
};

export default {
  getSingleModerator,
  updateModerator,
  deleteModerator,
  getAllModerators,
  createModerator,
  getModeratorByEmail,
};
