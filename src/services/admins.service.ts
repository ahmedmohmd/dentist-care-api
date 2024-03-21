import { $Enums } from "@prisma/client";
import prisma from "../../db/db";
import { UpdateAdmin } from "../types/admins.types";

const getSingleAdmin = (adminId: number) => {
  return prisma.admin.findUnique({
    where: {
      id: adminId,
      role: "ADMIN",
    },
  });
};

const updateAdmin = (adminId: number, adminData: UpdateAdmin) => {
  return prisma.admin.update({
    where: {
      id: adminId,
      role: "ADMIN",
    },

    data: adminData,
  });
};

const deleteAdmin = (adminId: number) => {
  return prisma.admin.delete({
    where: {
      id: adminId,
      role: "ADMIN",
    },
  });
};

const convertToAdmin = (moderatorId: number) => {
  return prisma.moderator.update({
    where: {
      id: moderatorId,
    },
    data: {
      role: "ADMIN",
    },
  });
};

const convertToModerator = (adminId: number) => {
  return prisma.admin.update({
    where: {
      id: adminId,
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
