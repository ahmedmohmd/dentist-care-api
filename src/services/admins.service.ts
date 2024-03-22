import { $Enums } from "@prisma/client";
import prisma from "../../db/db";
import { UpdateAdmin } from "../types/admins.types";

const getSingleAdmin = (adminId: number) => {
  return prisma.user.findUnique({
    where: {
      id: adminId,
      role: "ADMIN",
    },
  });
};

const updateAdmin = (adminId: number, adminData: UpdateAdmin) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: "ADMIN",
    },

    data: adminData,
  });
};

const deleteAdmin = (adminId: number) => {
  return prisma.user.delete({
    where: {
      id: adminId,
      role: "ADMIN",
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
      role: "ADMIN",
    },
  });
};

const convertToModerator = (adminId: number) => {
  return prisma.user.update({
    where: {
      id: adminId,
      role: "ADMIN",
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
