import prisma from "../../db/db";

const getAllDates = () => {
  return prisma.dailyDates.findMany({
    where: {
      available: true,
    },
  });
};

const takeDate = (date: string) => {
  return prisma.dailyDates.update({
    where: {
      date: date,
    },

    data: {
      available: false,
    },
  });
};

export default {
  getAllDates,
  takeDate,
};
