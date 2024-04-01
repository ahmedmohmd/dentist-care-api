import enumsConfig from "../../config/enums.config";
import prisma from "../../db/db";
import { UpdateAdmin } from "../dto/admins.dto";

const getSingleAdmin = (adminId: number) => {
  return prisma.user.findUnique({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN,
    },
  });
};

const updateAdmin = (adminId: number, adminData: UpdateAdmin) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN,
    },

    data: adminData,
  });
};

const deleteAdmin = (adminId: number) => {
  return prisma.user.delete({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN,
    },
  });
};

const convertToAdmin = (moderatorId: number) => {
  return prisma.user.update({
    where: {
      id: moderatorId,
      role: "MODERATOR",
    },
    data: {
      role: enumsConfig.UserRole.ADMIN,
    },
  });
};

const convertToModerator = (adminId: number) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: enumsConfig.UserRole.ADMIN,
    },
    data: {
      role: "MODERATOR",
    },
  });
};

export default {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  convertToAdmin,
  convertToModerator,
};
