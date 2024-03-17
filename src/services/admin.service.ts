import prisma from "../../db/db";

const getSingleAdmin = (adminId: number) => {
  return prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });
};

const updateAdmin = (adminId: number, adminData: any) => {
  return prisma.admin.update({
    where: {
      id: adminId,
    },

    data: adminData,
  });
};

const deleteAdmin = (adminId: number) => {
  return prisma.admin.delete({
    where: {
      id: adminId,
    },
  });
};

export default { getSingleAdmin, updateAdmin, deleteAdmin };
