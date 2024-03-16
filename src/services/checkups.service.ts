import prisma from "../../db/db";

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

enum CheckType {
  EXAMINATION = "EXAMINATION",
  CONSULTATION = "CONSULTATION",
}

type CreateCheckup = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  date: string;
  type: CheckType;
};

const createCheckup = (checkup: CreateCheckup) => {
  return prisma.checkup.create({
    data: {
      firstName: checkup.firstName,
      lastName: checkup.lastName,
      phoneNumber: checkup.phoneNumber,
      address: checkup.address,
      date: checkup.date,
      type: checkup.type,
    },
  });
};


export default {
  getAllCheckups,
  getSingleCheckup,
  createCheckup,
};
